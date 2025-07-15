// schemas/emailCard.js
export default {
  name: 'emailCard',
  title: 'Email Card',
  type: 'object',
  fields: [
    {
      name: 'label', title: 'Label', type: 'string',
      initialValue: 'Email Us', validation: (Rule) => Rule.required()
    },
    {
      name: 'address', title: 'Email Address', type: 'email',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'icon', title: 'Icon Class', type: 'string',
      options:{
        list:[
          {title:'Envelope', value:'fa-solid fa-envelope'},
          {title:'Mail',     value:'fa-solid fa-mail-bulk'}
        ]
      },
      validation: (Rule) => Rule.required()
    },
  ],
  preview: {
    select: { title: 'label', subtitle: 'address' }
  }
}
