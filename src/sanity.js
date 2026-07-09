import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Prefer env vars; fall back to known literals so a missing Netlify env var
// can't take the live site down. Remove the fallbacks once the vars are
// confirmed present in every build environment (local + Netlify dashboard).
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'xbjigamf',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2023-06-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source, options = {}) {
  let image = builder
    .image(source)   // automatically reads hotspot & crop
    .auto('format')  // best format (jpeg/webp/avif)
    .quality(options.quality ?? 75) // ~30% smaller, no visible loss

  // Only set dimensions if explicitly provided
  if (options.width) image = image.width(options.width)
  // Safety cap: never serve a multi-MB original when no size is requested
  else if (!options.maxWidth) image = image.width(1600)
  if (options.height) image = image.height(options.height)

  // Default to 'max' fit to preserve aspect ratio, allow override
  image = image.fit(options.fit ?? 'max')

  // Optional max dimension (useful for constraining large images)
  if (options.maxWidth) image = image.maxWidth(options.maxWidth)
  if (options.maxHeight) image = image.maxHeight(options.maxHeight)

  return image.url()
}
