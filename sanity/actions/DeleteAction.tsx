import { TrashIcon } from '@sanity/icons'
import { useDocumentOperation, useDocumentPairPermissions } from 'sanity'

interface Props {
  id: string
  type: string
  onComplete: () => void
}

export function DeleteAction({ id, type, onComplete }: Props) {
  const { delete: deleteOp } = useDocumentOperation(id, type)
  const [permissions, isPermissionsLoading] = useDocumentPairPermissions({
    id,
    type,
    permission: 'delete',
  })

  const isDisabled = isPermissionsLoading || !permissions?.granted || !!deleteOp.disabled

  return {
    label: 'Delete',
    icon: TrashIcon,
    tone: 'critical' as const,
    disabled: isDisabled,
    onHandle: () => {
      // eslint-disable-next-line no-alert
      if (typeof window !== 'undefined' && window.confirm('Delete this document permanently? This cannot be undone.')) {
        deleteOp.execute()
        onComplete()
      }
    },
  }
}
