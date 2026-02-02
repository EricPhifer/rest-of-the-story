// /sanity/schemas/category.js
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'category',
  type: 'document',
  title: 'Blog Category',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Category title',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      title: 'Short description',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Describe the image for screen readers.',
          validation: (Rule) => Rule.required().warning('Provide alt text for accessibility.'),
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image' },
  },
  orderings: [
    { title: 'Title A→Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
})
