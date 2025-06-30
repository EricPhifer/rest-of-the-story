// src/queries/__tests__/pages.spec.ts
import pageQuery from '@/queries/pages'
import { describe, expect, it } from 'vitest'

describe('pageQuery', () => {
  it('should be a GROQ string', () => {
    expect(typeof pageQuery).toBe('string')
  })

  const fragments = [
    '*[_type == "page" && slug.current == $slug][0]',
    'title',
    'slug',
    'content[]',
    '_key',
    '_type',
    '...select(_type == "heroSection"',
    'heading',
    'body',
    'image {',
    'asset->{',
    'url',
    'button {',
    'text',
    '...select(_type == "textSection"',
    '...select(_type == "textImageSection"',
    'imagePosition',
    '...select(_type == "imageSection"',
    '...select(_type == "videoSection"',
    'playbackId',
    '...select(_type == "contactInformationSection"',
    'storeHours',
    'address',
    'phoneIcon',
    '...select(_type == "threeSectionContent"',
    'cards[]',
    'number',
    'iconImage',
    '...select(_type == "buttonSection"',
    'internalLink',
    '...select(_type == "contactCardSection"',
    'socialMedia',
    '...select(_type == "formSection"',
    'formTitle',
    'fields[]',
    '...select(_type == "footerSection"',
    'mapEmbedBlocks',
    '...select(_type == "copyrightSection"',
    'legalPages[]',
    'credits[]'
  ]

  fragments.forEach(fragment => {
    it(`includes "${fragment}"`, () => {
      expect(pageQuery).toContain(fragment)
    })
  })
})
