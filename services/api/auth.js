import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutFromFirebase,
  onAuthStateChanged
} from 'firebase/auth'
import { setDoc, getDoc } from 'firebase/firestore'

import { auth } from '@/firebase'

import { getUserRef } from './users'
import { docSnapshotToObject } from './utils'

export function onCurrentUserChange (observer) {
  const unsubscribe = onAuthStateChanged(auth, observer)
  return unsubscribe
}

export async function signUp(email, password, name) {
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  const { uid } = credential.user

  const userRef = getUserRef(uid)
  await setDoc(userRef, { name })

  const snapshot = await getDoc(userRef)

  return docSnapshotToObject(snapshot)
}

export async function signIn(email, password) {
  const credential = await signInWithEmailAndPassword(auth, email, password)
  const { uid } = credential.user

  const userRef = getUserRef(uid)
  const snapshot = await getDoc(userRef)

  return docSnapshotToObject(snapshot)
}

export async function signOut () {
  await signOutFromFirebase(auth)
}
