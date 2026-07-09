import { useHead } from '@vueuse/head'

const SITE_NAME = 'The Rest of the Story Consignment'
const SITE_URL = 'https://therestofthestory.store'

const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ConsignmentShop',
  name: 'The Rest of the Story',
  description:
    'Kids and maternity consignment shop in Elizabeth, CO offering pre-loved clothing, accessories, and homeschool learning materials.',
  url: SITE_URL,
  telephone: '+17203695465',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '114 Tabor St. #101',
    addressLocality: 'Elizabeth',
    addressRegion: 'CO',
    postalCode: '80107',
    addressCountry: 'US'
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '17:30'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '16:00'
    }
  ],
  priceRange: '$',
  sameAs: ['https://www.youtube.com/@therestofthestory']
}

/**
 * Inject LocalBusiness (ConsignmentShop) schema. Intended for the homepage only.
 * Pass a reactive getter so the schema is added/removed as the route changes in
 * the SPA — e.g. `useLocalBusinessSchema(() => slug === 'home')`.
 *
 * @param {() => boolean} [isActive] - when it returns false, no schema is emitted.
 */
export function useLocalBusinessSchema(isActive = () => true) {
  useHead(() => {
    if (!isActive()) return {}
    return {
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(LOCAL_BUSINESS_SCHEMA)
        }
      ]
    }
  })
}

/**
 * Inject BlogPosting schema for individual blog posts
 */
export function useBlogPostSchema(post) {
  if (!post) return

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    url: `${SITE_URL}/blog-pages/${post.slug}`,
    datePublished: post.publishedAt,
    ...(post.mainImage?.asset?.url && { image: post.mainImage.asset.url }),
    author: post.author?.name
      ? { '@type': 'Person', name: post.author.name }
      : { '@type': 'Organization', name: SITE_NAME },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL
    }
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema)
      }
    ]
  })
}

/**
 * Inject FAQPage schema for FAQ pages
 * @param {Array} faqs - Array of { question: string, answer: string|PortableText }
 */
export function useFaqSchema(faqs) {
  if (!faqs || faqs.length === 0) return

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof faq.answer === 'string'
          ? faq.answer
          : extractTextFromPortableText(faq.answer)
      }
    }))
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema)
      }
    ]
  })
}

/**
 * Helper to extract plain text from Portable Text blocks
 */
function extractTextFromPortableText(blocks) {
  if (!blocks || !Array.isArray(blocks)) return ''
  return blocks
    .filter(block => block._type === 'block')
    .map(block => {
      if (!block.children) return ''
      return block.children
        .filter(child => child._type === 'span')
        .map(span => span.text)
        .join('')
    })
    .join(' ')
    .slice(0, 500)
}

/**
 * Helper to truncate text for meta descriptions
 */
export function truncateForDescription(text, maxLength = 160) {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3).trim() + '...'
}
