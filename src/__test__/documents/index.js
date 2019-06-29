/* eslint-disable max-len */
import page from './page';
import heading1 from './heading-1';
import heading2 from './heading-2';
import heading3 from './heading-3';
import text from './text';
import unorderedList from './unordered-list';
import orderedList from './ordered-list';
import quote from './quote';
import callout from './callout';
import divider from './divider';
import image from './image';

export function toBlock(block) {
  const { id } = block.value;
  return { [id]: block };
}

export {
  page,
  heading1,
  heading2,
  heading3,
  text,
  unorderedList,
  orderedList,
  quote,
  callout,
  divider,
  image
};

// eslint-disable-next-line import/prefer-default-export
export default {
  recordMap: {
    block: {
      ...toBlock(page),
      '43619567-aaa9-4b7a-92fa-42385f2ef72d': {
        role: 'reader',
        value: {
          id: '43619567-aaa9-4b7a-92fa-42385f2ef72d',
          version: 17,
          type: 'collection_view_page',
          view_ids: ['acfc4dbf-9aac-406d-b2f9-3620711f537e'],
          collection_id: 'f065ca78-f9d6-401c-a205-bff704d69c93',
          permissions: [
            {
              role: 'editor',
              type: 'user_permission',
              user_id: '940b0cf1-ab3e-479e-b624-7cc55de196e5'
            },
            {
              role: 'reader',
              type: 'public_permission',
              allow_duplicate: false
            }
          ],
          created_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          created_time: 1561110950945,
          last_edited_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          last_edited_time: 1561806300000,
          parent_id: 'ca9efa91-8438-4f8b-8829-8de20b562bae',
          parent_table: 'space',
          alive: true
        }
      },
      ...toBlock(heading1),
      ...toBlock(heading2),
      ...toBlock(heading3),
      ...toBlock(text),
      ...unorderedList.reduce(
        (acc, item) => ({ ...acc, ...toBlock(item) }),
        {}
      ),
      ...toBlock(divider),
      ...orderedList.reduce((acc, item) => ({ ...acc, ...toBlock(item) }), {}),
      '56ace7bf-176b-4185-b966-5307d99011ad': {
        role: 'reader',
        value: {
          id: '56ace7bf-176b-4185-b966-5307d99011ad',
          version: 5,
          type: 'text',
          created_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          created_time: 1561806600000,
          last_edited_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          last_edited_time: 1561806600000,
          parent_id: '810feeaf-7b5d-45e2-839f-5e847ba6de6c',
          parent_table: 'block',
          alive: true
        }
      },
      ...toBlock(quote),
      '1b0e9528-8ea3-4fe5-ab6e-919580224cde': {
        role: 'reader',
        value: {
          id: '1b0e9528-8ea3-4fe5-ab6e-919580224cde',
          version: 5,
          type: 'text',
          created_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          created_time: 1561806600000,
          last_edited_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          last_edited_time: 1561806600000,
          parent_id: '810feeaf-7b5d-45e2-839f-5e847ba6de6c',
          parent_table: 'block',
          alive: true
        }
      },
      ...toBlock(callout),
      '9034a254-1e94-4da6-ad97-235473efd998': {
        role: 'reader',
        value: {
          id: '9034a254-1e94-4da6-ad97-235473efd998',
          version: 5,
          type: 'text',
          created_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          created_time: 1561806600000,
          last_edited_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          last_edited_time: 1561806600000,
          parent_id: '810feeaf-7b5d-45e2-839f-5e847ba6de6c',
          parent_table: 'block',
          alive: true
        }
      },
      '5dd01c48-930a-4c7f-88de-f9340191a045': {
        role: 'reader',
        value: {
          id: '5dd01c48-930a-4c7f-88de-f9340191a045',
          version: 28,
          type: 'page',
          properties: { title: [['Hi Carina']] },
          content: ['3b1aab51-dd55-4c28-af1a-9f8cf2542532'],
          created_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          created_time: 1561110950947,
          last_edited_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          last_edited_time: 1561639740000,
          parent_id: 'f065ca78-f9d6-401c-a205-bff704d69c93',
          parent_table: 'collection',
          alive: true
        }
      },
      'b48d8c40-a67a-4d2d-bf9c-0e6d8acd2aeb': {
        role: 'reader',
        value: {
          id: 'b48d8c40-a67a-4d2d-bf9c-0e6d8acd2aeb',
          version: 4,
          type: 'text',
          created_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          created_time: 1561806319135,
          last_edited_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          last_edited_time: 1561806600000,
          parent_id: '810feeaf-7b5d-45e2-839f-5e847ba6de6c',
          parent_table: 'block',
          alive: true,
          copied_from: 'bf4a215b-b1a0-4bd4-9bfb-9db8de0d5a93'
        }
      },
      '1dda3297-5bb1-4c53-b85a-c2c2978dff53': {
        role: 'reader',
        value: {
          id: '1dda3297-5bb1-4c53-b85a-c2c2978dff53',
          version: 5,
          type: 'column_list',
          content: [
            'c0cc96ba-2fdc-4f51-8333-caddb0365aba',
            '190f18e7-b5e3-4e79-809a-7b8047d36e29'
          ],
          created_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          created_time: 1561806600000,
          last_edited_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          last_edited_time: 1561806600000,
          parent_id: '810feeaf-7b5d-45e2-839f-5e847ba6de6c',
          parent_table: 'block',
          alive: true
        }
      },
      'c0cc96ba-2fdc-4f51-8333-caddb0365aba': {
        role: 'reader',
        value: {
          id: 'c0cc96ba-2fdc-4f51-8333-caddb0365aba',
          version: 5,
          type: 'column',
          content: ['24388919-f1b9-44af-8c4a-cafad41b7945'],
          format: { column_ratio: 0.5 },
          created_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          created_time: 1561806600000,
          last_edited_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          last_edited_time: 1561806600000,
          parent_id: '1dda3297-5bb1-4c53-b85a-c2c2978dff53',
          parent_table: 'block',
          alive: true
        }
      },
      '190f18e7-b5e3-4e79-809a-7b8047d36e29': {
        role: 'reader',
        value: {
          id: '190f18e7-b5e3-4e79-809a-7b8047d36e29',
          version: 5,
          type: 'column',
          content: ['2b888d38-3da6-4802-a8b6-5be56c4d42b9'],
          format: { column_ratio: 0.5 },
          created_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          created_time: 1561806600000,
          last_edited_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          last_edited_time: 1561806600000,
          parent_id: '1dda3297-5bb1-4c53-b85a-c2c2978dff53',
          parent_table: 'block',
          alive: true
        }
      },
      '24388919-f1b9-44af-8c4a-cafad41b7945': {
        role: 'reader',
        value: {
          id: '24388919-f1b9-44af-8c4a-cafad41b7945',
          version: 5,
          type: 'text',
          properties: {
            title: [
              [
                'Bacon ipsum dolor amet beef ham hock pig cow tail meatloaf. Shoulder sausage porchetta landjaeger. Ground round kevin tongue venison brisket burgdoggen pork belly landjaeger. Chuck jerky frankfurter kevin, beef ribs meatball leberkas pork chop tenderloin beef.'
              ]
            ]
          },
          created_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          created_time: 1561806319135,
          last_edited_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          last_edited_time: 1561806600000,
          parent_id: 'c0cc96ba-2fdc-4f51-8333-caddb0365aba',
          parent_table: 'block',
          alive: true,
          copied_from: '9ed995cb-504f-476e-8ba5-325989b43550'
        }
      },
      ...toBlock(image),
      '020b3f0b-b154-4764-9dc4-7f1478879ef1': {
        role: 'reader',
        value: {
          id: '020b3f0b-b154-4764-9dc4-7f1478879ef1',
          version: 4,
          type: 'text',
          created_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          created_time: 1561806319135,
          last_edited_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          last_edited_time: 1561806600000,
          parent_id: '810feeaf-7b5d-45e2-839f-5e847ba6de6c',
          parent_table: 'block',
          alive: true,
          copied_from: '6d54ba60-c718-4a13-9dee-203956d7e321'
        }
      },
      '9622dd8a-7411-4fe3-83f9-fe7f07876a3a': {
        role: 'reader',
        value: {
          id: '9622dd8a-7411-4fe3-83f9-fe7f07876a3a',
          version: 8,
          type: 'toggle',
          properties: { title: [['hello world']] },
          content: ['c14d9a9b-0943-457c-a71c-a25e28f71bc2'],
          created_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          created_time: 1561806319135,
          last_edited_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          last_edited_time: 1561806660000,
          parent_id: '810feeaf-7b5d-45e2-839f-5e847ba6de6c',
          parent_table: 'block',
          alive: true,
          copied_from: 'd8070e71-8535-4cd3-8a2b-84e4639fdf39'
        }
      },
      'd4a4b3e8-2edd-4b27-a128-06f64a53fd33': {
        role: 'reader',
        value: {
          id: 'd4a4b3e8-2edd-4b27-a128-06f64a53fd33',
          version: 7,
          type: 'text',
          created_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          created_time: 1561806660000,
          last_edited_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          last_edited_time: 1561806660000,
          parent_id: '810feeaf-7b5d-45e2-839f-5e847ba6de6c',
          parent_table: 'block',
          alive: true
        }
      },
      '3ad8fcc1-57d4-4129-9999-33e99ca46a0d': {
        role: 'reader',
        value: {
          id: '3ad8fcc1-57d4-4129-9999-33e99ca46a0d',
          version: 7,
          type: 'figma',
          properties: {
            source: [
              [
                'https://www.figma.com/file/gjOUJBTS2LGjDMN6NkbraXUM/Mobile-Overview?node-id=62%3A819'
              ]
            ]
          },
          format: {
            block_width: 800,
            block_height: 450,
            display_source:
              'https://www.figma.com/embed?embed_host=oembed&url=https://www.figma.com/file/gjOUJBTS2LGjDMN6NkbraXUM/Mobile-Overview?node-id=62%3A819',
            block_full_width: false,
            block_page_width: true,
            block_preserve_scale: false
          },
          created_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          created_time: 1561806727629,
          last_edited_by: '940b0cf1-ab3e-479e-b624-7cc55de196e5',
          last_edited_time: 1561806780000,
          parent_id: '810feeaf-7b5d-45e2-839f-5e847ba6de6c',
          parent_table: 'block',
          alive: true
        }
      }
    }
  }
};
