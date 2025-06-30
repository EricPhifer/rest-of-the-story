// schemas/phoneCard.js
export default {
  name: 'phoneCard',
  title: 'Phone Card',
  type: 'object',
  fields: [
    {
      name: 'label', title: 'Label', type: 'string',
      initialValue: 'Call Us', validation: (Rule) => Rule.required()
    },
    {
      name: 'number', title: 'Phone Number', type: 'string',
      validation: (Rule) =>
        Rule.required()
            .regex(/^\+?[0-9\s\-()]+$/, { name: 'phone number' })
    },
    {
      name: 'icon', title: 'Icon Class', type: 'string',
      options:{
        list:[
          {title:'Phone', value:'fa-solid fa-phone'},
          {title:'Mobile', value:'fa-solid fa-mobile-alt'}
        ]
      },
      validation: (Rule) => Rule.required()
    },
  ],
  preview: {
    select: { title: 'label', subtitle: 'number' }
  }
}
