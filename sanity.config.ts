'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

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
      // Find the delete action in the default list and move it to be visible
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const deleteAction = prev.find((a: any) =>
        a.action === 'delete' || a.displayName === 'Delete' || a.name === 'delete'
      )
      if (!deleteAction) return prev
      // Remove from current position and put at the end (visible in toolbar)
      return [...prev.filter(a => a !== deleteAction), deleteAction]
    },
  },
})
