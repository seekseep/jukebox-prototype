import { firestore } from '@/firebase'
import { collection } from 'firebase/firestore'

export function getAccountsRef(schoolId) {
  return collection(firestore, `/schools/${schoolId}/accounts`)
}
