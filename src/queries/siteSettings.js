// ./queries/siteSettings.js
import groq from 'groq'

const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    primaryColor{hex},
    secondaryColor{hex},
    accentColor{hex}
  }
`

export default siteSettingsQuery
