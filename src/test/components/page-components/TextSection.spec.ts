/// <reference types="vitest" />
import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import TextSection from '@/components/page-components/TextSection.vue'

// Stub PortableText component
const PortableTextStub = {
  props: ['value'],
  template: '<div data-testid="portable-text">[PortableText]</div>'
}

describe('TextSection.vue', () => {
  it('renders heading and body when provided', () => {
    const block = { heading: 'My Heading', body: [{ _type: 'block', children: [{ _type: 'span', text: 'Body text' }] }] }
    render(TextSection, {
      props: { block },
      global: { stubs: { PortableText: PortableTextStub } }
    })

    // Heading
    expect(screen.getByRole('heading', { level: 2, name: 'My Heading' })).toBeInTheDocument()
    // PortableText stub
    expect(screen.getByTestId('portable-text')).toBeInTheDocument()
  })

  it('renders only body when no heading', () => {
    const block = { body: [{ _type: 'block', children: [{ _type: 'span', text: 'Only body' }] }] }
    render(TextSection, {
      props: { block },
      global: { stubs: { PortableText: PortableTextStub } }
    })

    expect(screen.queryByRole('heading')).toBeNull()
    expect(screen.getByTestId('portable-text')).toBeInTheDocument()
  })
})
