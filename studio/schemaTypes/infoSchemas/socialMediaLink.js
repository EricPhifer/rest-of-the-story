// file: socialMediaLink.js
export default {
  name: 'socialMediaLink',
  title: 'Social Media Link',
  type: 'object',
  fields: [
    {
      name: 'platform',
      title: 'Platform Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon Class',
      type: 'string',
      options: {
        list: [
          { title: 'Facebook', value: 'fa-brands fa-facebook' },
          { title: 'Google',  value: 'fa-brands fa-google' },
          { title: 'Instagram',  value: 'fa-brands fa-instagram' },
          { title: 'Twitter',  value: 'fa-brands fa-twitter' },
        ],
      },
    },
  ],
  preview: {
    select: { title: 'platform' },
  },
};
