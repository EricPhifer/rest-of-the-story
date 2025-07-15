/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ButtonSection from '@/components/page-components/ButtonSection.vue'

// Mock vue-router useRouter
const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush })
}))

describe('ButtonSection.vue', () => {
  beforeEach(() => {
    mockPush.mockReset()
  })

  it('renders internal link button and calls router.push on click', async () => {
    const block = {
      buttons: [
        {
          internalLink: { slug: { current: 'test-slug' } },
          text: 'Go to Page'
        }
      ]
    }

    render(ButtonSection, { props: { block } })

    const button = screen.getByRole('button', { name: 'Go to Page' })
    expect(button).toBeInTheDocument()

    await fireEvent.click(button)

    expect(mockPush).toHaveBeenCalledTimes(1)
    expect(mockPush).toHaveBeenCalledWith({ name: 'Page', params: { slug: 'test-slug' } })
  })

  it('renders external link anchor for url buttons', () => {
    const block = {
      buttons: [
        {
          url: 'https://example.com',
          text: 'Visit Example'
        }
      ]
    }

    render(ButtonSection, { props: { block } })

    const link = screen.getByRole('link', { name: 'Visit Example' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener')
  })
})
