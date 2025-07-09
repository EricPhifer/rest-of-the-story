<script setup>
  defineProps({
    block: {
      type: Object,
      required: true
    }
  })
</script>

<template>
  <section
    role="region"
    aria-labelledby="video-section-heading"
    class="video my-12 px-4 sm:px-6 lg:px-12"
  >
    <h2
      id="video-section-heading"
      class="text-2xl font-semibold mb-4 border-b-4 border-[var(--color-accent)] pb-2"
    >
      {{ block.title }}
    </h2>

    <mux-player
      class="w-full aspect-video"
      :playback-id="block.video.asset.playbackId"
      metadata-viewer-user-id="guest"
      controls
      :aria-label="`Video: ${block.title}`"
    >
      <!-- Fallback link if JS or player fails -->
      <a
        :href="`https://stream.mux.com/${block.video.asset.playbackId}.m3u8`"
        class="sr-only"
      >
        Watch “{{ block.title }}” (MP4)
      </a>
    </mux-player>
  </section>
</template>
