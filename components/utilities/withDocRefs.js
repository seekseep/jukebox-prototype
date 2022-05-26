import useSWR from 'swr'

import { getDocAsObject } from '@/services/api'

export function WithDocRef ({ docRef, children, fallback, index }) {
  const { data, error } = useSWR(docRef.path, getDocAsObject)

  const isLoading = !data && !error
  const isError = !data && error

  if (isLoading) return '...'
  if (isError) return fallback || error

  return children({ data, ref: docRef }, index)
}

export function WithDocRefs({ docRefs, children }) {
  return docRefs.map((docRef, index) => (
    <WithDocRef key={docRef.id} docRef={docRef} index={index}>
      {children}
    </WithDocRef>
  ))
}
