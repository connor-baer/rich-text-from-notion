import {
  BLOCKS,
  MARKS as CONTENTFUL_MARKS,
  INLINES
} from '@contentful/rich-text-types';

export { BLOCKS, INLINES };

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
  COLLECTION_VIEW: 'collection_view'
};

export const NOTION_MARKS = {
  BOLD: 'b',
  ITALIC: 'i',
  CODE: 'c',
  HIGHLIGHT: 'h',
  HYPERLINK: 'a'
};
