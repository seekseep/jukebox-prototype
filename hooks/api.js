import useSWR from 'swr'
import { useCallback, useMemo, useState } from 'react'

import { getCollectioDocRefs, getDocAsObject, getCollectionAsObjectArray, updateDoc, createDoc, deleteDoc } from '@/services/api'

export function expandSWR ({ data, error, mutate, isValidating, ...swrResponse }) {
  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading: data === undefined && !error,
    isSuccess: data !== undefined && !error,
    ...swrResponse,
  }
}

export function useUnionExpandedSWR (...results) {
  return useMemo(() => {
    return results.reduce(({
      data,
      errors,
      isValidating,
      isLoading,
      isSuccess,
    }, result) => {
      return {
        data        : [...data, ...(result.data ? [result.data] : [])],
        errors      : [...errors, ...(result.error ? [result.error] : [])],
        isValidating: isValidating === null ? result.isValidating : isValidating || result.isValidating,
        isLoading   : isLoading === null ? result.isLoading : isLoading || result.isLoading,
        isSuccess   : isSuccess === null ? result.isSuccess : isSuccess && result.isSuccess,
      }
    }, {
      data        : [],
      errors      : [],
      isValidating: null,
      isLoading   : null,
      isSuccess   : null
    })
  }, [results])
}

export function useCollectionAsObjectArrayQuery(path) {
  const swr = useSWR(path && [path, 'as-object'], getCollectionAsObjectArray)
  return expandSWR(swr)
}

export function useDocAsObjectQuery (path = null) {
  const swr = useSWR(path && [path, 'as-object'], getDocAsObject)
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

export function useCreateDocMutation(path) {
  return useMutation((data) => createDoc(path, data))
}

export function useUpdateDocMutation(path) {
  return useMutation((data) => updateDoc(path, data))
}

export function useDeleteDocMutation(path) {
  return useMutation(() => deleteDoc(path))
}
