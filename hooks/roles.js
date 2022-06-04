import {
  useDocAsObjectQuery,
  useCreateDocMutation,
  useUpdateDocMutation,
  useDeleteDocMutation
} from '@/hooks/api'

export function useRoleQuery(roleId) {
  return useDocAsObjectQuery(`/roles/${roleId}`)
}

export function useCreateRoleMutation () {
  return useCreateDocMutation('/roles')
}

export function useUpdateRoleMutation (roleId) {
  return useUpdateDocMutation(roleId && `/roles/${roleId}`)
}

export function useDeleteRoleMutation (roleId) {
  return useDeleteDocMutation(roleId && `/roles/${roleId}`)
}
