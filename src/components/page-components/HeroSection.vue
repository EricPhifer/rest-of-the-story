<script setup>
  import { computed } from 'vue'
  import { PortableText } from '@portabletext/vue'
  import { RouterLink } from 'vue-router'
  import { urlFor } from '@/sanity'

  const props = defineProps({
    block: {
      type: Object,
      required: true
    },
    isHomePage: {
      type: Boolean,
      default: true
    },
    // Optional keyword/location H1 (e.g. the homepage passes this). When set, it
    // becomes the single <h1> and the CMS hero heading renders as a tagline
    // subhead beneath it. When empty, the CMS heading is the <h1>.
    seoHeading: {
      type: String,
      default: ''
    }
  })

  // Plain-text lines from the CMS hero heading (PortableText). The heading is
  // plain text with no inline marks, so extracting lines lets us control the
  // heading level ourselves and guarantee exactly one <h1> in the hero — the
  // CMS previously stored the tagline as two separate h1 blocks (double H1).
  const headingLines = computed(() => {
    const blocks = Array.isArray(props.block.heading) ? props.block.heading : []
    return blocks
      .filter(b => b?._type === 'block' && Array.isArray(b.children))
      .map(b => b.children.filter(c => c?._type === 'span').map(c => c.text).join(''))
      .filter(Boolean)
  })

  const appVersion = __APP_VERSION__
  const imageUrl = props.block.image
  const button   = props.block.button

  // Responsive hero image (the LCP element). Serve widths matched to the viewport
  // so phones don't download a desktop-sized image. ~5:3 crop.
  const HERO_WIDTHS = [640, 1024, 1600, 2000]
  const heroSrc = computed(() =>
    imageUrl ? urlFor(imageUrl, { width: 1280, height: 768, fit: 'crop' }) : ''
  )
  const heroSrcset = computed(() =>
    imageUrl
      ? HERO_WIDTHS
          .map(w => `${urlFor(imageUrl, { width: w, height: Math.round(w * 0.6), fit: 'crop' })} ${w}w`)
          .join(', ')
      : ''
  )

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
    class="hero relative h-[60svh] md:h-[80svh] overflow-hidden"
    role="region"
    aria-labelledby="hero-heading"
  >
    <!-- Responsive background image. It's the LCP element, so it loads eagerly
         with high priority (never lazy). Decorative -> empty alt. -->
    <img
      :src="heroSrc"
      :srcset="heroSrcset"
      sizes="100vw"
      alt=""
      fetchpriority="high"
      decoding="async"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <!-- decorative overlay -->
    <div 
      class="absolute inset-0 bg-[var(--color-secondary-dark)]/40" 
      aria-hidden="true"
    ></div>

    <!-- content: full-size flex centering -->
    <div class="relative z-10 flex items-center justify-center h-full w-full px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center text-center">
        <!-- heading: exactly one <h1> per hero -->
        <template v-if="seoHeading">
          <!-- Keyword + location H1 for SEO and screen readers only (visually
               hidden). The visible hero lead is the brand tagline below. -->
          <h1 id="hero-heading" class="sr-only">{{ seoHeading }}</h1>
          <!-- Visible hero heading: the emotional brand tagline -->
          <p v-if="headingLines.length" class="hero-tagline">
            <template v-for="(line, i) in headingLines" :key="i"
              >{{ line }}<br v-if="i < headingLines.length - 1"
            /></template>
          </p>
        </template>
        <!-- No seoHeading: the CMS heading is the single <h1> (line-broken) -->
        <h1 v-else-if="headingLines.length" id="hero-heading" class="hero-title">
          <template v-for="(line, i) in headingLines" :key="i"
            >{{ line }}<br v-if="i < headingLines.length - 1"
          /></template>
        </h1>

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
