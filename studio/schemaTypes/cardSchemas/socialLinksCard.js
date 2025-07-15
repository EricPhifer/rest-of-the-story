// schemas/socialLinksCard.js
export default {
  name: 'socialLinksCard',
  title: 'Social Links Card',
  type: 'object',
  fields: [
    {
      name: 'label', title: 'Label', type: 'string',
      initialValue: 'Follow Us', validation: (Rule) => Rule.required()
    },
    {
      name: 'links', title: 'Links', type: 'array',
      of: [{ type: 'socialMediaLink' }],
      validation: (Rule) => Rule.required().min(1)
    },
  ],
 preview: {
    select: {
      title: 'label',
      links: 'links'
    },
    prepare({ title, links = [] }) {
      const count = links.length
      return {
        title,
        subtitle: `${count} link${count === 1 ? '' : 's'}`
      }
    }
  }

}
