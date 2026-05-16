'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { DeleteAction } from './sanity/actions/DeleteAction'

const DELETABLE_TYPES = ['photo', 'video', 'newsArticle', 'quote']

export default defineConfig({
  name: 'minh-tue-archive',
  title: 'Minh Tuệ Archive',
  projectId: '6bzvjl52',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, { schemaType }) => {
      if (!DELETABLE_TYPES.includes(schemaType)) return prev
      // Put Delete first so it's always visible in the toolbar
      return [DeleteAction, ...prev]
    },
  },
})
