export default {
  name: 'textSection',
  type: 'object',
  title: 'Text Section',
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
    }
  ]
}
