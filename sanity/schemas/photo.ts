import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    defineField({ name: 'title_vi', title: 'Title (Vietnamese)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'title_en', title: 'Title (English)', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug',
      options: { source: 'title_en', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({
      name: 'image', title: 'Image', type: 'image',
      options: { hotspot: true },
      validation: r => r.required(),
    }),
    defineField({ name: 'alt_vi', title: 'Alt text (Vietnamese)', type: 'string' }),
    defineField({ name: 'alt_en', title: 'Alt text (English)', type: 'string' }),
    defineField({ name: 'caption_vi', title: 'Caption (Vietnamese)', type: 'text', rows: 2 }),
    defineField({ name: 'caption_en', title: 'Caption (English)', type: 'text', rows: 2 }),
    defineField({ name: 'year', title: 'Year', type: 'number' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({
      name: 'theme', title: 'Themes', type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['pilgrimage', 'community', 'portrait', 'international', 'media'] },
    }),
    defineField({ name: 'source', title: 'Photo source / credit', type: 'string' }),
  ],
  orderings: [{ title: 'Year (newest)', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] }],
  preview: {
    select: { title: 'title_en', subtitle: 'location', media: 'image' },
  },
})
