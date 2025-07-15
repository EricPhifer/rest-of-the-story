<script setup>
  import { PortableText } from '@portabletext/vue'
  import { RouterLink } from 'vue-router'

  const props = defineProps({
    block: {
      type: Object,
      required: true
    },
    isHomePage: {
      type: Boolean,
      default: true
    }
  })

  const appVersion = __APP_VERSION__
  const imageUrl = props.block.image?.asset?.url
  const button   = props.block.button

  function isVersion1(version) {
    return version.startsWith('1.')
  }

  const linkComponent = isVersion1(appVersion) ? 'a' : RouterLink

 function getLinkPath(url) {
    if (!url) return '/'

    // From GROQ, `url` is a slug object: { current: 'about' }
    if (typeof url === 'object' && url.current) {
      url = url.current
    }

    if (typeof url !== 'string') return '/'

    return isVersion1(appVersion)
      ? `#${url}`              // v1 scroll behavior
      : `/${url}`              // v2 route to internal page
  }
</script>

<template>
  <section
    v-if="imageUrl"
    :style="`background-image: url(${imageUrl})`"
    class="hero relative h-[60svh] md:h-[80svh] bg-center bg-cover bg-no-repeat overflow-hidden"
    role="region"
    aria-labelledby="hero-heading"
  >
    <!-- decorative overlay -->
    <div 
      class="absolute inset-0 bg-[var(--color-secondary-dark)]/40" 
      aria-hidden="true"
    ></div>

    <!-- content: full-size flex centering -->
    <div class="relative z-10 flex items-center justify-center h-full w-full px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center text-center">
        <!-- heading -->
        <PortableText
          v-if="block.heading"
          :value="block.heading"
          id="hero-heading"
        ></PortableText>

        <!-- body copy -->
        <div class="subtitle max-w-2xl mb-6 text-white">
          <PortableText :value="block.body" />
        </div>

        <!-- call-to-action -->
         <component
          v-if="button?.text && button?.url"
          :is="linkComponent"
          :href="linkComponent === 'a' ? getLinkPath(button.url) : undefined"
          :to="linkComponent !== 'a' ? getLinkPath(button.url) : undefined"
          class="cta inline-block"
        >
          {{ button.text }}
        </component>

      </div>
    </div>
  </section>
</template>
