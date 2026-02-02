import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'the-rest-of-the-story',
  api: {
    projectId: 'xbjigamf',
    dataset: 'production'
  },
  deployment: {
    appId: 'v4quqqqd7zus7kqi18rys1xl',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  }
})
