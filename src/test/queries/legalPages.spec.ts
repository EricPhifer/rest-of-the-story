// src/queries/__tests__/legalPages.spec.ts
import legalPageQuery from '@/queries/legalPages'
import { describe, expect, it } from 'vitest'

describe('legalPageQuery', () => {
  it('should be a GROQ string', () => {
    expect(typeof legalPageQuery).toBe('string')
  })

  const fragments = [
    '*[_type == "legalPage" && slug.current == $slug][0]',
    'title',
    'slug',
    'body'
  ]

  fragments.forEach(fragment => {
    it(`includes "${fragment}"`, () => {
      expect(legalPageQuery).toContain(fragment)
    })
  })
})
