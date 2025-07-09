/* studio/plugins/heicUploader.js */
import { definePlugin } from 'sanity'

export default definePlugin({
  name: 'heic-to-jpeg-uploader',
  resolveUploader: {
    name: 'heicToJpeg',
    async upload(file, type) {
      // Only run in the real browser
      let fileToUpload = file
      const isHeic = file.type === 'image/heic' || /\.heic$/i.test(file.name)
      if (isHeic && typeof window !== 'undefined') {
        // Dynamically load the converter so Sanity's build (JSDOM) never sees getContext()
        const { default: heic2any } = await import('heic2any')
        const converted = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.8
        })
        const jpegBlob = Array.isArray(converted) ? converted[0] : converted

        // Tag it so Sanity treats it just like a File
        jpegBlob.name = file.name.replace(/\.heic$/i, '.jpg')
        jpegBlob.type = 'image/jpeg'
        fileToUpload = jpegBlob
      }

      // Hand off to the normal Sanity uploader
      const assetDocument = await type.client.assets.upload(
        'image',
        fileToUpload,
        {
          filename: fileToUpload.name,
          contentType: fileToUpload.type
        }
      )

      return {
        url: assetDocument.url,
        assetDocumentProps: assetDocument
      }
    }
  }
})
