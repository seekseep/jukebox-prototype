import { useMemo, useCallback } from 'react'

export function useIsActive (pathanme, currentPathname, exact = false) {
  const isActive = useMemo(() => {
    const _pathanme = pathanme.replace(/\/$/, '')
    const _currentPathname = currentPathname.replace(/\/$/, '')

    if (exact) return _pathanme === _currentPathname

    return !!new RegExp(`^${_pathanme}`).test(_currentPathname)
  }, [currentPathname, exact, pathanme])

  return isActive
}

export function useGetSchoolPath (schoolId) {
  return useCallback((pathname = '') => `/schools/${schoolId}${pathname}`, [schoolId])
}

export function useGetRoomPath(schoolId, roomId) {
  const getSchoolLink = useGetSchoolPath(schoolId)
  return useCallback((pathname = '') => getSchoolLink(`/rooms/${roomId}${pathname}`), [getSchoolLink, roomId])
}

export function useGetStudentPath(schoolId, roomId, studentId) {
  const getRoomPath = useGetRoomPath(schoolId, roomId)
  return useCallback((pathname = '') => getRoomPath(`/students/${studentId}${pathname}`), [getRoomPath, studentId])
}

export function useGetTeacherPath(schoolId, roomId, teacherId) {
  const getRoomPath = useGetRoomPath(schoolId, roomId)
  return useCallback((pathname = '') => getRoomPath(`/teachers/${teacherId}${pathname}`), [getRoomPath, teacherId])
}

export function useGetSheetPath(schoolId, roomId, sheetId) {
  const getRoomPath = useGetRoomPath(schoolId, roomId)
  return useCallback((pathname = '') => getRoomPath(`/sheets/${sheetId}${pathname}`), [getRoomPath, sheetId])
}

export function useGetSubjectPath(schoolId, roomId, subjectId) {
  const getRoomPath = useGetRoomPath(schoolId, roomId)
  return useCallback((pathname = '') => getRoomPath(`/subjects/${subjectId}${pathname}`), [getRoomPath, subjectId])
}

export function useGetLessonPath(schoolId, roomId, subjectId, lessonId) {
  const getSubjectPath = useGetSubjectPath(schoolId, roomId, subjectId)
  return useCallback((pathname = '') => getSubjectPath(`/lessons/${lessonId}${pathname}`), [getSubjectPath, lessonId])
}
