import {
  getFirestore,
  collection, doc,
  getDoc, addDoc, updateDoc, deleteDoc
} from 'firebase/firestore'

import { app } from '../../firebase'

import { docToData } from './utils'

export function getLessonsRef (schoolId, roomId, subjectId) {
  const firestore = getFirestore(app)
  return collection(firestore, `schools/${schoolId}/rooms/${roomId}/subjects/${subjectId}/lessons`)
}

export function getLessonRef (schoolId, roomId, subjectId, lessonId) {
  const lessonsRef = getLessonsRef(schoolId, roomId, subjectId)
  return doc(lessonsRef, lessonId)
}

export async function getLesson(schoolId, roomId, subjectId, lessonId) {
  const lessonRef = getLessonRef(schoolId, roomId, subjectId, lessonId)
  const lessonSnapshot = await getDoc(lessonRef)
  const {
    students,
    teachers,
    sheets,
    ...lesson
  } = docToData(lessonSnapshot)

  lesson.students = []
  if (students) {
    for (let studentRef of students) {
      const studentSnapshot = await getDoc(studentRef)
      const student = docToData(studentSnapshot)
      lesson.students.push(student)
    }
  }

  lesson.teachers = []
  if (teachers) {
    for (let teacherRef of teachers) {
      const teacherSnapshot = await getDoc(teacherRef)
      const teacher = docToData(teacherSnapshot)
      lesson.teachers.push(teacher)
    }
  }

  lesson.sheets = []
  if (sheets) {
    for (let sheetRef of sheets) {
      const sheetSnapshot = await getDoc(sheetRef)
      const sheet = docToData(sheetSnapshot)
      lesson.sheets.push(sheet)
    }
  }

  return lesson
}


export async function createLesson(schoolId, roomId, subjectId, data) {
  const lessonsRef = getLessonsRef(schoolId, roomId, subjectId)

  const lessonRef = await addDoc(lessonsRef, data)

  const lessonSnapshot = await getDoc(lessonRef)
  const createdLesson = docToData(lessonSnapshot)

  return createdLesson
}

export async function updateLesson (schoolId, roomId, subjectId, lessonId, data, { merge = true } = { }) {
  const lessonRef = getLessonRef(schoolId, roomId, subjectId, lessonId)

  await updateDoc(lessonRef, data, { merge })

  const lessonSnapshot = await getDoc(lessonRef)
  const updatedLesson = docToData(lessonSnapshot)

  return updatedLesson
}

export async function deleteLesson (schoolId, roomId, subjectId, lessonId) {
  const lessonRef = getLessonRef(schoolId, roomId, subjectId, lessonId)

  await deleteDoc(lessonRef)

  return null
}
