import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutFromFirebase,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

import { auth, firestore } from '../../firebase'

import { docSnapshotToData } from './utils'

export async function getCurrentUser () {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, resolve)
  })
}

export async function signUp(email, password, name) {
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  const { uid } = credential.user

  const userRef = doc(firestore, `/users/${uid}`)
  await setDoc(userRef, { name })

  const snapshot = await getDoc(userRef)

  return docSnapshotToData(snapshot)
}

export async function signIn(email, password) {
  const credential = await signInWithEmailAndPassword(auth, email, password)
  const { uid } = credential.user

  const userRef = doc(firestore, `/users/${uid}`)
  const snapshot = await getDoc(userRef)

  return docSnapshotToData(snapshot)
}

export async function signOut () {
  const auth = getAuth()
  await signOutFromFirebase(auth)
}
