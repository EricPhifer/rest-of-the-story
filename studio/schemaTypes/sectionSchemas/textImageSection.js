export default {
  name: 'textImageSection',
  type: 'object',
  title: 'Text & Image Section',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
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
      name: 'altText',
      title: 'Alt Text for Image',
      type: 'string',
      description: 'Briefly describe the image for non-sighted users. This text will be used for accessibility purposes and when the image cannot be displayed.'
    },
    {
      name: 'imagePosition',
      type: 'string',
      title: 'Image Position',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' }
        ],
        layout: 'radio',
        direction: 'horizontal'
      },
      initialValue: 'right'
    },
    {
      name: 'imageFit',
      type: 'string',
      title: 'Image Display Mode',
      description: 'Auto detects based on aspect ratio. Override if needed.',
      options: {
        list: [
          { title: 'Auto (Recommended)', value: 'auto' },
          { title: 'Cover (fill space, may crop)', value: 'cover' },
          { title: 'Contain (show full image)', value: 'contain' }
        ],
        layout: 'radio',
        direction: 'horizontal'
      },
      initialValue: 'auto'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }]
    }
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'image'
    },
    prepare({ title, media }) {
      return {
        title: title || 'Text & Image Section',
        media
      }
    }
  }
}
