// src/queries/__tests__/footer.spec.ts

import footerMainQuery from '@/queries/footer'
import { describe, expect, it } from 'vitest'

describe('footerMainQuery', () => {
  it('should be a GROQ string', () => {
    expect(typeof footerMainQuery).toBe('string')
  })

  const fragments = [
    // Overall structure
    '"main": *[_type == "mainFooter"][0]',
    'logo { asset->{ url } }',
    'navLinks[]',
    'label',
    'internalLink-> { slug }',
    'blogSection',
    'heading',
    'body',
    'button { text, url }',
    'newsletterForm',
    'placeholder',
    'buttonText',
    'formAction',
    '"contact": *[_type == "contactInformationSection"][0]',
    'address',
    'phone',
    'email',
    '"social": *[_type == "contactCardSection"][0].socialMedia[]',
    'icon',
    'url'
  ]

  fragments.forEach(fragment => {
    it(`includes "${fragment}"`, () => {
      expect(footerMainQuery).toContain(fragment)
    })
  })
})
