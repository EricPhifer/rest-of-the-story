import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'xbjigamf',
  dataset: 'production',
  apiVersion: '2023-06-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder
    .image(source)   // automatically reads hotspot & crop
    .width(600)      // choose your desired dimensions
    .height(400)
    .auto('format')  // best format (jpeg/webp/avif)
    .url()
}
