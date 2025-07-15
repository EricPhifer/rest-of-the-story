// src/components/page-components/__tests__/ContactCardSection.spec.ts
/// <reference types="vitest" />
import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import ContactCardSection from '@/components/page-components/ContactCardSection.vue'

describe('ContactCardSection.vue', () => {
  const block = {
    phone: { label: 'Call Us', value: '123-456-7890', icon: 'fa-phone' },
    email: { label: 'Email Us', value: 'test@example.com', icon: 'fa-envelope' },
    socialMedia: [
      { label: 'Twitter', url: 'https://twitter.com', icon: 'fa-twitter' },
      { label: 'Facebook', url: 'https://facebook.com', icon: 'fa-facebook' }
    ]
  }

  it('renders phone card with icon, label, and tel link', () => {
    render(ContactCardSection, { props: { block } })

    // Icon element
    const phoneIcon = document.querySelector('i.fa-phone')
    expect(phoneIcon).toBeInTheDocument()

    // Label text
    expect(screen.getByText('Call Us')).toBeInTheDocument()
    // Link element
    const phoneLink = screen.getByRole('link', { name: '123-456-7890' })
    expect(phoneLink).toHaveAttribute('href', 'tel:123-456-7890')
  })

  it('renders email card with icon, label, and mailto link', () => {
    render(ContactCardSection, { props: { block } })

    const emailIcon = document.querySelector('i.fa-envelope')
    expect(emailIcon).toBeInTheDocument()

    expect(screen.getByText('Email Us')).toBeInTheDocument()
    const emailLink = screen.getByRole('link', { name: 'test@example.com' })
    expect(emailLink).toHaveAttribute('href', 'mailto:test@example.com')
  })

  it('renders social media card with links and icons', () => {
    render(ContactCardSection, { props: { block } })

    // Twitter
    const twitterLink = screen.getByRole('link', { name: 'Twitter' })
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com')
    expect(twitterLink).toHaveAttribute('target', '_blank')
    expect(twitterLink).toHaveAttribute('rel', 'noopener')
    expect(document.querySelector('i.fa-twitter')).toBeInTheDocument()

    // Facebook
    const facebookLink = screen.getByRole('link', { name: 'Facebook' })
    expect(facebookLink).toHaveAttribute('href', 'https://facebook.com')
    expect(document.querySelector('i.fa-facebook')).toBeInTheDocument()
  })

  it('renders nothing when block is empty', () => {
    render(ContactCardSection, { props: { block: {} } })

    // No links or labels
    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.queryByText('Call Us')).toBeNull()
    expect(screen.queryByText('Email Us')).toBeNull()
  })
})
