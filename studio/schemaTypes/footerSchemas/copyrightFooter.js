export default {
  name: 'copyrightFooter',
  type: 'object',
  title: 'Copyright Section',
  fields: [
    {
      name: 'legalPages',
      type: 'array',
      title: 'Legal Pages',
     of: [
       {
         type: 'reference',
         to: [{ type: 'legalPage' }]
       }
     ],
    },
    {
      name: 'companyName',
      type: 'string',
      title: 'Company Name'
    },
    {
      name: 'contributors',
      type: 'array',
      title: 'Marketing & Development Credits',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Contributor Name' },
            {
              name: 'url',
              type: 'url',
              title: 'Website URL'
            }
          ],
          preview: {
            select: { title: 'name' }
          }
        }
      ],
      validation: Rule => Rule.max(2).warning('Only two contributors should be listed.')
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Copyright Section'
      };
    }
  }
};
