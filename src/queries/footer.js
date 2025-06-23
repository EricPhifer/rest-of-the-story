// ./queries/footerMainQuery.js
import groq from 'groq'

const footerMainQuery = groq`
{
  "main": *[_type == "mainFooter"][0]{
    logo { asset->{ url } },
    navLinks[] {
      label,
      internalLink-> { slug }
    },
    blogSection {
      heading,
      body,
      button { text, url }
    },
    newsletterForm {
      placeholder,
      buttonText,
      formAction
    }
  },
  "contact": *[_type == "contactInformationSection"][0]{
    address,
    phone,
    email
  },
  "social": *[_type == "contactCardSection"][0].socialMedia[]{
    label,
    icon,
    url
  }
}
`

export default footerMainQuery
