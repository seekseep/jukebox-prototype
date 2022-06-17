import { collection, doc } from 'firebase/firestore'
import { firestore } from '@/firebase'
import { createResource, deleteResource, updateResource } from '@/services/api/utils'

export function getLessonFramesRef (roomId) {
  return collection(firestore, `rooms/${roomId}/lessonFrames`)
}

export function getLessonFrameRef (roomId, lessonFrameId) {
  const lessonframesRef = getLessonFramesRef(roomId)
  return doc(lessonframesRef, lessonFrameId)
}

export async function createLessonFrame(roomId, data) {
  const lessonframesRef = getLessonFramesRef(roomId)
  return await createResource(lessonframesRef, data)
}

export async function updateLessonFrame (roomId, lessonFrameId, data) {
  const lessonFrameRef = getLessonFrameRef(roomId, lessonFrameId)
  return await updateResource(lessonFrameRef, data)
}

export async function deleteLessonFrame (roomId, lessonFrameId) {
  const lessonFrameRef = getLessonFrameRef(roomId, lessonFrameId)
  return await deleteResource(lessonFrameRef)
}
