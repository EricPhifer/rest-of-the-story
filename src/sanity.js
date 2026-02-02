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
  const width = options.width ?? 600
  const height = options.height ?? 400
  let image = builder
    .image(source)   // automatically reads hotspot & crop
    .width(width)    // choose your desired dimensions
    .height(height)
    .auto('format')  // best format (jpeg/webp/avif)

  if (options.fit) image = image.fit(options.fit)
  return image.url()
}
