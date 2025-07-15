/// <reference types="vitest" />
import { render, screen, waitFor, fireEvent } from '@testing-library/vue'
import { vi, it, expect, beforeEach, afterEach, describe } from 'vitest'
import FaqPage from '@/views/FaqPage.vue'
import { client } from '@/sanity'

// 1) Mock the Sanity client
vi.mock('@/sanity', () => ({
  client: { fetch: vi.fn() }
}))

// (Optional) If you import the query module in your component,
// you can mock it too so it doesn’t error:
vi.mock('@/queries/faqPageQuery', () => ({
  __esModule: true,
  default: 'faqPageQuery'
}))

describe('FaqPage.vue', () => {
  // Grab the mocked fetch
  const mockFetch = (client.fetch as unknown) as ReturnType<typeof vi.fn>
  let errorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    mockFetch.mockReset()
    // silence console.error during these tests
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    errorSpy.mockRestore()
  })

  it('renders hero image and FAQ items, and toggles answers', async () => {
    // Arrange: have fetch resolve with a heroImage and two FAQs
    mockFetch.mockResolvedValue({
      heroImage: { asset: { url: 'hero.jpg' } },
      faqs: [
        { question: 'Q1?', answer: 'A1!' },
        { question: 'Q2?', answer: 'A2!' }
      ]
    })

    // Act: render, stubbing out <transition> so it doesn’t animate
    render(FaqPage, {
      global: {
        stubs: ['transition']
      }
    })

    // The page always shows the header immediately
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()

    // Wait for the hero image to appear
    await waitFor(() => {
      const img = screen.getByAltText('FAQ Hero')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', 'hero.jpg')
    })

    // Questions should now be listed
    expect(screen.getByText('Q1?')).toBeInTheDocument()
    expect(screen.getByText('Q2?')).toBeInTheDocument()

    // Answers should be hidden initially
    expect(screen.queryByText('A1!')).toBeNull()

    // Click the first question to toggle its answer
    await fireEvent.click(screen.getByText('Q1?'))
    expect(screen.getByText('A1!')).toBeInTheDocument()

    // Click again to hide
    await fireEvent.click(screen.getByText('Q1?'))
    expect(screen.queryByText('A1!')).toBeNull()
  })

  it('renders nothing if fetch rejects', async () => {
    // Arrange: have fetch throw
    mockFetch.mockRejectedValue(new Error('Network error'))

    render(FaqPage, {
      global: {
        stubs: ['transition']
      }
    })

    // Even though there is no explicit error UI in this component,
    // we at least expect no crash and the header still shows:
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()
  })
})
