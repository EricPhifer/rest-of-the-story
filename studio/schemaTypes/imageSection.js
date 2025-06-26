export default {
  name: 'imageSection',
  type: 'object',
  title: 'Image Section',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'altText',
      title: 'Alt Text for Image',
      type: 'string',
      description: 'Briefly describe the image for non-sighted users. This text will be used for accessibility purposes and when the image cannot be displayed.'
    },
    {
      name: 'button',
      title: 'Button',
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
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'image'
    },
    prepare({ title, media }) {
      return {
        title: title || 'Image Section',
        media
      }
    }
  }
}
