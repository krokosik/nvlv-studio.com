import { defineField, defineType } from 'sanity';
import { TfiLayoutCtaCenter } from 'react-icons/tfi';
import { getBlockText } from '@sanity/src/utils';
import {
  textAlign,
  alignItems,
  alignmentFieldset,
} from '../fragments/fields/alignment';

export default defineType({
  name: 'hero',
  title: 'Hero',
  icon: TfiLayoutCtaCenter,
  type: 'object',
  groups: [
    { name: 'content', default: true },
    { name: 'orbs' },
    { name: 'image' },
    { name: 'options' },
  ],
  fieldsets: [alignmentFieldset],
  fields: [
    defineField({
      name: 'pretitle',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{ type: 'custom-block' }],
      group: 'content',
    }),
    defineField({
      name: 'ctas',
      title: 'Call-to-actions',
      type: 'array',
      of: [{ type: 'cta' }],
      group: 'content',
    }),
    defineField({
      name: 'enableOrbs',
      description:
        'Enable animated orbs instead of an image. If used, the background image will be used as a fallback for legacy browsers. Leave blank colors for transparent.',
      title: 'Enable',
      type: 'boolean',
      group: 'orbs',
    }),
    defineField({
      name: 'orbFill',
      title: 'Orb color',
      type: 'simplerColor',
      group: 'orbs',
    }),
    defineField({
      name: 'orbBackground',
      title: 'Background color',
      type: 'simplerColor',
      group: 'orbs',
    }),
    defineField({
      name: 'bgImage',
      title: 'Background image',
      description:
        'Image used as fallback when orb canvas is not supported (legacy browsers)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
        }),
        defineField({
          name: 'loading',
          type: 'string',
          options: {
            layout: 'radio',
            list: ['lazy', 'eager'],
          },
          initialValue: 'lazy',
        }),
      ],
      group: 'image',
    }),
    defineField({
      name: 'bgImageMobile',
      title: 'Background image (mobile)',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'image',
    }),
    defineField({
      ...textAlign,
      fieldset: 'alignment',
    }),
    defineField({
      ...alignItems,
      fieldset: 'alignment',
    }),
  ],
  preview: {
    select: {
      content: 'content',
      media: 'bgImage',
    },
    prepare: ({ content, media }) => ({
      title: getBlockText(content),
      subtitle: 'Hero',
      media,
    }),
  },
});
