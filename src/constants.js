import {
  BLOCKS as CONTENTFUL_BLOCKS,
  MARKS as CONTENTFUL_MARKS,
  INLINES
} from '@contentful/rich-text-types';

export { INLINES };

export const BLOCKS = {
  ...CONTENTFUL_BLOCKS,
  CALLOUT: 'callout',
  COLUMN_LIST: 'column-list',
  COLUMN: 'column'
};

export const MARKS = {
  ...CONTENTFUL_MARKS,
  HIGHLIGHT: 'highlight'
};

export const NOTION_BLOCKS = {
  PAGE: 'page',
  HEADER: 'header',
  SUB_HEADER: 'sub_header',
  SUB_SUB_HEADER: 'sub_sub_header',
  TEXT: 'text',
  QUOTE: 'quote',
  BULLETED_LIST: 'bulleted_list',
  NUMBERED_LIST: 'numbered_list',
  IMAGE: 'image',
  DIVIDER: 'divider',
  COLLECTION_VIEW: 'collection_view',
  CALLOUT: 'callout',
  COLUMN_LIST: 'column_list',
  COLUMN: 'column'
};

export const NOTION_MARKS = {
  BOLD: 'b',
  ITALIC: 'i',
  CODE: 'c',
  HIGHLIGHT: 'h',
  HYPERLINK: 'a'
};
