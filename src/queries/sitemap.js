// queries/sitemapSection.js
import groq from 'groq'

const sitemapSectionQuery = groq`
  *[_type == "sitemapSection"][0]{
    title,
    linkGroups[] {
      categoryTitle,
      links[] {
        label,
        internalLink->{
          title,
          slug
        },
        externalUrl
      }
    }
  }
`

export default sitemapSectionQuery
