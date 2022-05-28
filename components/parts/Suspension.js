import { useMemo } from 'react'
import ErrorAlert from '@/components/parts/ErrorAlert'
import Loading from '@/components/parts/Loading'

export default function Suspension ({ data, isLoading, error, isSuccess, children }) {
  return (
    <>
      <ErrorAlert error={error} />
      {isLoading && <Loading />}
      {isSuccess && (
        typeof children === 'function' ? children({ data }) : children
      )}
    </>
  )
}

export function MultiSuspension ({ results, children }) {
  const {
    data,
    errors,
    isSuccess,
    isLoading
  } = useMemo(() => {
    return results.reduce(({ data, errors, isSuccess, isLoading }, result) => ({
      data     : [...data, result.data],
      errors   : [...errors, result.error],
      isSuccess: isSuccess === null ? result.isSuccess : isSuccess && result.isSuccess,
      isLoading: isLoading === null ? result.isLoading : isLoading || result.isLoading,
    }), {
      data     : [],
      isSuccess: null,
      isLoading: null,
      errors   : []
    })
  }, [results])

  return (
    <>
      {errors.map((error, index) => <ErrorAlert key={index} error={error} />)}
      {isLoading && <Loading />}
      {isSuccess && (
        typeof children === 'function' ? children({ data }) : children
      )}
    </>
  )
}
