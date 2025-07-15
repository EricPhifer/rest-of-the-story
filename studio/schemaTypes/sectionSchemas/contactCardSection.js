// file: contactCardSection.js
export default {
  name: 'contactCardSection',
  title: 'Contact Card Section',
  type: 'object',
  fields: [
    { 
      name: 'contactCards',
      title: 'Contact Cards',
      type: 'array',
      of: [
        { type: 'phoneCard' },
        { type: 'emailCard' },
        { type: 'socialLinksCard' }
      ],
      validation: (Rule) => Rule.required().min(1).error('At least one contact card is required')
    },
  ],
 preview: {
    select: {
      cards: 'contactCards'
    },
    prepare({ cards }) {
      const list = Array.isArray(cards) ? cards.map(c => c.label) : []
      const count = list.length
      let subtitle

      if (count === 0) {
        subtitle = 'No cards'
      } else if (count === 1) {
        subtitle = list[0]
      } else if (count === 2) {
        subtitle = list.join(', ')
      } else {
        subtitle = `${list[0]}, ${list[1]}, +${count - 2} more`
      }

      return {
        title: `Contact Cards (${count})`,
        subtitle
      }
    }
  }
};
