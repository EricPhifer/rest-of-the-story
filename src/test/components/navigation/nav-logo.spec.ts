// src/components/navigation/__tests__/nav-logo.spec.ts
/// <reference types="vitest" />
import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import NavLogo from '@/components/navigation/Logo.vue'

describe('NavLogo.vue', () => {
  it('renders a link to home with the logo image', () => {
    render(NavLogo, {
      global: {
        // Stub out the router-link so we can inspect its props
        stubs: {
          'router-link': {
            props: ['to'],
            template: `<a :href="to"><slot /></a>`
          }
        }
      }
    })

    // The link should point to "/"
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/')

    // And it should contain an image with alt text including "logo"
    const img = screen.getByRole('img', { name: /logo/i })
    expect(img).toBeInTheDocument()
  })
})
