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

    // ── Source — either YouTube OR own video file ──────────────────────────
    defineField({
      name: 'youtubeId',
      title: 'YouTube Video ID (optional)',
      type: 'string',
      description: 'The part after ?v= in the YouTube URL, e.g. dQw4w9WgXcQ',
    }),
    defineField({
      name: 'videoFile',
      title: 'Upload your own video (optional)',
      type: 'file',
      description: 'Upload an MP4/WebM file. Used when no YouTube ID is set.',
      options: { accept: 'video/*' },
    }),
    // ──────────────────────────────────────────────────────────────────────

    defineField({
      name: 'thumbnailUrl',
      title: 'Thumbnail URL (optional)',
      type: 'url',
      description: 'Optional. YouTube thumbnails are auto-generated. Own videos use the first frame automatically.',
    }),
    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail image (optional)',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional custom thumbnail image. Leave blank to use the video\'s first frame.',
    }),
    defineField({ name: 'description_vi', title: 'Description (Vietnamese)', type: 'text', rows: 3 }),
    defineField({ name: 'description_en', title: 'Description (English)', type: 'text', rows: 3 }),
    defineField({ name: 'duration', title: 'Duration', type: 'string', description: 'e.g. 12:34' }),
    defineField({ name: 'date', title: 'Date', type: 'date', validation: r => r.required() }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'hasTranscript', title: 'Has Transcript', type: 'boolean', initialValue: false }),
  ],
  orderings: [{ title: 'Date (newest)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { title: 'title_en', subtitle: 'category' },
  },
})
