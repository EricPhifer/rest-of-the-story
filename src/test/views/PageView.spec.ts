import { render, screen, waitFor } from '@testing-library/vue'
import PageView from '@/views/PageView.vue'
import { client } from '@/sanity'
import { vi, describe, beforeEach, it, expect, type Mock } from 'vitest'

// 1) Mock client.fetch
vi.mock('@/sanity', () => ({
  client: { fetch: vi.fn() }
}))

// 2) Mock the page query module so import doesn’t break
vi.mock('@/queries/pages', () => ({
  __esModule: true,
  default: 'pageQuery'
}))

// 3) Mock vue-router’s useRoute
vi.mock('vue-router', () => ({
  useRoute: () => ({ params: {} })
}))

// 4) Stub all the dynamic sub-components
const stubs = {
  NotFound:           { template: '<div>NotFound</div>' },
  HeroSection:        { template: '<div>HeroSection</div>' },
  TextSection:        { template: '<div>TextSection</div>' },
  ImageSection:       { template: '<div>ImageSection</div>' },
  VideoSection:       { template: '<div>VideoSection</div>' },
  ButtonSection:      { template: '<div>ButtonSection</div>' },
  TextImageSection:   { template: '<div>TextImageSection</div>' },
  ThreeCardSection:   { template: '<div>ThreeCardSection</div>' },
  ContactInfoSection: { template: '<div>ContactInfoSection</div>' },
  ContactCardSection: { template: '<div>ContactCardSection</div>' },
  FormSection:        { template: '<div>FormSection</div>' },
}

describe('PageView.vue', () => {
  const mockFetch = client.fetch as unknown as Mock

  beforeEach(() => {
    mockFetch.mockReset()
    // silence console.error during these tests
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('shows loading then renders page title and hero section', async () => {
    mockFetch.mockResolvedValue({
      title: 'My Test Page',
      content: [{ _key: 'a1', _type: 'heroSection' }]
    })

    render(PageView, { global: { stubs } })

    // initial loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument()

    // wait for fetch to complete
    await waitFor(() => {
      expect(screen.getByText('My Test Page')).toBeInTheDocument()
    })

    // HeroSection stub rendered
    expect(screen.getByText('HeroSection')).toBeInTheDocument()
  })

  it('renders NotFound when fetch returns null', async () => {
    mockFetch.mockResolvedValue(null)

    render(PageView, { global: { stubs } })

    // wait for NotFound to appear
    await waitFor(() => {
      expect(screen.getByText('NotFound')).toBeInTheDocument()
    })
  })

  it('renders NotFound when fetch throws an error', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'))

    render(PageView, { global: { stubs } })

    await waitFor(() => {
      expect(screen.getByText('NotFound')).toBeInTheDocument()
    })
  })
})
