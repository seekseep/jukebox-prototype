import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useGetRoomPath } from '../../../hooks/router'

export function useGetNavLinkProps (schoolId, roomId) {
  const { asPath: currentPathname } = useRouter()
  const getRoomPath = useGetRoomPath(schoolId, roomId)

  return useCallback(({ pathname, ...props }) => {
    const href = getRoomPath(pathname)
    const isActive = new RegExp(`^${href}`).test(currentPathname)

    return {
      href,
      className: classNames(
        'px-4 py-2 hover:bg-gray-700 text-sm',
        { 'bg-gray-900 font-bold': isActive }
      ),
      ...props
    }
  }, [currentPathname, getRoomPath])
}
