import { useEffect } from 'react'
import useSWR from 'swr'

import { signUp, signIn, signOut, getCurrentUser,  } from '../services/api/auth'

import { useMutation, expandSWR }  from './api'

export function useCurrentUser () {
  const swr = useSWR('currentUser', () => getCurrentUser())
  return expandSWR(swr)
}

export function useSignUp () {
  return useMutation(
    async (email, password, name) => await signUp(email, password, name)
  )
}

export function useSignIn () {
  return useMutation(
    async (email, password) => await signIn(email, password)
  )
}

export function useSignOut () {
  return useMutation(
    async () => await signOut()
  )
}
