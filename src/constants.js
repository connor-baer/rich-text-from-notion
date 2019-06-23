import { BLOCKS, MARKS as CONTENTFUL_MARKS } from '@contentful/rich-text-types';

export { BLOCKS };

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
