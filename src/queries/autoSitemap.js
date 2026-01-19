import groq from 'groq'

const autoSitemapQuery = groq`
{
  "pages": *[_type == "page"] | order(title asc) {
    title,
    "slug": slug.current
  },
  "posts": *[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    publishedAt
  },
  "categories": *[_type == "category"] | order(title asc) {
    title,
    "slug": slug.current,
    "postCount": count(*[_type == "post" && references(^._id)])
  },
  "legalPages": *[_type == "legalPage"] | order(title asc) {
    title,
    "slug": slug.current
  }
}
`

export default autoSitemapQuery
