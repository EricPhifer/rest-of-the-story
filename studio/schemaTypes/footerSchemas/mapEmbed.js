export default {
  name: 'mapEmbed',
  type: 'object',
  title: 'Map Embed',
  fields: [
    {
      name: 'mapUrl',
      type: 'url',
      title: 'Google Maps Embed URL',
      description: 'Paste the full embed URL from Google Maps'
    }
  ],
  preview: {
    select: {
      title: 'mapUrl'
    },
    prepare({ title }) {
      return {
        title: title || 'Google Map Embed'
      };
    }
  }
}
