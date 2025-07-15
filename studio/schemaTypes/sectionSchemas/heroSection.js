export default {
  name: 'heroSection',
  type: 'object',
  title: 'Hero Section',
  fields: [
    {
      name: 'heading',
      type: 'array',
      title: 'Heading',
      of: [{ type: 'block' }],
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
      headingBlocks: 'heading',  // grabs the array of block objects
      media: 'image'
    },
    prepare({ headingBlocks, media }) {
      // default fallback
      let title = 'Hero Section'

      if (Array.isArray(headingBlocks)) {
        // extract text from each block’s children, join into strings
        const texts = headingBlocks
          .filter(b => b._type === 'block' && Array.isArray(b.children))
          .map(b => b.children.map(child => child.text).join(''))

        // pick the first non-empty string, or keep fallback
        const first = texts.find(t => t && t.trim().length)
        if (first) title = first
      }

      return {
        title,
        media
      }
    }
  }
}
