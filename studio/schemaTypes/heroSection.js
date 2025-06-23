export default {
  name: 'heroSection',
  type: 'object',
  title: 'Hero Section',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Heading'
    },
    {
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [{ type: 'block' }]
    },
      {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true // Enables image cropping
      }
    },
    {
      name: 'button',
      title: 'Optional Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          type: 'string',
          title: 'Button Text'
        },
        {
          name: 'url',
          type: 'url',
          title: 'Link URL'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'image'
    },
    prepare({ title, media }) {
      return {
        title: title || 'Hero Section',
        media
      }
    }
  }
}
