// Page Imports
import page from './pageSchemas/page'
import faqPage from './pageSchemas/faqPage'
import legalPage from './pageSchemas/legalPage'
import sitemapPage from './pageSchemas/sitemapPage'

// Navigation Imports
import navigation from './navSchemas/navigation'

// Components Imports
import formSection from './sectionSchemas/formSection'
import heroSection from './sectionSchemas/heroSection'
import textSection from './sectionSchemas/textSection'
import imageSection from './sectionSchemas/imageSection'
import videoSection from './sectionSchemas/videoSection'
import buttonSection from './sectionSchemas/buttonSection'
import textImageSection from './sectionSchemas/textImageSection'
import threeCardSection from './sectionSchemas/threeCardSection'
import contactInfoSection from './sectionSchemas/contactInfoSection'
import contactCardSection from './sectionSchemas/contactCardSection'

// General Information Imports
import contactInfo from './infoSchemas/contactInfo'
import storeHoursEntry from './infoSchemas/storeHoursEntry'
import socialMediaLink from './infoSchemas/socialMediaLink'

// Card Imports
import phoneCard from './cardSchemas/phoneCard'
import emailCard from './cardSchemas/emailCard'
import socialLinksCard from './cardSchemas/socialLinksCard'

// Footer Imports
import mapEmbed from './footerSchemas/mapEmbed'
import mainFooter from './footerSchemas/mainFooter'
import copyrightFooter from './footerSchemas/copyrightFooter'

// Blog Imports
import post from './blogSchemas/post'
import author from './blogSchemas/author'
import category from './blogSchemas/category'
import blockContent from './blogSchemas/blockContent'

// Setting Imports
import siteSettings from './settingSchemas/siteSettings'

export const schemaTypes = [
 // Page Schemas
 page,
 legalPage,
 faqPage,
 sitemapPage,
 
 // Navigation Schemas
 navigation,

 // Components Schemas
 heroSection,
 textSection,
 imageSection,
 videoSection,
 buttonSection,
 textImageSection,
 threeCardSection,
 contactInfoSection,
 contactCardSection,
 formSection,

 // Information Schemas
 contactInfo,
 storeHoursEntry,
 socialMediaLink,

 // Card Schemas
 phoneCard,
 emailCard,
 socialLinksCard,

 // Footer Schemas
 mapEmbed,
 mainFooter,
 copyrightFooter,

 // Blog Schemas
 post, 
 author, 
 category, 
 blockContent,

 // Setting Schemas
 siteSettings 

]
