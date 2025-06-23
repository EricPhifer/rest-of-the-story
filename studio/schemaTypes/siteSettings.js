// ./schemas/siteSettings.js
export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    {
      name: 'primaryColor',
      title: 'Primary Color',
      type: 'color',
      options: {
        disableAlpha: true
      }
    },
    {
      name: 'secondaryColor',
      title: 'Secondary Color',
      type: 'color',
      options: {
        disableAlpha: true
      }
    },
    {
      name: 'accentColor',
      title: 'Accent Color',
      type: 'color',
      options: {
        disableAlpha: true
      }
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Global Site Settings'
      }
    }
  }
}
