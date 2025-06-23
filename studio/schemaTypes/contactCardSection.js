export default {
  name: 'contactCardSection',
  type: 'object',
  title: 'Contact Card Section',
  fields: [
    {
      name: 'phone',
      title: 'Phone',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label', initialValue: 'Call Us' },
        { name: 'value', type: 'string', title: 'Phone Number' },
        { name: 'icon', type: 'string', title: 'Icon class (e.g. fa-solid fa-phone)' }
      ]
    },
    {
      name: 'email',
      title: 'Email',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label', initialValue: 'Email Us' },
        { name: 'value', type: 'string', title: 'Email Address' },
        { name: 'icon', type: 'string', title: 'Icon class (e.g. fa-solid fa-envelope)' }
      ]
    },
    {
      name: 'socialMedia',
      title: 'Social Media',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Platform Name' },
            { name: 'url', type: 'url', title: 'Link' },
            { name: 'icon', type: 'string', title: 'Icon class (e.g. fa-brands fa-facebook)' }
          ]
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Card Section',
        subtitle: 'Phone, Email, Social Media'
      };
    }
  }
};
