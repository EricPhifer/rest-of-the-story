export default {
  name: 'buttonSection',
  type: 'object',
  title: 'Button Section',
  fields: [
    {
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Button Text',
              validation: Rule => Rule.required()
            },
            {
              name: 'url',
              type: 'url',
              title: 'External URL',
              hidden: ({ parent }) => parent?.internalLink
            },
            {
              name: 'internalLink',
              type: 'reference',
              to: [{ type: 'page' }],
              title: 'Internal Page Link',
              hidden: ({ parent }) => parent?.url
            }
          ],
          preview: {
            select: {
              title: 'text'
            }
          }
        }
      ],
      validation: Rule => Rule.min(1).max(4)
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Button Section'
      };
    }
  }
}
