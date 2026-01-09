import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'finalNote',
  title: 'Final note',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Show final note',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'body',
      title: 'Message',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'}
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    validation: (Rule) =>
                      Rule.uri({allowRelative: false, scheme: ['http', 'https', 'mailto', 'tel']}),
                  },
                  {name: 'newTab', type: 'boolean', title: 'Open in new tab'}
                ],
              },
            ],
          },
        },
      ],
      description: 'Default copy can be edited per post.',
    }),
    defineField({
      name: 'ctas',
      title: 'CTA links (bulleted)',
      type: 'array',
      validation: (Rule) => Rule.min(1).max(6),
      of: [
        {
          type: 'object',
          name: 'cta',
          fields: [
            {name: 'label', type: 'string', validation: (Rule) => Rule.required()},
            {
              name: 'href',
              type: 'url',
              title: 'URL',
              validation: (Rule) =>
                Rule.required().uri({scheme: ['http', 'https', 'mailto', 'tel']}),
            },
          ],
          preview: {
            select: {title: 'label', subtitle: 'href'},
          },
        },
      ],
    }),
  ],
  initialValue: {
    enabled: true,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text:
              'If you’re new to secondhand shopping, start with one goal—maybe finding a few fall outfits or a new stack of read-alouds. Make it a family outing. Let your kids help hunt for treasures. And know that every choice you make helps build a home filled with character, creativity, and care.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text:
              'You don’t have to do it all perfectly. But with a little creativity, your closet can absolutely fuel your classroom.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{_type: 'span', text: 'Want more tips like this?'}],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text:
              '🛒 Visit our shop in person or follow us on Facebook and Instagram for fresh arrivals, sales, and family encouragement.',
          },
        ],
      },
    ],
    ctas: [
      {label: 'Shop Pre-Loved Essentials', href: ''},
      {label: 'Contact Us with Questions', href: ''},
    ],
  },
  preview: {
    select: {enabled: 'enabled', count: 'ctas.length'},
    prepare({enabled, count}) {
      return {
        title: enabled ? 'Final note (shown)' : 'Final note (hidden)',
        subtitle: `${count ?? 0} CTA link(s)`,
      }
    },
  },
})
