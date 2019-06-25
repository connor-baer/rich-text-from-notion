import notionBlocksToRichTextNodes from './notion-blocks-to-rich-text-nodes';
import get from './utils/get';

export {
  BLOCKS,
  MARKS,
  INLINES,
  NOTION_BLOCKS,
  NOTION_MARKS
} from './constants';

const defaultOptions = {
  transformFns: {},
  fallbackTransformFn: () => null
};

export function richTextFromNotion(page, options) {
  const blocks = get(page, 'recordMap.block', {});
  const content = notionBlocksToRichTextNodes(blocks, {
    ...defaultOptions,
    ...options
  });
  return {
    nodeType: 'document',
    data: {},
    content
  };
}
