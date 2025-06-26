// src/test/store/store.spec.ts
/// <reference types="vitest" />
import { createApp } from 'vue'
import { describe, it, expect } from 'vitest'
import { store } from '@/store'

describe('Pinia store setup', () => {
  it('exports a Pinia instance with an install method', () => {
    expect(store).toBeDefined()
    expect(typeof store.install).toBe('function')
  })

  it('can be installed into a Vue app', () => {
    const app = createApp({})
    app.use(store)

    // After installing, the Pinia instance should be provided on the app context,
    // including symbol-keyed provides.
    const provided = app._context.provides
    const allValues = Reflect.ownKeys(provided).map(
      (key) => (provided as any)[key as any]
    )
    expect(allValues).toContain(store)
  })
})
