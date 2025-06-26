// src/views/__tests__/SiteMap.spec.ts
/// <reference types="vitest" />
import { render, screen, waitFor } from '@testing-library/vue'
import SiteMap from '@/components/SiteMap.vue'
import { client } from '@/sanity'
import { vi, describe, it, beforeEach, expect } from 'vitest'

// Mock the Sanity client
vi.mock('@/sanity', () => ({
  client: { fetch: vi.fn() }
}))

// Stub the RouterLink component
const RouterLinkStub = {
  props: ['to'],
  template: '<a :href="to"><slot /></a>'
}

describe('SiteMap.vue', () => {
  const mockFetch = (client.fetch as unknown) as ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockFetch.mockReset()
  })

  it('renders title and both internal and external links', async () => {
    // Arrange: mock fetch response
    mockFetch.mockResolvedValue({
      title: 'My Site Map',
      linkGroups: [
        {
          categoryTitle: 'Group 1',
          links: [
            { internalLink: { slug: { current: 'home' }, title: 'Home' }, label: '' },
            { externalUrl: 'https://example.com', label: 'Example' }
          ]
        }
      ]
    })

    // Act: render component
    render(SiteMap, {
      global: {
        stubs: { RouterLink: RouterLinkStub }
      }
    })

    // Assert: wait for title
    await waitFor(() => {
      expect(screen.getByText('My Site Map')).toBeInTheDocument()
    })

    // Category title
    expect(screen.getByText('Group 1')).toBeInTheDocument()

    // Internal link
    const homeLink = screen.getByRole('link', { name: 'Home' })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/home')

    // External link
    const externalLink = screen.getByRole('link', { name: 'Example' })
    expect(externalLink).toBeInTheDocument()
    expect(externalLink).toHaveAttribute('href', 'https://example.com')
    expect(externalLink).toHaveAttribute('target', '_blank')
    expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders only the title when no groups returned', async () => {
    mockFetch.mockResolvedValue({ title: 'Empty Sitemap', linkGroups: [] })

    render(SiteMap, {
      global: {
        stubs: { RouterLink: RouterLinkStub }
      }
    })

    await waitFor(() => {
      expect(screen.getByText('Empty Sitemap')).toBeInTheDocument()
    })

    // Should not render any category tiles
    expect(screen.queryByText('Group 1')).toBeNull()
  })
})
