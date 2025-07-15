// src/queries/__tests__/faqPageQuery.spec.ts
import faqPageQuery from '@/queries/faqPage'
import { describe, expect, it } from 'vitest'

describe('faqPageQuery', () => {
  it('should be a GROQ string', () => {
    expect(typeof faqPageQuery).toBe('string')
  })

  const fragments = [
    '*[_type == "faqPage"][0]',
    'heroImage',
    'asset->',
    'url',
    'faqs[]',
    'question',
    'answer'
  ]

  fragments.forEach(fragment => {
    it(`includes "${fragment}"`, () => {
      expect(faqPageQuery).toContain(fragment)
    })
  })
})
