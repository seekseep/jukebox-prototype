import { useMemo } from 'react'

export function useIsActive (pathame, currentPathname, exact = false) {
  const isActive = useMemo(() => {
    const _pathame = pathame.replace(/\/$/, '')
    const _currentPathname = currentPathname.replace(/\/$/, '')

    if (exact) return _pathame === _currentPathname

    return !!new RegExp(`^${_pathame}`).test(_currentPathname)
  }, [currentPathname, exact, pathame])

  return isActive
}
