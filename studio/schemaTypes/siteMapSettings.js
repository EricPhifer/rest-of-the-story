// schemas/sitemapSection.js
export default {
  name: 'sitemapSection',
  title: 'Sitemap Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Sitemap Title',
      type: 'string',
      description: 'Optional title for the sitemap page (not required).'
    },
    {
      name: 'linkGroups',
      title: 'Link Groups',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'categoryTitle',
              title: 'Category Title',
              type: 'string'
            },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Link Label',
                      type: 'string'
                    },
                    {
                      name: 'internalLink',
                      title: 'Internal Link',
                      type: 'reference',
                      to: [{ type: 'page' }],
                      description: 'Choose a page from your site.'
                    },
                    {
                      name: 'externalUrl',
                      title: 'External URL',
                      type: 'url',
                      description: 'Use only if this is an external link.'
                    }
                  ],
                  preview: {
                    select: {
                      title: 'label'
                    }
                  }
                }
              ]
            }
          ],
          preview: {
            select: {
              title: 'categoryTitle'
            }
          }
        }
      ]
    }
  ]
}
