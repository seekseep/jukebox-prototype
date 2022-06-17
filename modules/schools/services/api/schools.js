import { addDoc, collection, doc, getDoc, runTransaction } from 'firebase/firestore'

import { firestore } from '@/firebase'
import { RESOURCE_TYPE } from '@/constants'

import { createResource, deleteResource, updateResource, docSnapshotToObject } from '@/services/api/utils'
import { getRolesRef } from '@/services/api/roles'

import { getAccountsRef } from '@schools/services/api/accounts'

export function getSchoolsRef () {
  return collection(firestore, '/schools')
}

export function getSchoolRef (schoolId) {
  const schoolsRef = getSchoolsRef(schoolId)
  return doc(schoolsRef, schoolId)
}

export async function setUpSchool (data, userRef) {
  return await runTransaction(firestore, async () => {
    const schoolsRef = getSchoolsRef()
    const schoolRef = await addDoc(schoolsRef, data)

    const userSnapshot = await getDoc(userRef)
    const user = docSnapshotToObject(userSnapshot)

    const schoolId = schoolRef.id
    const accountsRef = getAccountsRef(schoolId)
    const accountRef = await addDoc(accountsRef, {
      name: user.name,

    })

    const rolesRef = getRolesRef()
    await addDoc(rolesRef, {
      account     : accountRef,
      user        : userRef,
      resource    : schoolRef,
      resourceType: RESOURCE_TYPE.SCHOOL
    })

    const schoolSnapshot = await getDoc(schoolRef)
    return docSnapshotToObject(schoolSnapshot)
  })
}

export async function createSchool(data) {
  const schoolsRef = getSchoolsRef()
  return createResource(schoolsRef, data)
}

export async function updateSchool (schoolId, data) {
  const schoolRef = getSchoolRef(schoolId)
  return await updateResource(schoolRef, data)
}

export async function deleteSchool (schoolId) {
  const schoolRef = getSchoolRef(schoolId)
  return await deleteResource(schoolRef)
}
