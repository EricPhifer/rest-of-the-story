// queries/finalNote.js
import groq from 'groq'

export const finalNoteProjection = groq`
  finalNote{
    enabled,
    body[],
    ctas[]{label, href}
  }
`

// Optional: standalone helpers if you ever want just the finalNote
export const finalNoteByPostSlug = groq`
  *[_type == "post" && slug.current == $slug][0]{
    ${finalNoteProjection}
  }.finalNote
`

export const finalNoteByPostId = groq`
  *[_type == "post" && _id == $id][0]{
    ${finalNoteProjection}
  }.finalNote
`
