// src/components/footer/copyright/__tests__/Copyright.spec.ts
/// <reference types="vitest" />
import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import CopyrightSection from '@/components/footer/copyright/Copyright.vue'

// Stub RouterLink component
const RouterLinkStub = {
  props: ['to'],
  template: '<a :href="to"><slot /></a>'
}

describe('Copyright.vue', () => {
  const currentYear = new Date().getFullYear()
  const legalPages = [
    { _id: '1', title: 'Privacy', slug: { current: 'privacy' } },
    { _id: '2', title: 'Terms', slug: { current: 'terms' } }
  ]
  const credits = [
    { name: 'Dev', url: 'https://dev.com' },
    { name: 'Design', url: 'https://design.com' }
  ]

  it('renders legal pages with separators and correct links', () => {
    render(CopyrightSection, {
      global: {
        components: {
          RouterLink: RouterLinkStub
        }
      },
      props: { companyName: 'MyCo', legalPages, credits }
    })

    // Check legal page links
    const privacyLink = screen.getByText('Privacy')
    expect(privacyLink).toBeInTheDocument()
    expect(privacyLink).toHaveAttribute('href', '/privacy')

    const termsLink = screen.getByText('Terms')
    expect(termsLink).toBeInTheDocument()
    expect(termsLink).toHaveAttribute('href', '/terms')

    // Separator between links
    const separators = screen.getAllByText('|')
    expect(separators).toHaveLength(1)
  })

  it('renders copyright line with current year and company name', () => {
    const { container } = render(CopyrightSection, {
      global: {
        components: {
          RouterLink: RouterLinkStub
        }
      },
      props: { companyName: 'MyCo', legalPages, credits }
    })

    expect(container.textContent).toContain(
      `© ${currentYear} MyCo. All Rights Reserved.`
    )
  })

  it('renders credits with ampersand between two names and correct links', () => {
    render(CopyrightSection, {
      global: {
        components: {
          RouterLink: RouterLinkStub
        }
      },
      props: { companyName: 'MyCo', legalPages, credits }
    })

    // Check credit links and attributes
    const devLink = screen.getByText('Dev')
    expect(devLink).toBeInTheDocument()
    expect(devLink).toHaveAttribute('href', 'https://dev.com')
    expect(devLink).toHaveAttribute('target', '_blank')
    expect(devLink).toHaveAttribute('rel', 'noopener')

    const designLink = screen.getByText('Design')
    expect(designLink).toBeInTheDocument()
    expect(designLink).toHaveAttribute('href', 'https://design.com')

    // Check ampersand text between links
    const container = devLink.closest('div')
    expect(container.textContent).toContain('Dev & Design')
  })
})
