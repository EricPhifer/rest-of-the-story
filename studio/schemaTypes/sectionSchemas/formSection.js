export default {
  name: 'formSection',
  type: 'object',
  title: 'Form Section',
  fields: [
    {
      name: 'formTitle',
      type: 'string',
      title: 'Form Heading'
    },
    {
      name: 'formDescription',
      type: 'array',
      title: 'Description',
      of: [{ type: 'block' }]
    },
    {
      name: 'formType',
      type: 'string',
      title: 'Form Type',
      options: {
        list: ['contact', 'testimony'],
        layout: 'radio'
      }
    },
    {
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Field',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            {
              name: 'name',
              type: 'string',
              title: 'Name (for backend)',
              description: 'This will be used as the HTML name attribute',
              validation: Rule => Rule.required()
            },
            {
              name: 'type',
              type: 'string',
              title: 'Field Type',
              options: {
                list: ['text', 'email', 'textarea', 'select'],
                layout: 'dropdown'
              }
            },
            {
              name: 'options',
              title: 'Options (for select fields only)',
              type: 'array',
              of: [{ type: 'string' }],
              hidden: ({ parent }) => parent.type !== 'select'
            },
            {
              name: 'required',
              type: 'boolean',
              title: 'Required'
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'formTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled Form Section'
      };
    }
  }
};
