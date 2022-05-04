import {
  getFirestore,
  collection, doc,
  getDoc, getDocs, addDoc, updateDoc, deleteDoc,
  arrayUnion, Timestamp
} from 'firebase/firestore'

import { app } from '../../firebase'

import { docToData } from './utils'

import { getLessonsRef } from './lessons'

export function getSubjectsRef (schoolId, roomId) {
  const firestore = getFirestore(app)
  return collection(firestore, `schools/${schoolId}/rooms/${roomId}/subjects`)
}

export function getSubjectRef (schoolId, roomId, subjectId) {
  const subjectsRef = getSubjectsRef(schoolId, roomId)
  return doc(subjectsRef, subjectId)
}

export async function createSubject(schoolId, roomId, data) {
  const subjectsRef = getSubjectsRef(schoolId, roomId)

  const subjectRef = await addDoc(subjectsRef, data)

  const subjectSnapshot = await getDoc(subjectRef)
  const createdSubject = docToData(subjectSnapshot)

  return createdSubject
}

export async function updateSubject (schoolId, roomId, subjectId, data, { merge = true } = { }) {
  const subjectRef = getSubjectRef(schoolId, roomId, subjectId)

  await updateDoc(subjectRef, data, { merge })

  const subjectSnapshot = await getDoc(subjectRef)
  const updatedSubject = docToData(subjectSnapshot)

  return updatedSubject
}

export async function deleteSubject (schoolId, roomId, subjectId) {
  const subjectRef = getSubjectRef(schoolId, roomId, subjectId)

  await deleteDoc(subjectRef)

  return null
}

export async function getSubjectStudents (schoolId, roomId, subjectId) {
  const subjectRef = getSubjectRef(schoolId, roomId, subjectId)
  const subjectSnapshot = await getDoc(subjectRef)
  const subject = docToData(subjectSnapshot)

  if (!subject.students) return []

  const students = []
  for (let studentRef of subject.students) {
    const studentSnapshot = await getDoc(studentRef)
    const student = docToData(studentSnapshot)
    students.push(student)
  }

  return students
}

export async function getSubjectsIncludingLessons(schoolId, roomId) {
  const subjects = []

  const subjectsRef = getSubjectsRef(schoolId, roomId)
  const { docs: subjectDocs } = await getDocs(subjectsRef)

  for (let subjectDoc of subjectDocs) {
    const subject = docToData(subjectDoc)
    const lessonsRef = getLessonsRef(schoolId, roomId, subject.id)
    const { docs: lessonDocs } = await getDocs(lessonsRef)
    subject.lessons = lessonDocs.map(lessonDoc => docToData(lessonDoc))
    subjects.push(subject)
  }

  return subjects
}

export async function getSubjectIncludingBasic (schoolId, roomId, subjectId) {
  const subjectRef = getSubjectRef(schoolId, roomId, subjectId)
  const doc = await getDoc(subjectRef)
  const subject = docToData(doc)

  const students = []
  for (let studentRef of subject.students) {
    const studentDoc = await getDoc(studentRef)
    students.push(docToData(studentDoc))
  }
  subject.students = students

  const teachers = []
  for (let teacherRef of subject.teachers) {
    const teacherDoc = await getDoc(teacherRef)
    teachers.push(docToData(teacherDoc))
  }
  subject.teachers = teachers

  const scheduleRef = await getDoc(subject.schedule)
  const schedule = docToData(scheduleRef)
  subject.schedule = schedule

  const frameRulesSetDoc = await getDoc(subject.frameRulesSet)
  const frameRulesSet = docToData(frameRulesSetDoc)
  subject.frameRulesSet = frameRulesSet

  return subject
}


export async function appendLessonToSubject(schoolId, roomId, subjectId, lesson, { merge = true } = {}) {
  const subjectRef = getSubjectRef(schoolId, roomId, subjectId)

  lesson.startedAt = Timestamp.fromDate(lesson.startedAt)
  lesson.finishedAt = Timestamp.fromDate(lesson.finishedAt)

  await updateDoc(subjectRef, {
    lessons: arrayUnion(lesson)
  }, { merge })

  const subjectSnapshot = await getDoc(subjectRef)
  const updatedSubject = docToData(subjectSnapshot)

  return updatedSubject
}
