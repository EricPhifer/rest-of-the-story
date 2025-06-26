// src/queries/__tests__/sitemapSection.spec.ts
import { describe, expect, it } from 'vitest'
import sitemapSectionQuery from '@/queries/sitemap'

describe('sitemapSectionQuery', () => {
  it('should be a GROQ string', () => {
    expect(typeof sitemapSectionQuery).toBe('string')
  })

  const fragments = [
    '*[_type == "sitemapSection"][0]',
    'title',
    'linkGroups[]',
    'categoryTitle',
    'links[]',
    'label',
    'internalLink->',
    'slug',
    'externalUrl'
  ]

  fragments.forEach(fragment => {
    it(`includes "${fragment}"`, () => {
      expect(sitemapSectionQuery).toContain(fragment)
    })
  })
})
