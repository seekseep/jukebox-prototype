import { collection, doc, query, where, getDocs, orderBy } from 'firebase/firestore'
import { firestore } from '@/firebase'
import { getSubjectRef } from '@/services/api/rooms/subjects'
import { createResource, deleteResource, updateResource, querySnapshotToRefs } from '@/services/api/utils'

export function getLessonsRef (roomId) {
  return collection(firestore, `/rooms/${roomId}/lessons`)
}

export function getLessonRef (roomId, lessonId) {
  return doc(getLessonsRef(roomId), lessonId)
}

export async function getSubjectLessonRefs (roomId, subjectId) {
  const lessonsQuery = query(getLessonsRef(roomId), orderBy('startedAt'), where('subject', '==', getSubjectRef(roomId, subjectId)))
  const querySnapshot = await getDocs(lessonsQuery)
  return querySnapshotToRefs(querySnapshot)
}

export async function createLesson(roomId, data) {
  const lessonsRef = getLessonsRef(roomId)
  return await createResource(lessonsRef, data)
}

export async function updateLesson (roomId, lessonId, data) {
  const lessonRef = getLessonRef(roomId, lessonId)
  return await updateResource(lessonRef, data)
}

export async function deleteLesson (roomId, lessonId) {
  const lessonRef = getLessonRef(roomId, lessonId)
  return await deleteResource(lessonRef)
}
