import groq from 'groq'
 
const blogCardsQuery = groq`
 *[_type == "post"] | order(publishedAt desc)[0...$limit]{
  title,
  "excerpt": pt::text(body),
  slug,
  publishedAt,
  mainImage{asset, alt, crop, hotspot},
  categories[]-> { _id, title, slug }
}`

export default blogCardsQuery
