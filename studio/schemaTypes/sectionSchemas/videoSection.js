export default {
  name: 'videoSection',
  type: 'object',
  title: 'Video Section',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Section Title'
    },
    {
      name: 'video',
      type: 'mux.video',
      title: 'Mux Video'
    }
  ]
}
