import notionBlocksToRichTextNodes, {
  toDocument
} from './notion-blocks-to-rich-text-nodes';
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
  defaultTransformFn: () => null,
  preserveLayout: false
};

export function richTextFromNotion(data, options = {}) {
  const blocks = get(data, 'recordMap.block', {});
  const page = Object.values(blocks)[0];
  const content = notionBlocksToRichTextNodes(blocks, {
    ...defaultOptions,
    ...options
  });

  return toDocument(page, content);
}
