// schemas/mapEmbed.js
export default {
  name: 'mapEmbed',
  type: 'object',
  title: 'Map Embed',
  fields: [
    {
      name: 'mapEmbedBlocks',
      type: 'array',
      title: 'Embed Blocks',
      of: [{ type: 'block' }],
      description: 'Use the block editor to add your embed HTML'
    }
  ],
  preview: {
    select: {
      blocks: 'mapEmbedBlocks'
    },
    prepare({ blocks = [] }) {
      const firstText = (blocks[0]?.children[0]?.text || '').slice(0, 50)
      return {
        title: 'Google Map Embed',
        subtitle: firstText ? firstText + '…' : 'No content'
      }
    }
  }
}
