<script setup>
defineProps({ block: Object })
</script>

<template>
  <section class="my-8">
    <h2 class="text-2xl font-semibold mb-4">{{ block.title }}</h2>
    <mux-player
      :playback-id="block.video.asset.playbackId"
      metadata-viewer-user-id="guest"
      style="width: 100%; aspect-ratio: 16/9"
    />
  </section>
</template>
