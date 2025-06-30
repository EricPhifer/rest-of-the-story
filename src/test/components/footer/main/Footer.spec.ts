// src/components/__tests__/Footer.spec.ts
/// <reference types="vitest" />
import { render, screen, waitFor } from '@testing-library/vue'
import Footer from '@/components/footer/main/Footer.vue'
import { client } from '@/sanity'
import { vi, describe, it, beforeEach, expect } from 'vitest'
import { createPinia } from 'pinia'

// 1) Mock the Sanity client
vi.mock('@/sanity', () => ({
  client: { fetch: vi.fn() }
}))

// 2) Stub child components and RouterLink
const stubs = {
  RouterLink: {
    props: ['to'],
    template: '<a :href="to"><slot /></a>'
  },
  AlgoliaSearchInput: {
    template: '<div>AlgoliaSearchInputStub</div>'
  }
}

describe('Footer.vue', () => {
  const mockFetch = (client.fetch as unknown) as ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockFetch.mockReset()
  })

  it('renders all footer sections correctly after fetch', async () => {
    // Arrange: mock fetch response
    mockFetch.mockResolvedValue({
      main: {
        logo: { asset: { url: 'logo.png' } },
        navLinks: [ { label: 'About', internalLink: { slug: { current: 'about' } } } ],
        blogSection: {
          heading: 'Blog',
          body: 'Blog description',
          button: { text: 'Read', url: '/blog' }
        },
        newsletterForm: {
          placeholder: 'Enter email',
          buttonText: 'Subscribe',
          formAction: 'https://subscribe.example.com'
        },
        mapContent: [
          { mapUrl: 'https://maps.example.com' }
        ],
        copyrightContent: [
          {
            companyName: 'Test Company',
            legalPages: [
              { label: 'Privacy Policy', url: '/privacy' },
              { label: 'Terms of Service', url: '/terms' }
            ],
            contributors: [
              { name: 'Contributor 1', url: 'https://contributor1.example.com' },
              { name: 'Contributor 2', url: 'https://contributor2.example.com' }
            ]
          }
        ]
      },
      contact: {
        address: '123 Street',
        phone: '555-1234',
        email: 'test@example.com'
      },
      social: [
        { label: 'Twitter', icon: 'twitter', url: 'https://twitter.com' }
      ]
    })

    // Act: render component
    render(Footer, { 
      global: { 
        plugins: [createPinia()],
        stubs 
      } 
    })

    // Wait for onMounted to finish
    await waitFor(() => {
      // Logo
      const img = screen.getByRole('img', { name: /logo/i })
      expect(img).toHaveAttribute('src', 'logo.png')

      // Nav link
      const navLink = screen.getByRole('link', { name: 'About' })
      expect(navLink).toHaveAttribute('href', '/about')

      // AlgoliaSearchInput stub
      expect(screen.getByText('AlgoliaSearchInputStub')).toBeInTheDocument()

      // Blog section
      expect(screen.getByText('Blog')).toBeInTheDocument()
      expect(screen.getByText('Blog description')).toBeInTheDocument()
      const readLink = screen.getByRole('link', { name: 'Read' })
      expect(readLink).toHaveAttribute('href', '/blog')

      // Newsletter form
      const input = screen.getByPlaceholderText('Enter email')
      expect(input).toBeInTheDocument()
      const button = screen.getByRole('button', { name: 'Subscribe' })
      expect(button).toHaveAttribute('type', 'submit')

      // Contact info
      expect(screen.getByText('123 Street')).toBeInTheDocument()
      expect(screen.getByText('555-1234')).toBeInTheDocument()
      expect(screen.getByText('test@example.com')).toBeInTheDocument()

      // Social link
      const socialLink = screen.getByRole('link', { name: 'Twitter' })
      expect(socialLink).toHaveAttribute('href', 'https://twitter.com')
    })
  })
})
