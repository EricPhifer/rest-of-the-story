/// <reference types="vitest" />
import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import VideoSection from '@/components/page-components/VideoSection.vue'

// Stub mux-player custom element
const MuxPlayerStub = {
  props: ['playbackId', 'metadataViewerUserId'],
  template: '<div data-testid="mux-player" :data-playback-id="playbackId" :data-metadata-viewer-user-id="metadataViewerUserId"></div>'
}

describe('VideoSection.vue', () => {
  const block = {
    title: 'Test Video',
    video: {
      asset: {
        playbackId: 'abc123'
      }
    }
  }

  it('renders title and mux-player with correct props', () => {
    render(VideoSection, {
      props: { block },
      global: {
        stubs: {
          'mux-player': MuxPlayerStub
        }
      }
    })

    // Check heading
    expect(screen.getByRole('heading', { level: 2, name: 'Test Video' })).toBeInTheDocument()

    // Check mux-player stub
    const player = screen.getByTestId('mux-player')
    expect(player).toBeInTheDocument()
    expect(player).toHaveAttribute('data-playback-id', 'abc123')
    expect(player).toHaveAttribute('data-metadata-viewer-user-id', 'guest')
  })
})
