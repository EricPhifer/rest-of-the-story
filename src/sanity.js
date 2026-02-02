import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'xbjigamf',
  dataset: 'production',
  apiVersion: '2023-06-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source, options = {}) {
  let image = builder
    .image(source)   // automatically reads hotspot & crop
    .auto('format')  // best format (jpeg/webp/avif)

  // Only set dimensions if explicitly provided
  if (options.width) image = image.width(options.width)
  if (options.height) image = image.height(options.height)

  // Default to 'max' fit to preserve aspect ratio, allow override
  image = image.fit(options.fit ?? 'max')

  // Optional max dimension (useful for constraining large images)
  if (options.maxWidth) image = image.maxWidth(options.maxWidth)
  if (options.maxHeight) image = image.maxHeight(options.maxHeight)

  return image.url()
}
