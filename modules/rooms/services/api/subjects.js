import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '@/firebase'

import { createResource, updateResource, deleteResource, docSnapshotToObject } from '@/services/api/utils'

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

function lessonDocsToSubjects (lessonDocs) {
  const subjects = {}

  lessonDocs.forEach(doc => {
    subjects[doc.id] = docSnapshotToObject(doc)
  })

  return Object.values(subjects)
}

export async function getStudentSubjects(roomId, studentId) {
  const lessonsRef = getLessonsRef(roomId)
  const studentRef = getStudentRef(roomId, studentId)

  const lessonsQuery = query(lessonsRef, where('students', 'array-contains', studentRef))
  const lessonsSnapshot = await getDocs(lessonsQuery)

  return lessonDocsToSubjects(lessonsSnapshot.docs)
}

export async function getTeacherSubjects(roomId, teacherId) {
  const lessonsRef = getLessonsRef(roomId)
  const teacherRef = getTeacherRef(roomId, teacherId)

  const lessonsQuery = query(lessonsRef, where('teachers', 'array-contains', teacherRef))
  const lessonsSnapshot = await getDocs(lessonsQuery)

  return lessonDocsToSubjects(lessonsSnapshot.docs)
}
