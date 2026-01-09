import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'the-rest-of-the-story',
  api: {
    projectId: 'xbjigamf',
    dataset: 'production'
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
  deployment: {
    appId: 'v4quqqqd7zus7kqi18rys1xl',
  }
})
