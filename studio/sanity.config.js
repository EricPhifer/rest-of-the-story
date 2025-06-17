import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { muxInput } from 'sanity-plugin-mux-input'

export default defineConfig({
  name: 'the-rest-of-the-story',
  title: 'The Rest of the Story',

  projectId: 'xbjigamf',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), muxInput()],

  schema: {
    types: schemaTypes,
  },
})
