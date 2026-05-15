import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'quote',
  title: 'Quote / Teaching',
  type: 'document',
  fields: [
    defineField({ name: 'text_vi', title: 'Quote (Vietnamese)', type: 'text', rows: 4, validation: r => r.required() }),
    defineField({ name: 'text_en', title: 'Quote (English)', type: 'text', rows: 4, validation: r => r.required() }),
    defineField({
      name: 'theme', title: 'Theme', type: 'string',
      options: { list: ['compassion', 'simplicity', 'impermanence', 'walking', 'freedom'], layout: 'radio' },
      validation: r => r.required(),
    }),
    defineField({ name: 'source', title: 'Source / Context', type: 'string', description: 'e.g. Interview at Đà Nẵng, 2023' }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
  ],
  preview: {
    select: { title: 'text_en', subtitle: 'theme' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare: (sel: any) => ({
      title: (sel.title as string)?.slice(0, 60) + '…',
      subtitle: sel.subtitle,
    }),
  },
})
