// src/queries/__tests__/siteSettings.spec.ts
import siteSettingsQuery from '@/queries/siteSettings'
import { describe, it, expect } from 'vitest'

describe('siteSettingsQuery', () => {
  it('should be a GROQ string', () => {
    expect(typeof siteSettingsQuery).toBe('string')
  })

  const fields = [
    'whiteColor{hex}',
    'offWhiteColor{hex}',
    'blackColor{hex}',
    'offBlackColor{hex}',
    'primaryLightColor{hex}',
    'primaryDarkColor{hex}',
    'secondaryLightColor{hex}',
    'secondaryDarkColor{hex}',
    'alertLightColor{hex}',
    'alertDarkColor{hex}',
    'accentLightColor{hex}',
    'accentDarkColor{hex}'
  ]

  fields.forEach(field => {
    it(`includes "${field}"`, () => {
      expect(siteSettingsQuery).toContain(field)
    })
  })
})
