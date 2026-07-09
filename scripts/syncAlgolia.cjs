// scripts/syncAlgolia.cjs
// algoliasearch v5 exports a named `algoliasearch` factory (no `.default`).
const { algoliasearch } = require('algoliasearch')
const { createClient } = require('@sanity/client')
const dotenv = require('dotenv')

dotenv.config()

// 1. Pull straight from process.env
const {
  VITE_SANITY_PROJECT_ID,
  VITE_SANITY_DATASET,
  SANITY_API_TOKEN,
  VITE_ALGOLIA_APP_ID,
  ALGOLIA_ADMIN_KEY,
  VITE_ALGOLIA_INDEX_NAME
} = process.env

if (
  !VITE_SANITY_PROJECT_ID ||
  !VITE_SANITY_DATASET    ||
  !SANITY_API_TOKEN       ||
  !VITE_ALGOLIA_APP_ID    ||
  !ALGOLIA_ADMIN_KEY      ||
  !VITE_ALGOLIA_INDEX_NAME
) {
  console.error('❌  Missing one or more required env variables.')
  process.exit(1)
}

// 2. Sanity client
const sanity = createClient({
  projectId:  VITE_SANITY_PROJECT_ID,
  dataset:    VITE_SANITY_DATASET,
  apiVersion: '2023-06-01',
  useCdn:     false,
  token:      SANITY_API_TOKEN,
})

// 3. Algolia client
const algolia = algoliasearch(
  VITE_ALGOLIA_APP_ID,
  ALGOLIA_ADMIN_KEY
)

async function run() {
  // fetch your documents (published only — exclude Studio drafts)
  const notDraft = `!(_id in path('drafts.**'))`
  const pages = await sanity.fetch(`*[_type=='page' && ${notDraft}]{
    _id, title, slug,
    "description": coalesce(seo.description, pt::text(content[_type in ['textSection','textImageSection','heroSection']][0].body), "")
  }`)
  const posts = await sanity.fetch(`*[_type=='post' && ${notDraft}]{
    _id, title, slug, "description": pt::text(body)
  }`)
  const products = await sanity.fetch(`*[_type=='product' && ${notDraft}]{
    _id, "title": name, slug, description
  }`)

  // Field names match the Algolia Experience item template
  // (item.title -> title, item.description -> description, item.category -> path).
  // `url` is used for click-through navigation.
  const records = [
    ...pages.map(p => ({
      objectID:    `page-${p._id}`,
      title:       p.title,
      description: (p.description || '').slice(0, 200),
      path:        `/${p.slug.current}`,
      url:         `/${p.slug.current}`,
      type:        'page',
      priority:    1
    })),
    ...posts.map(p => ({
      objectID:    `post-${p._id}`,
      title:       p.title,
      description: (p.description || '').slice(0, 200),
      path:        `/blog-pages/${p.slug.current}`,
      url:         `/blog-pages/${p.slug.current}`,
      type:        'post',
      priority:    2
    })),
    ...products.map(p => ({
      objectID:    `product-${p._id}`,
      title:       p.title,
      description: (p.description || '').slice(0, 200),
      path:        `/shop/${p.slug.current}`,
      url:         `/shop/${p.slug.current}`,
      type:        'product',
      priority:    3
    })),
  ]

  // 4. Save them in one shot. v5 has no initIndex — saveObjects takes the index
  //    name inline and returns an array of batch responses (each with objectIDs).
  //    Every record already carries an explicit objectID.
  const responses = await algolia.saveObjects({
    indexName: VITE_ALGOLIA_INDEX_NAME,
    objects: records,
  })

  const savedCount = responses.reduce(
    (total, batch) => total + (batch.objectIDs?.length || 0),
    0
  )

  console.log(`✅  Synced ${savedCount} records to ${VITE_ALGOLIA_INDEX_NAME}`)

  if (savedCount === 0) {
    console.warn('⚠️  No objectIDs returned from Algolia response:', responses)
  }
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
