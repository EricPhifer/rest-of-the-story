/// <reference types="vitest" />
import { render, screen } from '@testing-library/vue'
import { vi, describe, it, expect } from 'vitest'
import TextImageSection from '@/components/page-components/TextImageSection.vue'

// 1️⃣ Mock the module _inlined_, no top-level stub var
vi.mock('@portabletext/vue', () => ({
  __esModule: true,
  default: {
    props: ['value'],
    template: '<div data-testid="portable-text">[PortableText]</div>'
  }
}))

describe('TextImageSection.vue', () => {
  const fullBlock = {
    heading: 'Section Heading',
    body: [{
      _type: 'block',
      children: [{ _type: 'span', text: 'Body content' }]
    }],
    image: { asset: { url: 'section.jpg' } },
    imagePosition: 'right'
  }

  it('renders image on the right by default and displays heading/body', () => {
    render(TextImageSection, { props: { block: fullBlock } })

    // layout
    const wrapper = document.querySelector('div.flex')!
    expect(wrapper).toHaveClass('md:flex-row-reverse')

    // image
    const img = document.querySelector('img')!
    expect(img).toHaveAttribute('src', 'section.jpg')
    expect(img).toHaveAttribute('alt', 'Section image')

    // heading
    expect(screen.getByRole('heading', { level: 2, name: 'Section Heading' })).toBeInTheDocument()

    // our inlined stub
    expect(screen.getByTestId('portable-text')).toBeInTheDocument()
  })

  it('renders image on the left when imagePosition is left', () => {
    render(TextImageSection, { props: { block: { ...fullBlock, imagePosition: 'left' } } })
    const wrapper = document.querySelector('div.flex')!
    expect(wrapper).toHaveClass('md:flex-row')
    expect(wrapper).not.toHaveClass('md:flex-row-reverse')
  })

  it('renders nothing if no image URL provided', () => {
    render(TextImageSection, {
      props: { block: { heading: 'No Image', body: null, image: {}, imagePosition: 'left' } }
    })
    expect(document.querySelector('img')).toBeNull()
    expect(screen.getByRole('heading', { name: 'No Image' })).toBeInTheDocument()
  })
})
