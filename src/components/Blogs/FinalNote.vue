<!-- PostFinalNote.vue -->
<template>
  <section v-if="note?.enabled" class="final-note mt-10 p-6 rounded-lg bg-lime-50/70 border border-lime-100 text-left">
    <PortableText :value="note.body" />
    <ul class="list-disc pl-5 mt-4 space-y-1">
      <li v-for="(cta, i) in note.ctas" :key="i">
        <a :href="cta.href" target="_blank" rel="noopener" class="underline hover:no-underline">
          {{ cta.label }}
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup>
 import { PortableText } from '@portabletext/vue'
 const props = defineProps({ note: { type: Object, default: null } })
</script>

<style scoped>
  .final-note :deep(p),
  .final-note :deep(h2),
  .final-note :deep(h3),
  .final-note :deep(h4),
  .final-note :deep(ul),
  .final-note :deep(ol) {
    text-align: left !important;
  }

  .final-note :deep(p) {
    margin-bottom: 1em;
  }

  .final-note :deep(p:last-child) {
    margin-bottom: 0;
  }
</style>
