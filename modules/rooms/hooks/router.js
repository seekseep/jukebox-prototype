import { useMemo, useCallback } from 'react'

export function useIsActive (pathame, currentPathname, exact = false) {
  const isActive = useMemo(() => {
    const _pathame = pathame.replace(/\/$/, '')
    const _currentPathname = currentPathname.replace(/\/$/, '')

    if (exact) return _pathame === _currentPathname

    return !!new RegExp(`^${_pathame}`).test(_currentPathname)
  }, [currentPathname, exact, pathame])

  return isActive
}

export function useGetRoomPath(roomId) {
  return useCallback((pathname = '') => `/rooms/${roomId}${pathname}`, [roomId])
}

export function useGetStudentPath(roomId, studentId) {
  const getRoomPath = useGetRoomPath(roomId)
  return useCallback((pathname = '') => getRoomPath(`/students/${studentId}${pathname}`), [getRoomPath, studentId])
}

export function useGetTeacherPath(roomId, teacherId) {
  const getRoomPath = useGetRoomPath(roomId)
  return useCallback((pathname = '') => getRoomPath(`/teachers/${teacherId}${pathname}`), [getRoomPath, teacherId])
}

export function useGetSheetPath(roomId, sheetId) {
  const getRoomPath = useGetRoomPath(roomId)
  return useCallback((pathname = '') => getRoomPath(`/sheets/${sheetId}${pathname}`), [getRoomPath, sheetId])
}

export function useGetSubjectPath(roomId, subjectId) {
  const getRoomPath = useGetRoomPath(roomId)
  return useCallback((pathname = '') => getRoomPath(`/subjects/${subjectId}${pathname}`), [getRoomPath, subjectId])
}

export function useGetLessonPath(roomId, subjectId, lessonId) {
  const getSubjectPath = useGetSubjectPath(roomId, subjectId)
  return useCallback((pathname = '') => getSubjectPath(`/lessons/${lessonId}${pathname}`), [getSubjectPath, lessonId])
}
