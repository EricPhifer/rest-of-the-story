// src/test/components/page-components/ImageSection.spec.ts
/// <reference types="vitest" />
import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import ImageSection from '@/components/page-components/ImageSection.vue'

describe('ImageSection.vue', () => {
  const fullBlock = {
    heading: 'Sample Heading',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Body content' }]
      }
    ],
    image: { asset: { url: 'background.jpg' } },
    button: { text: 'Click Here', url: '/click' }
  }

  const minimalBlock = {
    heading: 'Only Heading',
    body: [] // no body => no <p> rendered
  }

  it('renders with background image, heading, body and button', () => {
    const { container } = render(ImageSection, {
      props: { block: fullBlock }
    })

    // the section should have the inline background-image style
    const section = container.querySelector('section')!
    expect(section).toHaveStyle('background-image: url("background.jpg")')

    // heading
    expect(
      screen.getByRole('heading', { name: 'Sample Heading' })
    ).toBeInTheDocument()

    // the real PortableText output is just a <p> with our text
    expect(screen.getByText('Body content')).toBeInTheDocument()

    // button link
    const link = screen.getByRole('link', { name: 'Click Here' })
    expect(link).toHaveAttribute('href', '/click')
  })

  it('renders minimal when only heading provided', () => {
    const { container } = render(ImageSection, {
      props: { block: minimalBlock }
    })

    // only heading shows
    expect(
      screen.getByRole('heading', { name: 'Only Heading' })
    ).toBeInTheDocument()

    // no body <p> at all
    expect(container.querySelector('div.prose p')).toBeNull()
  })
})
