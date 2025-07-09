/* global console */

import {definePlugin} from 'sanity'

// THIS console.log should run once on startup
console.log('HEIC uploader mounted.')

export default definePlugin({
  name: 'heic-to-jpeg-uploader',

  // ← must be nested under `form`
  form: {
    resolveUploader: {
      name: 'heicToJpeg',
      async upload(file, type) {
        console.log('HEIC uploader running for', file.name)

        // only test extension (safer than relying on file.type)
        const isHeic = /\.heic$/i.test(file.name)
        let fileToUpload = file

        if (isHeic && typeof window !== 'undefined') {
          const {default: heic2any} = await import('heic2any')
          const converted = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.8
          })
          const jpegBlob = Array.isArray(converted) ? converted[0] : converted
          jpegBlob.name = file.name.replace(/\.heic$/i, '.jpg')
          jpegBlob.type = 'image/jpeg'
          fileToUpload = jpegBlob
        }

        // use the new API
        const client = type.getClient({apiVersion: '2021-06-07'})
        const assetDocument = await client.assets.upload(
          'image',
          fileToUpload,
          {filename: fileToUpload.name, contentType: fileToUpload.type}
        )

        return {
          url: assetDocument.url,
          assetDocumentProps: assetDocument
        }
      }
    }
  }
})
