import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'newsArticle',
  title: 'News Article',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, validation: r => r.required() }),
    defineField({
      name: 'coverImage', title: 'Cover Image', type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'coverImageUrl', title: 'Cover Image URL (external)', type: 'url', description: 'Use this OR upload an image above' }),
    defineField({ name: 'body_vi', title: 'Body (Vietnamese)', type: 'text', rows: 15 }),
    defineField({ name: 'body_en', title: 'Body (English)', type: 'text', rows: 15 }),
    defineField({ name: 'date', title: 'Publication date', type: 'date', validation: r => r.required() }),
    defineField({ name: 'author', title: 'Author / Source', type: 'string', validation: r => r.required() }),
    defineField({ name: 'readingTime', title: 'Reading time (minutes)', type: 'number' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'sourceUrl', title: 'Original article URL', type: 'url' }),
  ],
  orderings: [{ title: 'Date (newest)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'author', media: 'coverImage' },
  },
})
