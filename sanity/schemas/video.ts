import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'video',
  title: 'Video',
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
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['pilgrimage', 'teaching', 'interview', 'news'], layout: 'radio' },
      validation: r => r.required(),
    }),
    defineField({ name: 'youtubeId', title: 'YouTube Video ID', type: 'string', description: 'The part after ?v= in the YouTube URL', validation: r => r.required() }),
    defineField({ name: 'thumbnailUrl', title: 'Thumbnail URL', type: 'url', description: 'Leave blank to use YouTube default thumbnail' }),
    defineField({ name: 'description_vi', title: 'Description (Vietnamese)', type: 'text', rows: 3 }),
    defineField({ name: 'description_en', title: 'Description (English)', type: 'text', rows: 3 }),
    defineField({ name: 'duration', title: 'Duration', type: 'string', description: 'e.g. 12:34' }),
    defineField({ name: 'date', title: 'Date', type: 'date', validation: r => r.required() }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'hasTranscript', title: 'Has Transcript', type: 'boolean', initialValue: false }),
  ],
  orderings: [{ title: 'Date (newest)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { title: 'title_en', subtitle: 'category', media: 'thumbnailUrl' },
  },
})
