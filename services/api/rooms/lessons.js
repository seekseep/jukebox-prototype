import { format } from 'date-fns'
import { collection, doc, query, where, getDocs, orderBy, refEqual, writeBatch } from 'firebase/firestore'
import { firestore } from '@/firebase'
import { getSubjectRef } from '@/services/api/rooms/subjects'
import { createResource, deleteResource, updateResource, docSnapshotToObject, querySnapshotToObjects } from '@/services/api/utils'

import { getTeacherRef } from './teachers'
import { getStudentRef } from './students'
import { getSheetRef } from './sheets'

export function getLessonsRef (roomId) {
  return collection(firestore, `/rooms/${roomId}/lessons`)
}

export function getLessonRef (roomId, lessonId) {
  return doc(getLessonsRef(roomId), lessonId)
}

export async function getSubjectLessonRefs (roomId, subjectId) {
  const lessonsQuery = query(getLessonsRef(roomId), orderBy('startedAt'), where('subject', '==', getSubjectRef(roomId, subjectId)))
  const querySnapshot = await getDocs(lessonsQuery)
  return querySnapshotToObjects(querySnapshot)
}

export async function createLesson(roomId, data) {
  const lessonsRef = getLessonsRef(roomId)
  return await createResource(lessonsRef, data)
}

export async function updateLesson (roomId, lessonId, data) {
  const lessonRef = getLessonRef(roomId, lessonId)
  return await updateResource(lessonRef, data)
}

export async function updateLessons (roomId, lessons) {
  const batch = writeBatch(firestore)

  for (let { id: lessonId, ...lesson } of lessons) {
    const lessonRef = getLessonRef(roomId, lessonId)
    batch.update(lessonRef, lesson)
  }

  return await batch.commit()
}

export async function deleteLesson (roomId, lessonId) {
  const lessonRef = getLessonRef(roomId, lessonId)
  return await deleteResource(lessonRef)
}

function createCheckLesson (roomId, options) {
  const subjectRefs = options?.subjects?.split(',').map(subjectId => getSubjectRef(roomId, subjectId)) || null
  const teacherRefs = options?.teachers?.split(',').map(teacherId => getTeacherRef(roomId, teacherId)) || null
  const studentRefs = options?.students?.split(',').map(studentId => getStudentRef(roomId, studentId)) || null
  const sheetRefs = options?.sheets?.split(',').map(sheetId => getSheetRef(roomId, sheetId)) || null
  const startedAt = options?.startedAt ? new Date(options.startedAt) : null
  const finishedAt = options?.finishedAt ? new Date(options.finishedAt) : null
  const isAll = !(!subjectRefs || !teacherRefs || !studentRefs || !sheetRefs || !startedAt || !finishedAt)

  return function checkLesson(lesson) {
    if (isAll) return true

    if (subjectRefs && !subjectRefs.some(subjectRef => refEqual(lesson.subject, subjectRef))) return false
    if (teacherRefs && !lesson.teachers.some(lessonTeacherRef => teacherRefs.some(teacherRef => refEqual(lessonTeacherRef, teacherRef)))) return false
    if (studentRefs && !lesson.students.some(lessonStudentRef => studentRefs.some(studentRef => refEqual(lessonStudentRef, studentRef)))) return false
    if (sheetRefs && !lesson.sheets.some(lessonSheetRef => sheetRefs.some(sheetRef => refEqual(lessonSheetRef, sheetRef)))) return false
    if (startedAt && (lesson.startedAt < startedAt)) return false
    if (finishedAt && (lesson.finishedAt > finishedAt)) return false

    return true
  }
}

export async function searchLessonRefs(roomId, options) {
  const lessonsRef = getLessonsRef(roomId)
  const lessonsQueryConstraint = [
    orderBy('startedAt', 'asc')
  ]
  const checkLesson = createCheckLesson(roomId, options)
  const lessonsQuery = query(lessonsRef, ...lessonsQueryConstraint)
  const lessonsQuerySnapshot = await getDocs(lessonsQuery)
  const lessonRefs = []
  for (let lessonSnapshot of lessonsQuerySnapshot.docs) {
    const lesson = docSnapshotToObject(lessonSnapshot)
    if (!checkLesson(lesson)) continue
    lessonRefs.push(lessonSnapshot.ref)
  }
  return lessonRefs
}

export async function searchLessons(roomId, options) {
  const lessonsRef = getLessonsRef(roomId)
  const lessonsQueryConstraint = [
    orderBy('startedAt', 'asc')
  ]
  const checkLesson = createCheckLesson(roomId, options)
  const lessonsQuery = query(lessonsRef, ...lessonsQueryConstraint)
  const lessonsQuerySnapshot = await getDocs(lessonsQuery)
  const lessons = []
  for (let lessonSnapshot of lessonsQuerySnapshot.docs) {
    const lesson = docSnapshotToObject(lessonSnapshot)
    if (!checkLesson(lesson)) continue
    lessons.push(lesson)
  }
  return lessons
}
