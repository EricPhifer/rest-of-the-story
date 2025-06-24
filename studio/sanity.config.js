import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { colorInput } from '@sanity/color-input'
import { muxInput } from 'sanity-plugin-mux-input'

export default defineConfig({
  name: 'the-rest-of-the-story',
  title: 'The Rest of the Story',

  projectId: 'xbjigamf',
  dataset: 'production',

  plugins: [
    structureTool(), 
    visionTool(), 
    muxInput(),
    colorInput()
  ],

  schema: {
    types: schemaTypes,
  },
})
