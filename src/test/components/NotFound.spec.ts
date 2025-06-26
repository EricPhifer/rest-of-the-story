// src/components/__tests__/NotFound.spec.ts
/// <reference types="vitest" />
import { render, screen } from '@testing-library/vue'
import NotFound from '@/components/NotFound.vue'
import { describe, it, expect } from 'vitest'

// Stub for RouterLink since NotFound.vue uses <router-link>
const RouterLinkStub = {
  props: ['to'],
  template: '<a :href="to"><slot /></a>'
}

describe('NotFound.vue', () => {
  it('renders the 404 heading, message, and Go home link', () => {
    render(NotFound, {
      global: {
        components: {
          RouterLink: RouterLinkStub
        }
      }
    })

    // Check the 404 heading
    const heading = screen.getByRole('heading', { level: 2, name: '404' })
    expect(heading).toBeInTheDocument()

    // Check the descriptive paragraph
    expect(
      screen.getByText("Sorry, the page you’re looking for doesn’t exist.")
    ).toBeInTheDocument()

    // Check the "Go home" link
    const link = screen.getByRole('link', { name: 'Go home' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })
})
