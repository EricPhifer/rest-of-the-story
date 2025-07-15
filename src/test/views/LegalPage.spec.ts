/// <reference types="vitest" />

// 1) reset the module cache (important if any other test already loaded '@/sanity')
import { vi } from 'vitest'
vi.resetModules()

// 2) mock out the exact modules your component imports
vi.mock('@/sanity', () => ({
  __esModule: true,
  client: { fetch: vi.fn() }
}))
vi.mock('vue-router', () => ({
  __esModule: true,
  useRoute: () => ({ params: { slug: 'privacy' } })
}))

// 3) now import everything else
import { render, screen, waitFor } from '@testing-library/vue'
import { describe, beforeEach, it, expect, type Mock } from 'vitest'
import LegalPage from '@/views/LegalPage.vue'
import { client } from '@/sanity'

describe('LegalPage.vue', () => {
  // cast to Vitest Mock so we get mockReset, mockResolvedValue, etc.
  const mockFetch = (client.fetch as unknown) as Mock
  let errorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    mockFetch.mockReset()
     // silence console.error during these tests
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('renders title and body after successful fetch', async () => {
    // arrange fetch resolution
    mockFetch.mockResolvedValue({
      title: 'Privacy Policy',
      body: [
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Here is the privacy policy body.' }]
        }
      ]
    })

    // act: stub out PortableText so it doesn’t throw
    render(LegalPage, {
      global: {
        stubs: { PortableText: true }
      }
    })

    // assert: loading state first
    expect(screen.getByText('Loading...')).toBeInTheDocument()

    // wait for fetch to complete and heading to show
    const heading = await screen.findByRole('heading', { name: 'Privacy Policy' })
    expect(heading).toBeInTheDocument()
  })

  it('displays an error message when fetch throws', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'))

    render(LegalPage, {
      global: {
        stubs: { PortableText: true }
      }
    })

    await waitFor(() => {
      expect(screen.getByText('Page not found.')).toBeInTheDocument()
    })
  })
})
