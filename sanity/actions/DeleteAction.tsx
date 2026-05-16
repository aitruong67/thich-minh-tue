import { useState } from 'react'
import { TrashIcon } from '@sanity/icons'
import { useDocumentOperation } from 'sanity'

interface Props {
  id: string
  type: string
  onComplete: () => void
}

export function DeleteAction({ id, type, onComplete }: Props) {
  const { delete: deleteOp } = useDocumentOperation(id, type)
  const [confirming, setConfirming] = useState(false)

  if (confirming) {
    return {
      label: 'Confirm delete?',
      icon: TrashIcon,
      tone: 'critical' as const,
      onHandle: () => {
        deleteOp.execute()
        onComplete()
        setConfirming(false)
      },
    }
  }

  return {
    label: 'Delete',
    icon: TrashIcon,
    tone: 'critical' as const,
    disabled: !!deleteOp.disabled,
    onHandle: () => setConfirming(true),
  }
}
