// studio/schemas/video.js
export default {
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'video', type: 'mux.video', title: 'Video' },
  ],
}
