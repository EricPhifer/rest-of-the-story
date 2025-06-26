import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import BlogPost from '@/views/BlogPost.vue'

describe('BlogPost.vue', () => {
  it('renders the static blog page text', () => {
    render(BlogPost)
    expect(screen.getByText('Blog Page')).toBeInTheDocument()
  })
})
