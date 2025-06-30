// src/components/__tests__/Map.spec.ts
/// <reference types="vitest" />
import { render } from '@testing-library/vue'
import Map from '@/components/footer/main/Map.vue'
import { describe, it, expect } from 'vitest'

describe('Map.vue', () => {
  it('renders an iframe when mapEmbedBlocks is provided', () => {
    const mapEmbedBlocks = 'https://maps.example.com'
    const { container } = render(Map, { props: { mapEmbedBlocks } })
    const iframe = container.querySelector('iframe')
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('src', mapEmbedBlocks)
    expect(iframe).toHaveAttribute('loading', 'lazy')
    expect(iframe).toHaveAttribute('allowfullscreen', '')
  })

  it('does not render the section when mapEmbedBlocks is not provided', () => {
    const { container } = render(Map)
    expect(container.querySelector('section')).toBeNull()
  })
})
