import { useMemo } from 'react'

export function useResourceUsersByRoleType (havingRoleResource, roleType) {
  const filteredUsers = useMemo(() => {
    if (!havingRoleResource) return null
    return havingRoleResource.roles.filter(role => role.type === roleType).map(({ user }) => user)
  }, [havingRoleResource, roleType])
  return filteredUsers
}
