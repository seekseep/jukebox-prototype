import useSWR from 'swr'

import { getDocAsObject } from '@/services/api'

export function WithDocRef ({ docRef, children, fallback }) {
  const { data, error } = useSWR(docRef.path, getDocAsObject)

  const isLoading = !data && !error
  const isError = !data && error

  if (isLoading) return '...'
  if (isError) return fallback || error

  return children({ data })
}

export function WithDocRefs({ docRefs, children }) {
  return docRefs.map(docRef => (
    <WithDocRef key={docRef.id} docRef={docRef}>
      {children}
    </WithDocRef>
  ))
}
