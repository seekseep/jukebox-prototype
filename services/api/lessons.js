import {
  collection, doc,
  query, where,
  getDoc, getDocs
} from 'firebase/firestore'

import { firestore } from '../../firebase'
import { getSubjectRef } from './subjects'

import {
  docSnapshotToData,
  collectionSnapshotToDataArray,
  createResource,
  updateResource,
  deleteResource
} from './utils'

export function getLessonRef (roomId, lessonId) {
  const lessonsRef = getLessonsRef(roomId)
  return doc(lessonsRef, lessonId)
}

export async function createLesson(roomId, data) {
  const lessonsRef = getLessonsRef(roomId)
  return await createResource(lessonsRef, data)
}

export async function updateLesson (roomId, lessonId, data, { marge = true } = { }) {
  const lessonRef = getLessonRef(roomId, lessonId)
  return await updateResource(lessonRef, data, { marge })
}

export async function deleteLesson (roomId, lessonId) {
  const lessonRef = getLessonRef(roomId, lessonId)
  return await deleteResource(lessonRef)
}

async function getReferedSubject(subjectRef) {
  if(!subjectRef) return null
  const subjectSnapshot = await getDoc(subjectRef)
  const subject = docSnapshotToData(subjectSnapshot)
  return subject
}

async function getReferedStudents (students = []) {
  const referedStudents = []
  for (let studentRef of students) {
    const studentSnapshot = await getDoc(studentRef)
    const student = docSnapshotToData(studentSnapshot)
    referedStudents.push(student)
  }
  return referedStudents
}

async function getReferedTeachers (teachers = []) {
  const referedTeachers = []
  for (let teacherRef of teachers) {
    const teacherSnapshot = await getDoc(teacherRef)
    const teacher = docSnapshotToData(teacherSnapshot)
    referedTeachers.push(teacher)
  }
  return referedTeachers
}

async function getReferedSheets (sheets = []) {
  const referedSheets = []
  for (let sheetRef of sheets) {
    const sheetSnapshot = await getDoc(sheetRef)
    const sheet = docSnapshotToData(sheetSnapshot)
    referedSheets.push(sheet)
  }
  return referedSheets
}

export function getLessonsRef (roomId) {
  return collection(firestore, `rooms/${roomId}/lessons`)
}

export async function getSubjectLessons(roomId, subjectId) {
  const lessonsRef = getLessonsRef(roomId)
  const subjectRef = getSubjectRef(roomId, subjectId)
  const subjectLessonQuery = query(lessonsRef ,where('subject', '==', subjectRef))
  const snapshot = await getDocs(subjectLessonQuery)
  return collectionSnapshotToDataArray(snapshot)
}

export async function getLessons(roomId)  {
  const lessonsRef = getLessonsRef(roomId)
  const lessonsSnapshot = await getDocs(lessonsRef)

  const lessons = []

  for (let lessonSnapshot of lessonsSnapshot.docs) {
    const lesson = docSnapshotToData(lessonSnapshot)
    lesson.subject = await getReferedSubject(lesson.subject)
    lesson.students = await getReferedStudents(lesson.students)
    lesson.teachers = await getReferedTeachers(lesson.teachers)
    lesson.sheets = await getReferedSheets(lesson.sheets)
    lessons.push(lesson)
  }

  return lessons
}

export async function getLesson(roomId, lessonId) {
  const lessonRef = getLessonRef(roomId, lessonId)
  const lessonSnapshot = await getDoc(lessonRef)
  const lesson = docSnapshotToData(lessonSnapshot)

  lesson.subject = await getReferedSubject(lesson.subject)
  lesson.students = await getReferedStudents(lesson.students)
  lesson.teachers = await getReferedTeachers(lesson.teachers)
  lesson.sheets = await getReferedSheets(lesson.sheets)

  return lesson
}
