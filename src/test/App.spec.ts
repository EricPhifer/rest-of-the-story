// src/__tests__/App.spec.ts
/// <reference types="vitest" />
import { render, waitFor } from '@testing-library/vue'
import App from '@/App.vue'
import siteSettingsQuery from '@/queries/siteSettings'
import { client } from '@/sanity'
import { vi, describe, it, beforeEach, expect } from 'vitest'

// 1) Mock the Sanity client before anything else
vi.mock('@/sanity', () => ({
  client: {
    fetch: vi.fn()
  }
}))

// 2) Stub out child components and router-view
const stubs = {
  'router-view': true,
  Map: { template: '<div>MapStub</div>' },
  Footer: { template: '<div>FooterStub</div>' },
  Copyright: { template: '<div>CopyrightStub</div>' }
}

describe('App.vue', () => {
  // cast fetch to a Vitest mock
  const mockFetch = (client.fetch as unknown) as ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockFetch.mockReset()
    document.documentElement.style.removeProperty('--color-primary')
  })

  it('calls client.fetch with siteSettingsQuery on mount', async () => {
    mockFetch.mockResolvedValue({ primaryColor: { hex: '#123456' } })

    render(App, { global: { stubs } })

    await waitFor(() => {
      // ensure we called the mock with exactly our imported query
      expect(mockFetch).toHaveBeenCalledWith(siteSettingsQuery)
    })
  })

  it('sets --color-primary CSS variable when primaryColor.hex is present', async () => {
    mockFetch.mockResolvedValue({ primaryColor: { hex: '#abcdef' } })

    render(App, { global: { stubs } })

    await waitFor(() => {
      expect(
        document.documentElement.style.getPropertyValue('--color-primary')
      ).toBe('#abcdef')
    })
  })
})
