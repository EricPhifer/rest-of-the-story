// scripts/syncAlgolia.js
import { algoliasearch }      from 'algoliasearch'
import { createClient }       from '@sanity/client'
import dotenv                 from 'dotenv'

dotenv.config()

// 1. Pull straight from process.env
const {
  VITE_SANITY_PROJECT_ID,
  VITE_SANITY_DATASET,
  SANITY_API_TOKEN,
  VITE_ALGOLIA_APP_ID,
  VITE_ALGOLIA_ADMIN_KEY,
  VITE_ALGOLIA_INDEX_NAME
} = process.env

console.log('Project ID:', VITE_SANITY_PROJECT_ID)
console.log('Dataset:', VITE_SANITY_DATASET)
console.log('Algolia App ID:', VITE_ALGOLIA_APP_ID)
console.log('Algolia Index Name:', VITE_ALGOLIA_INDEX_NAME)
console.log('Algolia Admin Key:', VITE_ALGOLIA_ADMIN_KEY ? '******' : 'Not set')
console.log('Sanity API Token:', SANITY_API_TOKEN ? '******' : 'Not set')

if (
  !VITE_SANITY_PROJECT_ID ||
  !VITE_SANITY_DATASET    ||
  !SANITY_API_TOKEN  ||
  !VITE_ALGOLIA_APP_ID    ||
  !VITE_ALGOLIA_ADMIN_KEY ||
  !VITE_ALGOLIA_INDEX_NAME
) {
  console.error('❌  Missing one or more required env variables.')
  process.exit(1)
}

// 2. Sanity client
const sanity = createClient({
  projectId:    VITE_SANITY_PROJECT_ID,
  dataset:      VITE_SANITY_DATASET,
  apiVersion:   '2023-06-01',
  useCdn:       false,
  token:        SANITY_API_TOKEN,
})

// 3. Algolia client
const algolia = algoliasearch(
  VITE_ALGOLIA_APP_ID,
  VITE_ALGOLIA_ADMIN_KEY
)

async function run() {
  // fetch your documents
  const pages = await sanity.fetch(`*[_type=='page']{_id, title, slug, content}`)
  const posts = await sanity.fetch(`*[_type=='post']{_id, title, excerpt, slug}`)
  const products = await sanity.fetch(`*[_type=='product']{_id, name, description, slug}`)

  // normalize to a flat array
  const records = [
    ...pages.map(p => ({
      objectID: `page-${p._id}`,
      title:    p.title,
      excerpt:  p.content[0]?.children?.[0]?.text.slice(0, 140) || '',
      url:      `/${p.slug.current}`,
      type:     'page',
      priority: 1
    })),
    ...posts.map(p => ({
      objectID: `post-${p._id}`,
      title:    p.title,
      excerpt:  p.excerpt,
      url:      `/blog/${p.slug.current}`,
      type:     'post',
      priority: 2
    })),
    ...products.map(p => ({
      objectID: `product-${p._id}`,
      title:    p.name,
      excerpt:  (p.description || '').slice(0, 140),
      url:      `/shop/${p.slug.current}`,
      type:     'product',
      priority: 3
    })),
  ]

  // 4. Save them in one shot
  // v5 client method, no initIndex
  const { objectIDs } = await algolia.saveObjects({
    indexName: VITE_ALGOLIA_INDEX_NAME,
    objects:   records,
    // optional: auto‐generate if you omitted objectID
    autoGenerateObjectIDIfNotExist: false
  })

  console.log(`✅  Synced ${objectIDs.length} records to ${VITE_ALGOLIA_INDEX_NAME}`)
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
