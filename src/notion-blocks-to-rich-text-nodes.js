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

function getIcon(block) {
  return get(block, 'value.format.page_icon');
}

function getImageSrc(url) {
  const isHostedByNotion = url.startsWith('/images/');
  return isHostedByNotion ? `https://notion.so${url}` : url;
}

export function toDocument(page, content) {
  const icon = getIcon(page);
  const url = get(page, 'value.format.page_cover');
  const src = getImageSrc(url);
  const position = get(page, 'value.format.page_cover_position');
  return {
    nodeType: 'document',
    data: {
      icon,
      image: {
        src,
        position
      }
    },
    content
  };
}

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
  const src = getImageSrc(url);
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

export function toCallout(block) {
  const content = get(block, 'value.properties.title', []);
  const icon = getIcon(block);
  const color = get(block, 'value.format.block_color');

  if (isEmpty(content)) {
    return null;
  }

  return {
    nodeType: BLOCKS.CALLOUT,
    data: { icon, color },
    content: content.map(toText)
  };
}

export function toColumn(block, blocks, config) {
  const ratio = get(block, 'value.format.column_ratio');
  const contentIds = get(block, 'value.content');
  const contentBlocks = contentIds.reduce(
    (allBlocks, id) => ({ ...allBlocks, [id]: blocks[id] }),
    {}
  );
  const content = notionBlocksToRichTextNodes(contentBlocks, config);
  return {
    nodeType: BLOCKS.COLUMN,
    data: {
      ratio,
      length: contentIds.length
    },
    content,
    ids: contentIds
  };
}

export function toColumnList(block, blocks, config) {
  const columnIds = get(block, 'value.content');
  const result = columnIds.reduce(
    (allColumns, id) => {
      const columnBlock = blocks[id];
      const column = toColumn(columnBlock, blocks, config);
      const { ids, ...rest } = column;
      allColumns.ids.push(...ids);
      allColumns.columns.push(rest);
      return allColumns;
    },
    { ids: [], columns: [] }
  );
  return {
    nodeType: BLOCKS.COLUMN_LIST,
    data: {
      length: columnIds.length
    },
    content: result.columns,
    ids: [...columnIds, ...result.ids]
  };
}

const defaultTransformerFns = {
  [NOTION_BLOCKS.HEADER]: toHeading(1),
  [NOTION_BLOCKS.SUB_HEADER]: toHeading(2),
  [NOTION_BLOCKS.SUB_SUB_HEADER]: toHeading(3),
  [NOTION_BLOCKS.TEXT]: toParagraph,
  [NOTION_BLOCKS.QUOTE]: toQuote,
  [NOTION_BLOCKS.CALLOUT]: toCallout,
  [NOTION_BLOCKS.BULLETED_LIST]: toListItem(BLOCKS.UL_LIST),
  [NOTION_BLOCKS.NUMBERED_LIST]: toListItem(BLOCKS.OL_LIST),
  [NOTION_BLOCKS.IMAGE]: toImage,
  [NOTION_BLOCKS.DIVIDER]: toHorizontalRule,
  [NOTION_BLOCKS.COLUMN_LIST]: toColumnList
};

export default function notionBlocksToRichTextNodes(blocks = {}, options = {}) {
  const {
    transformFns: customTransformFns,
    defaultTransformFn,
    preserveLayout
  } = options;
  const transformFns = { ...defaultTransformerFns, ...customTransformFns };

  if (!preserveLayout) {
    transformFns[NOTION_BLOCKS.COLUMN_LIST] = null;
  }

  const config = { transformFns, defaultTransformFn };
  const entries = Object.entries(blocks);
  const completedIds = [];
  const nodes = [];

  let tmpListType = null;
  let tmpListContent = null;

  /* eslint-disable no-restricted-syntax, no-continue */
  for (const entry of entries) {
    const [id, block] = entry;

    if (completedIds.includes(id)) {
      continue;
    }

    const type = get(block, 'value.type');
    const transformerFn = transformFns[type] || defaultTransformFn;

    const node = transformerFn(block, blocks, config);

    if (!node) {
      continue;
    }

    const { listType, ids, ...rest } = node;

    if (ids) {
      completedIds.push(...ids);
    }

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

    completedIds.push(id);
    nodes.push(rest);
  }
  /* eslint-enable no-restricted-syntax, no-continue */

  return nodes;
}
