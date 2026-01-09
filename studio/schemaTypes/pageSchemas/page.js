// studio/schemas/page.js
export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Page Title'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
        required: true
      }
    },
    {
      name: 'content',
      type: 'array',
      title: 'Page Builder',
      of: [
        { type: 'heroSection' },
        { type: 'textSection' },
        { type: 'imageSection' },
        { type: 'videoSection' },
        { type: 'buttonSection' },
        { type: 'textImageSection' },
        { type: 'threeCardSection' },
        { type: 'contactInfoSection' },
        { type: 'contactCardSection' },
        { type: 'formSection' },
        { type: 'blogCardsSection' },
        { type: 'blogCategoriesSection' }
      ]
    }
  ]
}
