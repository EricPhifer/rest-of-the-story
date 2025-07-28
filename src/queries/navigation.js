import groq from 'groq'

export const navigationQuery = groq`*[_type == "navigation"][0]{
  logo{
    asset->{ _id, url },
    crop,
    hotspot,
    alt
  },
  grandOpeningMessage[],
  links[]{
    label,
    "slug": internalLink->slug.current
  }
}`
