import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload your site logo (used in the header).'
    }),
    defineField({
      name: 'grandOpeningMessage',
      title: 'Message',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Text shown next to the logo.'
    }),
    defineField({
      name: 'links',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Link',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'internalLink',
              title: 'Internal Page',
              type: 'reference',
              to: [
                { type: 'page' },
                { type: 'faqPage' },
                { type: 'sitemapPage' },
                { type: 'legalPage' },
              ]
            }
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'internalLink.slug.current'
            }
          }
        }
      ],
      description: 'Set the main navigation links in the header.'
    })
  ],
  preview: {
    select: {
      title: 'grandOpeningMessage'
    },
    prepare({ title }) {
      return {
        title: 'Navigation Settings',
        subtitle: title?.[0]?.children?.[0]?.text || 'Grand Opening Message'
      }
    }
  }
})
