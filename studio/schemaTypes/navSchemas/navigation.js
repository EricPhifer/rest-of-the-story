import { defineType } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Upload your site logo (used in the header).'
    },
    {
      name: 'grandOpeningMessage',
      title: 'Grand Opening Message',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Text shown next to the logo to announce the grand opening.'
    }
  ],
  preview: {
    select: {
      title: 'grandOpeningMessage'
    },
    prepare({ title }) {
      return {
        title: 'Navigation Settings',
        subtitle: title?.[0]?.children?.[0]?.text || 'Grand Opening Message'
      }
    }
  }
})
