// file: contactInfoSection.js
export default {
  name: 'contactInfoSection',
  title: 'Contact Info Section',
  type: 'object',
  fields: [
    {
      name: 'hours',
      title: 'Store Hours',
      type: 'array',
      of: [
        { type: 'storeHoursEntry' }
      ],
    },
    {
      name: 'contacts',
      title: 'Contact Entries',
      type: 'array',
      of: [{ type: 'contactInfo' }],
    },
  ],
  preview: {
    select: {
      hoursCount:   'hours.length',
      contactsCount:'contacts.length',
    },
    prepare({ hoursCount, contactsCount }) {
      return {
        title: 'Contact Info Section',
        subtitle: `${hoursCount || 0} hour${hoursCount===1?'':'s'}, ${contactsCount || 0} contact${contactsCount===1?'':'s'}`,
      };
    },
  },
};
