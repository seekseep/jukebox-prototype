import ErrorAlert from '@/components/parts/ErrorAlert'
import Loading from '@/components/parts/Loading'

export default function Suspension ({ data, isLoading, error, isSuccess, children }) {
  return (
    <>
      {error && <ErrorAlert error={error} />}
      {isLoading && <Loading />}
      {isSuccess && (
        typeof children === 'function' ? children({ data }) : children
      )}
    </>
  )
}
