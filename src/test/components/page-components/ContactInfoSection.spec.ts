// src/components/__tests__/ContactInfoSection.spec.ts
/// <reference types="vitest" />
import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import ContactInfoSection from '@/components/page-components/ContactInfoSection.vue'

describe('ContactInfoSection.vue', () => {
  const block = {
    storeHours: [
      { days: 'Mon-Fri', open: '9:00 AM', close: '5:00 PM' },
      { days: 'Sat-Sun', open: '10:00 AM', close: '4:00 PM' }
    ],
    address: '123 Main St',
    addressIcon: 'home-icon',
    phone: '555-1234',
    phoneIcon: 'phone-icon',
    email: 'info@example.com',
    emailIcon: 'email-icon'
  }

  it('renders store hours correctly', () => {
    render(ContactInfoSection, { props: { block } })
    // Check each hours entry
    expect(screen.getByText(/Mon-Fri:/)).toBeInTheDocument()
    expect(screen.getByText(/9:00 AM – 5:00 PM/)).toBeInTheDocument()
    expect(screen.getByText(/Sat-Sun:/)).toBeInTheDocument()
    expect(screen.getByText(/10:00 AM – 4:00 PM/)).toBeInTheDocument()
  })

  it('renders address with correct icon and text', () => {
    const { container } = render(ContactInfoSection, { props: { block } })
    const icon = container.querySelector('i.icon-home-icon')
    expect(icon).toBeInTheDocument()
    expect(screen.getByText('123 Main St')).toBeInTheDocument()
  })

  it('renders phone with icon and tel link', () => {
    const { container } = render(ContactInfoSection, { props: { block } })
    const phoneIcon = container.querySelector('i.icon-phone-icon')
    expect(phoneIcon).toBeInTheDocument()
    const phoneLink = screen.getByRole('link', { name: '555-1234' })
    expect(phoneLink).toHaveAttribute('href', 'tel:555-1234')
  })

  it('renders email with icon and mailto link', () => {
    const { container } = render(ContactInfoSection, { props: { block } })
    const emailIcon = container.querySelector('i.icon-email-icon')
    expect(emailIcon).toBeInTheDocument()
    const emailLink = screen.getByRole('link', { name: 'info@example.com' })
    expect(emailLink).toHaveAttribute('href', 'mailto:info@example.com')
  })
})
