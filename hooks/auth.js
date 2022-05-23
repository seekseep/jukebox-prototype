import useSWR from 'swr'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { signUp, signIn, signOut, getCurrentUser, onCurrentUserChange } from '@/services/api/auth'

import { expandSWR, useMutation }  from '@/hooks/api'
import { AUTH_STATE } from '@/constants'

const AuthContext = createContext()

export function AuthProvider (props) {
  const [currentUser, setCurentUser] = useState(undefined)

  useEffect(() => {
    const unsubscribe =  onCurrentUserChange((currentUser) => {
      setCurentUser(currentUser)
    })
    return unsubscribe
  }, [])

  return <AuthContext.Provider value={currentUser} {...props} />
}

export function useAuthState () {
  const currentUser = useContext(AuthContext)
  return useMemo(() => {
    if (currentUser === undefined) return AUTH_STATE.LOADING
    if (currentUser === null) return AUTH_STATE.UNAUTHORIZED
    return AUTH_STATE.AUTHORIZED
  }, [currentUser])
}

export function useCurrentUserId () {
  const currentUser = useContext(AuthContext)
  return currentUser?.uid || null
}

export function useCurrentUser () {
  const currentUser = useContext(AuthContext)
  const isLoading = currentUser === undefined

  const swr = useSWR(
    // NOTE: 認証状態が確定しないときはユーザ情報の取得を行わない
    isLoading ? null : [currentUser?.uid, 'currentUser'],
    getCurrentUser
  )
  return expandSWR(swr)
}

export function useSignUpMutation () {
  return useMutation(
    async ({ email, password, name }) => await signUp(email, password, name)
  )
}

export function useSignInMutation () {
  return useMutation(
    async ({ email, password }) => await signIn(email, password)
  )
}

export function useSignOutMutation () {
  return useMutation(
    async () => await signOut()
  )
}
