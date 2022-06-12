import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

export const app = initializeApp({
  apiKey           : process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain       : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId        : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket    : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId            : process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId    : process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
})

export const firestore = getFirestore(app)
export const auth = getAuth(app)

if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(firestore, 'localhost', 8080)
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
}
