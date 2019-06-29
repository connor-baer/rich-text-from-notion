/* eslint-disable max-len */
import notionPage, {
  page,
  heading1,
  heading2,
  heading3,
  text,
  unorderedList,
  orderedList,
  divider,
  quote,
  callout,
  image
} from './documents';
import { richTextFromNotion } from '..';
import {
  toHeading,
  toParagraph,
  toListItem,
  toHorizontalRule,
  toQuote,
  toDocument,
  toCallout,
  toImage
} from '../notion-blocks-to-rich-text-nodes';
import { BLOCKS } from '../constants';

describe('richTextFromNotion', () => {
  it('should convert a full Notion page to rich text', () => {
    const actual = richTextFromNotion(notionPage);
    expect(actual).toMatchSnapshot();
  });

  it('should convert a full Notion page to rich text and preserve the layout', () => {
    const config = { preserveLayout: true };
    const actual = richTextFromNotion(notionPage, config);
    expect(actual).toMatchSnapshot();
  });
});

describe('notionBlocksToRichTextNodes', () => {
  it('should transform a page', () => {
    const actual = toDocument(page, []);
    expect(actual).toMatchSnapshot();
  });

  it('should transform a heading 1', () => {
    const actual = toHeading(1)(heading1);
    expect(actual).toMatchSnapshot();
  });

  it('should transform a heading 2', () => {
    const actual = toHeading(2)(heading2);
    expect(actual).toMatchSnapshot();
  });

  it('should transform a heading 3', () => {
    const actual = toHeading(3)(heading3);
    expect(actual).toMatchSnapshot();
  });

  it('should transform text', () => {
    const actual = toParagraph(text);
    expect(actual).toMatchSnapshot();
  });

  it('should transform an unordered list', () => {
    const actual = unorderedList.map(toListItem(BLOCKS.UL_LIST));
    expect(actual).toMatchSnapshot();
  });

  it('should transform an ordered list', () => {
    const actual = orderedList.map(toListItem(BLOCKS.OL_LIST));
    expect(actual).toMatchSnapshot();
  });

  it('should transform a divider', () => {
    const actual = toHorizontalRule(divider);
    expect(actual).toMatchSnapshot();
  });

  it('should transform a quote', () => {
    const actual = toQuote(quote);
    expect(actual).toMatchSnapshot();
  });

  it('should transform a callout', () => {
    const actual = toCallout(callout);
    expect(actual).toMatchSnapshot();
  });

  it('should transform an image', () => {
    const actual = toImage(image);
    expect(actual).toMatchSnapshot();
  });
});
