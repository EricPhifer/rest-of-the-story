// ./queries/siteSettings.js
import groq from 'groq'

const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    whiteColor{hex},
    offWhiteColor{hex},
    blackColor{hex},
    offBlackColor{hex},
    primaryLightColor{hex},
    primaryDarkColor{hex},
    secondaryLightColor{hex},
    secondaryDarkColor{hex},
    alertLightColor{hex},
    alertDarkColor{hex},
    accentLightColor{hex},
    accentDarkColor{hex}
  }
`

export default siteSettingsQuery
