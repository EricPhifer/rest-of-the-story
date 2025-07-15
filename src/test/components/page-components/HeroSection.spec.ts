// src/test/components/page-components/HeroSection.spec.ts
/// <reference types="vitest" />
import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import HeroSection from '@/components/page-components/HeroSection.vue'

describe('HeroSection.vue', () => {
  const fullBlock = {
    heading: 'Welcome!',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Hello World' }]
      }
    ],
    image: { asset: { url: 'hero.jpg' } },
    button: { text: 'Click Me', url: '/click' }
  }

  const minimalBlock = {
    heading: 'Hello',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'No extras' }]
      }
    ]
    // no image, no button
  }

  it('renders heading, body, button and image when provided', () => {
    render(HeroSection, { props: { block: fullBlock } })

    // Heading
    expect(
      screen.getByRole('heading', { name: 'Welcome!' })
    ).toBeInTheDocument()

    // Body text
    expect(screen.getByText('Hello World')).toBeInTheDocument()

    // Button
    const btn = screen.getByRole('link', { name: 'Click Me' })
    expect(btn).toHaveAttribute('href', '/click')

    // Image
    const img = screen.getByAltText('Welcome!')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'hero.jpg')
  })

  it('does not render button or image when not provided', () => {
    render(HeroSection, { props: { block: minimalBlock } })

    // Heading & body
    expect(screen.getByRole('heading', { name: 'Hello' })).toBeInTheDocument()
    expect(screen.getByText('No extras')).toBeInTheDocument()

    // No button or image
    expect(screen.queryByRole('link', { name: 'Click Me' })).toBeNull()
    expect(screen.queryByAltText(/hello/i)).toBeNull()
  })
})
