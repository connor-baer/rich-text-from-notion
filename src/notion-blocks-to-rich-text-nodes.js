import {
  BLOCKS,
  MARKS,
  INLINES,
  NOTION_BLOCKS,
  NOTION_MARKS
} from './constants';
import isEmpty from './utils/is-empty';
import get from './utils/get';

const markMap = {
  [NOTION_MARKS.BOLD]: MARKS.BOLD,
  [NOTION_MARKS.ITALIC]: MARKS.ITALIC,
  [NOTION_MARKS.CODE]: MARKS.CODE,
  [NOTION_MARKS.HIGHLIGHT]: MARKS.HIGHLIGHT
};

export function toMark(mark = []) {
  const [typeId, data] = mark;
  return {
    type: markMap[typeId],
    data
  };
}

export function toHyperlink(text, uri) {
  return {
    nodeType: INLINES.HYPERLINK,
    content: [toText(text)],
    data: { uri }
  };
}

export function toText(text = []) {
  const [value, marks = []] = text;
  const hyperlink = marks.find(
    mark => mark.indexOf(NOTION_MARKS.HYPERLINK) >= 0
  );

  if (hyperlink) {
    const marksWithoutHyperlink = marks.filter(mark => mark !== hyperlink);
    return toHyperlink([value, marksWithoutHyperlink], hyperlink[1]);
  }

  return {
    nodeType: 'text',
    value,
    marks: marks.map(toMark)
  };
}

export function toHeading(level) {
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

export function toParagraph(block) {
  const content = get(block, 'value.properties.title', []);

  if (isEmpty(content)) {
    return null;
  }

  return {
    nodeType: BLOCKS.PARAGRAPH,
    content: content.map(toText)
  };
}

export function toQuote(block) {
  const content = get(block, 'value.properties.title', []);

  if (isEmpty(content)) {
    return null;
  }

  return {
    nodeType: BLOCKS.QUOTE,
    content: content.map(toText)
  };
}

export function toListItem(listType) {
  return block => ({
    listType,
    nodeType: BLOCKS.LIST_ITEM,
    content: [toParagraph(block)]
  });
}

export function toImage(block) {
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

export function toHorizontalRule() {
  return {
    content: [],
    nodeType: BLOCKS.HR
  };
}

const defaultTransformerFns = {
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

export default function notionBlocksToRichTextNodes(blocks = {}, options = {}) {
  const { transformFns: customTransformFns, fallbackTransformFn } = options;
  const transformFns = { ...defaultTransformerFns, ...customTransformFns };
  const nodes = [];

  let tmpListType = null;
  let tmpListContent = null;

  /* eslint-disable no-restricted-syntax, no-continue */
  for (const block of Object.values(blocks)) {
    const type = get(block, 'value.type');
    const transformerFn = transformFns[type] || fallbackTransformFn;

    const node = transformerFn(block);

    if (!node) {
      continue;
    }

    const { listType, ...rest } = node;

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
        tmpListContent = [rest];
      } else {
        tmpListContent.push(rest);
      }

      continue;
    }

    nodes.push(rest);
  }
  /* eslint-enable no-restricted-syntax, no-continue */

  return nodes;
}
