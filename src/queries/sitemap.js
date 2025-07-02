// queries/sitemapSection.js
import groq from 'groq'

const sitemapQuery = groq`
  *[_type == "sitemapSection"][0]{
    title,
    linkGroups[]{
      categoryTitle,
      links[]{
        label,
        internalLink->{
          title,
          slug { current }
        },
        externalUrl
      }
    }
  }
`

export default sitemapQuery
