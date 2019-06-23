import { BLOCKS, MARKS, NOTION_BLOCKS, NOTION_MARKS } from './constants';
import isEmpty from './utils/is-empty';
import get from './utils/get';

const markMap = {
  [NOTION_MARKS.BOLD]: MARKS.BOLD,
  [NOTION_MARKS.ITALIC]: MARKS.ITALIC,
  [NOTION_MARKS.CODE]: MARKS.CODE,
  [NOTION_MARKS.HIGHLIGHT]: MARKS.HIGHLIGHT
};

function toMark(mark = []) {
  const [typeId, data] = mark;
  return {
    type: markMap[typeId],
    data
  };
}

function toText(text = []) {
  const [value, marks = []] = text;
  return {
    nodeType: 'text',
    value,
    marks: marks.map(toMark)
  };
}

function toHeading(level) {
  return block => {
    const content = get(block, 'value.properties.title', []);

    if (isEmpty(content)) {
      return null;
    }

    return {
      nodeType: `heading-${level}`,
      content: content.map(toText)
    };
  };
}

function toParagraph(block) {
  const content = get(block, 'value.properties.title', []);

  if (isEmpty(content)) {
    return null;
  }

  return {
    nodeType: BLOCKS.PARAGRAPH,
    content: content.map(toText)
  };
}

function toQuote(block) {
  const content = get(block, 'value.properties.title', []);

  if (isEmpty(content)) {
    return null;
  }

  return {
    nodeType: BLOCKS.QUOTE,
    content: content.map(toText)
  };
}

function toListItem(listType) {
  return block => ({
    listType,
    nodeType: BLOCKS.LIST_ITEM,
    content: [toParagraph(block)]
  });
}

function toImage(block) {
  const url = get(block, 'value.format.display_source');
  const isHostedByNotion = url.startsWith('/images/');
  const src = isHostedByNotion ? `https://notion.so${url}` : url;
  const caption = get(block, 'value.properties.caption[0]', []);
  return {
    nodeType: BLOCKS.EMBEDDED_ENTRY,
    data: {
      type: 'image',
      src,
      alt: caption[0],
      caption: toText(caption)
    },
    content: []
  };
}

function toHorizontalRule() {
  return {
    content: [],
    nodeType: BLOCKS.HR
  };
}

const transformerMap = {
  [NOTION_BLOCKS.HEADER]: toHeading(2),
  [NOTION_BLOCKS.SUB_HEADER]: toHeading(3),
  [NOTION_BLOCKS.SUB_SUB_HEADER]: toHeading(4),
  [NOTION_BLOCKS.TEXT]: toParagraph,
  [NOTION_BLOCKS.QUOTE]: toQuote,
  [NOTION_BLOCKS.BULLETED_LIST]: toListItem(BLOCKS.UL_LIST),
  [NOTION_BLOCKS.NUMBERED_LIST]: toListItem(BLOCKS.OL_LIST),
  [NOTION_BLOCKS.IMAGE]: toImage,
  [NOTION_BLOCKS.DIVIDER]: toHorizontalRule
};

function cleanSections(sections) {
  const nodes = [];

  let tmpListType = null;
  let tmpListContent = null;

  /* eslint-disable no-restricted-syntax, no-continue */
  for (const section of sections) {
    if (!section) {
      continue;
    }

    const { listType, ...node } = section;

    const isEndOfList = tmpListContent && tmpListType !== listType;

    if (isEndOfList) {
      nodes.push({
        nodeType: tmpListType,
        content: tmpListContent
      });
      tmpListType = null;
      tmpListContent = null;
    }

    const isList = !!listType;

    if (isList) {
      const isStartOfList = !tmpListType && !tmpListContent;

      if (isStartOfList) {
        tmpListType = listType;
        tmpListContent = [node];
      } else {
        tmpListContent.push(node);
      }

      continue;
    }

    nodes.push(node);
  }

  return nodes;
}
/* eslint-enable no-restricted-syntax, no-continue */

export default function richTextFromNotion(blocks = {}) {
  const sections = Object.values(blocks).map(block => {
    const type = get(block, 'value.type');
    const transformerFn = transformerMap[type];

    if (!transformerFn) {
      return null;
    }

    return transformerFn(block);
  });

  const content = cleanSections(sections);

  return {
    nodeType: 'document',
    data: {},
    content
  };
}
