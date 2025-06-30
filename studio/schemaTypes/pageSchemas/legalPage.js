export default {
  name: 'legalPage',
  type: 'document',
  title: 'Legal Page',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Page Title',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'body',
      type: 'array',
      title: 'Page Content',
      of: [{ type: 'block' }]
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
};
