// scripts/cleanupAlgolia.cjs
//
// The Sanity sync (scripts/syncAlgolia.cjs) is the source of truth for the search
// index — the Algolia Crawler can't traverse this JS-rendered SPA and only ever
// indexed a single page. This script removes records that don't belong to the
// sync so the index stays clean:
//   - Crawler leftovers   (objectID is NOT `page-/post-/product-` prefixed)
//   - Indexed Studio drafts (objectID contains 'drafts.')
//
// Safe by default: it only reports what it would remove. Pass --delete to apply.
//   node scripts/cleanupAlgolia.cjs            # dry run
//   node scripts/cleanupAlgolia.cjs --delete   # actually delete

const { algoliasearch } = require('algoliasearch')
const dotenv = require('dotenv')

dotenv.config()

const { VITE_ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY, VITE_ALGOLIA_INDEX_NAME } = process.env

if (!VITE_ALGOLIA_APP_ID || !ALGOLIA_ADMIN_KEY || !VITE_ALGOLIA_INDEX_NAME) {
  console.error('❌  Missing VITE_ALGOLIA_APP_ID / ALGOLIA_ADMIN_KEY / VITE_ALGOLIA_INDEX_NAME.')
  process.exit(1)
}

const DELETE = process.argv.includes('--delete')
const algolia = algoliasearch(VITE_ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY)

const isSyncRecord = id => /^(page|post|product)-/.test(id)
const isDraft = id => id.includes('drafts.')
const shouldRemove = id => !isSyncRecord(id) || isDraft(id)

async function run() {
  const all = []
  await algolia.browseObjects({
    indexName: VITE_ALGOLIA_INDEX_NAME,
    attributesToRetrieve: ['objectID'],
    aggregator: response => {
      for (const hit of response.hits) all.push(hit.objectID)
    },
  })

  const stale = all.filter(shouldRemove)
  const keep = all.filter(id => !shouldRemove(id))

  console.log(`Index: ${VITE_ALGOLIA_INDEX_NAME}`)
  console.log(`  total records:  ${all.length}`)
  console.log(`  keep (sync):    ${keep.length}`)
  console.log(`  remove (stale): ${stale.length}`)
  if (stale.length) {
    console.log('  stale objectIDs:')
    stale.forEach(id => console.log(`    - ${id}`))
  }

  if (!stale.length) {
    console.log('\n✅  Nothing to clean.')
    return
  }

  if (!DELETE) {
    console.log('\nDry run — nothing deleted. Re-run with --delete to remove the records above.')
    return
  }

  await algolia.deleteObjects({
    indexName: VITE_ALGOLIA_INDEX_NAME,
    objectIDs: stale,
  })
  console.log(`\n🗑️   Deleted ${stale.length} stale record(s).`)
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
