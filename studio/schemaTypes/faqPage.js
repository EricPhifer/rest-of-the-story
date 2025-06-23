export default {
  name: 'faqPage',
  type: 'document',
  title: 'FAQ Page',
  fields: [
     {
      name: 'title',
      type: 'string',
      title: 'Page Title'
     },
     {
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'faqs',
      type: 'array',
      title: 'FAQs',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            {
              name: 'question',
              type: 'string',
              title: 'Question'
            },
            {
              name: 'answer',
              type: 'text',
              title: 'Answer'
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage'
    }
  }
}
