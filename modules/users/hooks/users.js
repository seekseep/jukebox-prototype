import {
  useCreateDocMutation,
  useDeleteDocMutation,
  useDocAsObjectQuery,
  useUpdateDocMutation
} from '@/hooks/api'

export function useCreateUserMutation() {
  return useCreateDocMutation('/users')
}

export function useUserQuery(userId = null) {
  return useDocAsObjectQuery(userId && `/users/${userId}`)
}

export function useUpdateUserMutation(userId = null) {
  return useUpdateDocMutation(userId && `/users/${userId}`)
}

export function useDeleteUserMutation(userId = null) {
  return useDeleteDocMutation(userId && `/users/${userId}`)
}
