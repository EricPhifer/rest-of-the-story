// src/components/page-components/__tests__/ThreeCardSection.spec.ts
/// <reference types="vitest" />
import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import ThreeCardSection from '@/components/page-components/ThreeCardSection.vue'

// Stub PortableText component
const PortableTextStub = {
  props: ['value'],
  template: '<div data-testid="body">[Body]</div>'
}

describe('ThreeCardSection.vue', () => {
  it('renders an image when iconImage.asset.url is provided', () => {
    const block = {
      cards: [
        {
          iconImage: { asset: { url: 'icon.png' } },
          heading: 'Card 1',
          body: [{ _type: 'block', children: [{ _type: 'span', text: 'Content' }] }],
          button: { text: 'Click Me', url: '/click' }
        }
      ]
    }

    const { container } = render(ThreeCardSection, {
      props: { block },
      global: { stubs: { PortableText: PortableTextStub } }
    })

    // Image
    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'icon.png')

    // Heading
    expect(screen.getByRole('heading', { level: 3, name: 'Card 1' })).toBeInTheDocument()

    // Body stub
    expect(screen.getByTestId('body')).toBeInTheDocument()

    // Button
    const link = screen.getByRole('link', { name: 'Click Me' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/click')
  })

  it('renders number when iconImage is missing but number is provided', () => {
    const block = {
      cards: [
        {
          number: 42,
          heading: 'Card Two',
          body: [{ _type: 'block', children: [{ _type: 'span', text: 'More content' }] }],
          button: null
        }
      ]
    }

    const { container } = render(ThreeCardSection, {
      props: { block },
      global: { stubs: { PortableText: PortableTextStub } }
    })

    // No img
    expect(container.querySelector('img')).toBeNull()

    // Number
    expect(screen.getByText('42')).toBeInTheDocument()

    // Heading
    expect(screen.getByRole('heading', { level: 3, name: 'Card Two' })).toBeInTheDocument()

    // Body stub
    expect(screen.getByTestId('body')).toBeInTheDocument()

    // No button
    expect(screen.queryByRole('link')).toBeNull()
  })

  it('renders multiple cards if provided', () => {
    const block = {
      cards: [
        { number: 1, heading: 'One', body: [], button: null },
        { number: 2, heading: 'Two', body: [], button: null },
        { number: 3, heading: 'Three', body: [], button: null }
      ]
    }

    render(ThreeCardSection, {
      props: { block },
      global: { stubs: { PortableText: PortableTextStub } }
    })

    // Expect three headings
    expect(screen.getByRole('heading', { name: 'One' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Two' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Three' })).toBeInTheDocument()
  })
})
