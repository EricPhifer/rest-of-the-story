// schemas/buttonSection.js
export default {
  name: 'buttonSection',
  type: 'object',
  title: 'Button Section',
  fields: [
    {
      name: 'buttons',
      title: 'Buttons',
      description: 'Create 1-4 button links.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Button Text',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'url',
              type: 'url',
              title: 'External URL',
              description: 'Choose one: external or internal.',
              hidden: ({ parent }) => parent?.internalLink
            },
            {
              name: 'internalLink',
              type: 'reference',
              to: [{ type: 'page' }],
              title: 'Internal Page Link',
              description: 'Choose one: external or internal.',
              hidden: ({ parent }) => parent?.url
            }
          ],
          validation: (Rule) =>
            Rule.custom((btn) => {
              if (btn.url && btn.internalLink) {
                return 'Only one of External URL or Internal Link may be set.'
              }
              if (!btn.url && !btn.internalLink) {
                return 'Please provide either an External URL or an Internal Link.'
              }
              return true
            }),
          preview: {
            select: { title: 'text' }
          }
        }
      ],
      validation: (Rule) => Rule.min(1).max(4)
    }
  ],
  preview: {
    prepare() {
      return { title: 'Button Section' }
    }
  }
}
