// ./schemas/siteSettings.js
export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    {
      name: 'white',
      title: 'White Color',
      type: 'color',
    },
    {
      name: 'offWhite',
      title: 'Off-White Color',
      type: 'color',
    },
    {
      name: 'black',
      title: 'Black Color',
      type: 'color',
    },
    {
      name: 'offBlack',
      title: 'Off-Black Color',
      type: 'color',
    },
    {
      name: 'primaryLightColor',
      title: 'Primary Light Color',
      type: 'color',
    },
    {
      name: 'primaryDarkColor',
      title: 'Primary Dark Color',
      type: 'color',
    },
    {
      name: 'secondaryLightColor',
      title: 'Secondary Light Color',
      type: 'color',
    },
    {
      name: 'secondaryDarkColor',
      title: 'Secondary Dark Color',
      type: 'color',
    },
    {
      name: 'accentLightColor',
      title: 'Accent Light Color',
      type: 'color',
    },
    {
      name: 'accentDarkColor',
      title: 'Accent Dark Color',
      type: 'color',
    },
    {
      name: 'alertLightColor',
      title: 'Alert Light Color',
      type: 'color',
    },
    {
      name: 'alertDarkColor',
      title: 'Alert Dark Color',
      type: 'color',
    },

    // Favicon
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Used in browser tab or PWA. Should be square (e.g., 512x512).',
      options: {
        hotspot: true
      }
    },

    // Typography Settings
    {
      name: 'primaryFont',
      title: 'Primary Typography',
      type: 'string',
      description: 'Font family used for primary content (e.g., "Inter", "Roboto", "Georgia").'
    },
    {
      name: 'secondaryFont',
      title: 'Secondary Typography',
      type: 'string',
      description: 'Font used for accents or headings.'
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
