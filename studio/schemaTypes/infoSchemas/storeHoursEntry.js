// schemas/storeHoursEntry.js
export default {
  name: 'storeHoursEntry',
  type: 'object',
  title: 'Store Hour Entry',
  fields: [
    {
      name: 'days',
      title: 'Days (e.g. Mon–Fri or Dec 25)',
      type: 'string',
      validation: (Rule) => Rule.required().error('You must specify the days'),
    },
    {
      name: 'closed',
      title: 'Closed?',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle on for holidays or special closures',
    },
    {
      name: 'open',
      title: 'Opening Time',
      type: 'string',
      hidden: ({ parent }) => parent.closed,
      validation: (Rule) =>
        Rule.custom((open, { parent }) => {
          if (parent.closed) return true
          return open ? true : 'Opening time is required when not closed'
        }),
    },
    {
      name: 'close',
      title: 'Closing Time',
      type: 'string',
      hidden: ({ parent }) => parent.closed,
      validation: (Rule) =>
        Rule.custom((close, { parent }) => {
          if (parent.closed) return true
          return close ? true : 'Closing time is required when not closed'
        }),
    },
    {
      name: 'note',
      title: 'Note',
      type: 'string',
      description: 'Optional note (e.g. “Christmas Day”)',
    },
  ],
  preview: {
    select: {
      days: 'days',
      closed: 'closed',
      open: 'open',
      close: 'close',
    },
    prepare({ days, closed, open, close }) {
      return {
        title: days,
        subtitle: closed
          ? 'Closed'
          : open && close
          ? `${open} – ${close}`
          : 'No hours set',
      }
    },
  },
}
