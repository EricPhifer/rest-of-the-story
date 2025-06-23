export default {
  name: 'contactInformationSection',
  type: 'object',
  title: 'Contact Information Section',
  fields: [
    {
      name: 'storeHours',
      title: 'Store Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'storeHourEntry',
          title: 'Store Hour Entry',
          fields: [
            {
              name: 'days',
              title: 'Days (e.g., Mon–Fri)',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'open',
              title: 'Opening Time',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'close',
              title: 'Closing Time',
              type: 'string',
              validation: Rule => Rule.required()
            }
          ]
        }
      ]
    },
    {
      name: 'address',
      title: 'Address',
      type: 'text'
    },
    {
      name: 'addressIcon',
      title: 'Address Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Map Pin', value: 'map-pin' },
          { title: 'Location', value: 'location' },
          { title: 'Store', value: 'store' }
        ],
        layout: 'radio'
      }
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string'
    },
    {
      name: 'phoneIcon',
      title: 'Phone Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Phone', value: 'phone' },
          { title: 'Mobile', value: 'mobile' },
          { title: 'Call', value: 'call' }
        ],
        layout: 'radio'
      }
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string'
    },
    {
      name: 'emailIcon',
      title: 'Email Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Envelope', value: 'envelope' },
          { title: 'Mail', value: 'mail' },
          { title: 'Message', value: 'message' }
        ],
        layout: 'radio'
      }
    }
  ],
  preview: {
    select: {
      title: 'address'
    },
    prepare({ title }) {
      return {
        title: 'Contact Info Section',
        subtitle: title || 'No address set'
      }
    }
  }
}
