import useSWR from 'swr'
import { useCallback, useState } from 'react'

import { getCollectioDocRefs, getDocAsObject, getCollectionAsObjectArray } from '@/services/api'

export function expandSWR ({ data, error, ...remain }) {
  return {
    data,
    error,
    isLoading: data === undefined && !error,
    isSuccess: data !== undefined && !error,
    ...remain,
  }
}

export function useCollectionAsObjectArrayQuery(path) {
  const swr = useSWR(path, getCollectionAsObjectArray)
  return expandSWR(swr)
}

export function useDocAsObjectQuery (path) {
  const swr = useSWR(path, getDocAsObject)
  return expandSWR(swr)
}

export function useCollectioDocRefsQuery (path) {
  const swr = useSWR(path, getCollectioDocRefs)
  return expandSWR(swr)
}

export function useMutation (execute) {
  const [{
    isLoading,
    isSuccess,
    isError,
    data,
    error
  }, setState] = useState({
    isLoading: false,
    isSuccess: false,
    isError  : false,
    data     : null,
    error    : null
  })

  const start = useCallback(() => {
    setState({ isLoading: true, error: null, data: null, isSuccess: false, isError: false })
  }, [])
  const succeed = useCallback((data) => {
    setState({ isLoading: false, error: null, data, isSuccess: true, isError: false })
  }, [])
  const fail = useCallback((error) => {
    setState({ isLoading: false, error, data: null, isSuccess: false, isError: true })
  }, [])

  const mutate = useCallback(async (...args) => {
    if (isLoading) return

    start()
    try {
      const data = await execute(...args)
      succeed(data)
    } catch (error) {
      fail(error)
    }
  }, [execute, fail, isLoading, start, succeed])

  return [mutate, {
    isLoading,
    isSuccess,
    isError,
    data,
    error
  }]
}
