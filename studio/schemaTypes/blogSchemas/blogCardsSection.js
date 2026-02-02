import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'blogCardsSection',
  title: 'Blog – Latest Posts',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Latest Stories & News' }),
    defineField({ name: 'limit', type: 'number', initialValue: 5, validation: (Rule)=> Rule.min(1).max(12) })
  ],
  preview: {
    select: { title: 'title', limit: 'limit' },
    prepare: ({title, limit}) => ({ title: title || 'Blog – Latest Posts', subtitle: `Limit: ${limit ?? 5}` })
  }
})
