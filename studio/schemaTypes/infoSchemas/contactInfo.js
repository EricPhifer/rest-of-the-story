// file: contactInfo.js
export default {
  name: 'contactInfo',
  title: 'Contact Information (Sitewide)',
  type: 'object',
  fields: [
    {
      name: 'address',
      title: 'Address',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'addressIcon',
      title: 'Address Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Map Pin', value: 'map-pin' },
          { title: 'Store',   value: 'store' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
           .regex(/^\+?[0-9\s\-()]+$/, { name: 'phone number' }),
    },
    {
      name: 'phoneIcon',
      title: 'Phone Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Phone',  value: 'phone' },
          { title: 'Mobile', value: 'mobile' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'email',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'emailIcon',
      title: 'Email Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Envelope', value: 'envelope' },
          { title: 'Message',  value: 'message' },
        ],
        layout: 'radio',
      },
    },
  ],
 preview: {
    select: {
      addressText: 'join(address[].children[].text, " ")'
    },
    prepare({ addressText }) {
      return {
        title: 'Contact Information',
        subtitle: addressText || '— no address set —'
      }
    }
  }
};
