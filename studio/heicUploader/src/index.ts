// heicUploader/src/index.ts
import type {SanityClient, SanityImageAssetDocument} from '@sanity/client' // ← use the correct exported type
import {definePlugin} from 'sanity'

export const myPlugin = definePlugin(() => ({
  name: 'sanity-plugin-heic-uploader', // keep in sync with package.json

  form: {
    resolveUploader: {
      name: 'heicToJpeg',

      async upload(
        file: File | Blob,
        context: {getClient: (opts: {apiVersion: string}) => SanityClient},
      ): Promise<{url: string; assetDocumentProps: SanityImageAssetDocument}> {
        const filename = (file as File).name || ''
        const isHeic = /\.heic$/i.test(filename)

        let fileToUpload: File | Blob = file

        if (isHeic && typeof window !== 'undefined') {
          const {default: heic2any} = await import('heic2any')
          const converted = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.8,
          })
          const jpegBlob = Array.isArray(converted) ? converted[0] : converted

          Object.defineProperties(jpegBlob, {
            name: {value: filename.replace(/\.heic$/i, '.jpg'), writable: false},
            type: {value: 'image/jpeg', writable: false},
          })

          fileToUpload = jpegBlob
        }

        const client = context.getClient({apiVersion: '2021-06-07'})
        const assetDocument = (await client.assets.upload('image', fileToUpload, {
          filename: (fileToUpload as File).name,
          contentType: (fileToUpload as File).type,
        })) as SanityImageAssetDocument

        return {
          url: assetDocument.url,
          assetDocumentProps: assetDocument,
        }
      },
    },
  },
}))
