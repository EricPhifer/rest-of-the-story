// src/queries/footerMainQuery.js
import groq from 'groq'

const footerMainQuery = groq`
{
  "main": *[_type == "mainFooter"][0]{
    // Logo
    logo { asset->{ url } },

    // Nav links
    navLinks[]{
      _key,
      label,
      "slug": internalLink->slug.current
    },

    // Blog teaser
    blogSection {
      heading,
      body,
      "buttonText": button.text,
      "buttonSlug": button.internalLink->slug.current
    },

    // Newsletter form
    newsletterForm {
      placeholder,
      buttonText,
      formAction
    },

    // Embedded map
    mapContent[]{ mapEmbedBlocks },

    // Contact info (address / phone / email)
    contactInfo {
      address,
      addressIcon,
      phone,
      phoneIcon,
      email,
      emailIcon
    },

    // Social media links
    socialMediaLinks[] {
      platform,
      url,
      icon
    },

    // Copyright & credits
    copyrightContent[] {
      companyName,
      legalPages[]-> { title, slug },
      contributors[] { _key, name, url }
    }
  }
}
`

export default footerMainQuery
