import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '@/firebase'

import { createResource, updateResource, deleteResource } from './utils'

import { getStudentRef } from './students'
import { getTeacherRef } from './teachers'
import { getLessonsRef } from './lessons'


export function getSubjectsRef (roomId) {
  return collection(firestore, `/rooms/${roomId}/subjects`)
}

export function getSubjectRef (roomId, subjectId) {
  const subjectsRef = getSubjectsRef(roomId)
  return doc(subjectsRef, subjectId)
}

export async function createSubject(roomId, data) {
  const subjectsRef = getSubjectsRef(roomId)
  return await createResource(subjectsRef, data)
}

export async function updateSubject (roomId, subjectId, data, { marge = true } = { }) {
  const subjectRef = getSubjectRef(roomId, subjectId)
  return await updateResource(subjectRef, data, { marge })
}

export async function deleteSubject (roomId, subjectId) {
  const subjectRef = getSubjectRef(roomId, subjectId)
  return await deleteResource(subjectRef)
}

function lessonDocsToSubjectRefs (lessonDocs) {
  const subjectRefs = {}

  lessonDocs.forEach(doc => {
    subjectRefs[doc.id] = doc.ref
  })

  return Object.values(subjectRefs)
}

export async function getStudentSubjectRefs(roomId, studentId) {
  const lessonsRef = getLessonsRef(roomId)
  const studentRef = getStudentRef(roomId, studentId)

  const lessonsQuery = query(lessonsRef, where('students', 'array-contains', studentRef))
  const lessonsSnapshot = await getDocs(lessonsQuery)

  return lessonDocsToSubjectRefs(lessonsSnapshot.docs)
}

export async function getTeacherSubjectRefs(roomId, teacherId) {
  const lessonsRef = getLessonsRef(roomId)
  const teacherRef = getTeacherRef(roomId, teacherId)

  const lessonsQuery = query(lessonsRef, where('teachers', 'array-contains', teacherRef))
  const lessonsSnapshot = await getDocs(lessonsQuery)

  return lessonDocsToSubjectRefs(lessonsSnapshot.docs)
}
