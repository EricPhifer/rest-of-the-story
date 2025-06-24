export default {
  name: 'threeCardSection',
  type: 'object',
  title: 'Three Section Content',
  fields: [
    {
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'iconImage',
              title: 'Icon or Image',
              type: 'image',
              options: {
                hotspot: true
              }
            },
            {
              name: 'number',
              title: 'Number (if no image)',
              type: 'string',
              description: 'Optional number to display instead of an image/icon.'
            },
            {
              name: 'heading',
              title: 'Heading',
              type: 'string'
            },
            {
              name: 'body',
              title: 'Body',
              type: 'array',
              of: [{ type: 'block' }]
            },
            {
              name: 'button',
              title: 'Button (optional)',
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Button Text',
                  type: 'string'
                },
                {
                  name: 'internalLink',
                  title: 'Internal Link',
                  type: 'reference',
                  to: [{ type: 'page' }],
                  description: 'Choose a page from your site.'
                },
              ]
            }
          ]
        }
      ],
      validation: Rule => Rule.max(3).min(3).error('Must have exactly 3 cards')
    }
  ],
  preview: {
    select: {
      title: 'cards.0.heading'
    },
    prepare({ title }) {
      return {
        title: `Three Section Content - e.g. ${title || 'Card 1'}`
      }
    }
  }
}
