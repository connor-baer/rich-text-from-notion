import notionBlocksToRichTextNodes from './notion-blocks-to-rich-text-nodes';
import get from './utils/get';

export {
  BLOCKS,
  MARKS,
  INLINES,
  NOTION_BLOCKS,
  NOTION_MARKS
} from './constants';

export default function richTextFromNotion(page) {
  const blocks = get(page, 'recordMap.block', {});
  const content = notionBlocksToRichTextNodes(blocks);
  return {
    nodeType: 'document',
    data: {},
    content
  };
}
