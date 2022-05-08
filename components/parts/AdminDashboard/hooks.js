import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { useGetAdminPath } from '@/hooks/admin'

export function useGetNavLinkProps () {
  const { asPath: currentPathname } = useRouter()
  const getAdminPath = useGetAdminPath()

  return useCallback(({ pathname, ...props }) => {
    const href = getAdminPath(pathname)
    const isActive = new RegExp(`^${href}`).test(currentPathname)

    return {
      href,
      className: classNames(
        'px-4 py-2 hover:bg-gray-700 text-sm text-white',
        { 'bg-gray-900 font-bold': isActive }
      ),
      ...props
    }
  }, [currentPathname, getAdminPath])
}
