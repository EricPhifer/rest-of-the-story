// ./schemas/mainFooter.js
export default {
  name: 'mainFooter',
  title: 'Footer',
  type: 'document',
  fields: [
       {
      name: 'mapContent',
      type: 'array',
      title: 'Map Footer Content',
      of: [
        { type: 'mapEmbed' },
      ]
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            {
              name: 'internalLink',
              type: 'reference',
              to: [{ type: 'page' }]
            }
          ],
          preview: {
            select: { title: 'label' }
          }
        }
      ]
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'contactInfo',
    },
    {
      name: 'socialMediaLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [{ type: 'socialMediaLink' }],
    },
    {
      name: 'blogSection',
      title: 'Blog Section',
      type: 'object',
      fields: [
        { name: 'heading', type: 'string', title: 'Heading' },
        { name: 'body', type: 'text', title: 'Text' },
        {
          name: 'button',
          type: 'object',
          fields: [
            { name: 'text', type: 'string', title: 'Text' },
            {
              name: 'internalLink',
              title: 'Internal Link',
              type: 'reference',
              to: [{ type: 'page' }],
              description: 'Choose a page from your site.'
            },
          ]
        }
      ]
    },
    {
      name: 'newsletterForm',
      title: 'Newsletter Form',
      type: 'object',
      fields: [
        { 
          name: 'placeholder', 
          type: 'string', 
          title: 'Email Placeholder' 
        },
        { 
          name: 'buttonText', 
          type: 'string', 
          title: 'Button Text' 
        },
        { 
          name: 'formAction', 
          type: 'url', 
          title: 'Aweber Form Action URL'
        }
      ]
    },
    {
      name: 'copyrightContent',
      type: 'array',
      title: 'Copyright Footer Content',
      of: [
        { type: 'copyrightFooter' },
      ]
    }
  ],
  preview: {
    prepare() {
      return { title: 'Main Footer Sections' }
    }
  }
}
