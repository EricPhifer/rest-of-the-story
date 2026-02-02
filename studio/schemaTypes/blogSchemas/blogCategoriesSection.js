import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'blogCategoriesSection',
  title: 'Blog – Categories Grid',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Browse by Category' }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 2,
      initialValue: 'Explore articles by topic—program updates, success stories, and more.'
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({title}) => ({ title: title || 'Blog – Categories Grid' })
  }
})
