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
      firstContact: 'contacts.0.label', // grab the first contact’s label
      hours:        'hours', // pull in the full hours array
      contacts:     'count(contacts)' // pull in the full contacts array
    },
    prepare({ firstContact, hours = [], contacts = [] }) {
      const hoursCount    = Array.isArray(hours)    ? hours.length    : 0
      const contactsCount = Array.isArray(contacts) ? contacts.length : 0

      return {
        title: firstContact
          ? `Contact: ${firstContact}`
          : 'Contact Info Section',
        subtitle: `${hoursCount} hour${hoursCount === 1 ? '' : 's'}, ` +
                  `${contactsCount} contact${contactsCount === 1 ? '' : 's'}`
      }
    }
  }
};
