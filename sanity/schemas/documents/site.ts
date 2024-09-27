import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'site',
  title: 'Site',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'navigation', title: 'Navigation' },
    { name: 'theme', title: 'Theme' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      type: 'logo',
      options: {
        collapsable: true,
        collapsed: true,
      },
      group: 'general',
    }),
    defineField({
      name: 'announcements',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'announcement' }] }],
      group: 'general',
      description: 'Higher order has higher precedence',
    }),
    defineField({
      name: 'ctas',
      title: 'Call-to-action',
      type: 'array',
      of: [{ type: 'cta' }],
      group: 'general',
    }),
    defineField({
      name: 'copyright',
      type: 'array',
      of: [
        {
          type: 'custom-block',
          // @ts-ignore
          styles: [{ title: 'Normal', value: 'normal' }],
        },
      ],
      group: 'general',
    }),
    defineField({
      name: 'headerMenu',
      type: 'reference',
      to: [{ type: 'navigation' }],
      group: 'navigation',
    }),
    defineField({
      name: 'footerMenu',
      type: 'reference',
      to: [{ type: 'navigation' }],
      group: 'navigation',
    }),
    defineField({
      name: 'social',
      type: 'reference',
      to: [{ type: 'navigation' }],
      group: 'navigation',
    }),
    defineField({
      name: 'ogimage',
      title: 'Open Graph Image (global)',
      description: 'Used for social sharing previews',
      type: 'image',
      group: 'general',
    }),
    // defineField({
    //   title: 'Primary color',
    //   name: 'primaryColor',
    //   type: 'simplerColor',
    //   group: 'theme',
    // }),
    // defineField({
    //   title: 'Secondary color',
    //   name: 'secondaryColor',
    //   type: 'simplerColor',
    //   group: 'theme',
    // }),
    // defineField({
    //   title: 'Accent color',
    //   name: 'accentColor',
    //   type: 'simplerColor',
    //   group: 'theme',
    // }),
    // defineField({
    //   title: 'Background color',
    //   name: 'backgroundColor',
    //   type: 'simplerColor',
    //   group: 'theme',
    // }),
    // defineField({
    //   title: 'Text color',
    //   name: 'textColor',
    //   type: 'simplerColor',
    //   group: 'theme',
    // }),
    // defineField({
    //   title: 'Link color',
    //   name: 'linkColor',
    //   type: 'simplerColor',
    //   group: 'theme',
    // }),
  ],
  preview: {
    prepare: () => ({
      title: 'Site',
    }),
  },
});
