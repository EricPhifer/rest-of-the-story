// src/components/__tests__/Search.spec.ts
/// <reference types="vitest" />
import { render, screen } from '@testing-library/vue'
import Search from '@/components/footer/main/AlgoliaSearchInput.vue'
import { describe, it, expect } from 'vitest'

describe('Search.vue', () => {
  it('renders the "Search" placeholder text', () => {
    render(Search)
    expect(screen.getByText('Search')).toBeInTheDocument()
  })
})
