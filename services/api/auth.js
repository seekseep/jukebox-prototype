import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutFromFirebase,
  onAuthStateChanged
} from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

import { app } from '../../firebase'

import { docToData } from './utils'

export async function getCurrentUser () {
  return new Promise((resolve) => {
    const auth = getAuth(app)
    onAuthStateChanged(auth, resolve)
  })
}

export async function signUp(email, password, name) {
  const auth = getAuth(app)
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  const { uid } = credential.user

  const firestore = getFirestore(app)
  const userRef = doc(firestore, `/users/${uid}`)
  await setDoc(userRef, { name })

  const snapshot = await getDoc(userRef)

  return docToData(snapshot)
}

export async function signIn(email, password) {
  const auth = getAuth(app)
  const credential = await signInWithEmailAndPassword(auth, email, password)
  const { uid } = credential.user

  const firestore = getFirestore(app)
  const userRef = doc(firestore, `/users/${uid}`)
  const snapshot = await getDoc(userRef)

  return docToData(snapshot)
}

export async function signOut () {
  const auth = getAuth(app)
  await signOutFromFirebase(auth)
}
