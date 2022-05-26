export const ACCOUNT_TYPE = Object.freeze({
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  PARENT : 'PARENT'
})

// NOTE: Firestore のフィールドと対応するため、camelCase
export const LESSON_FIELD_NAME = Object.freeze({
  SUBJECT    : 'subject',
  TEACHERS   : 'teachers',
  STUDENTS   : 'students',
  SHEETS     : 'sheets',
  STARTED_AT : 'startedAt',
  FINISHED_AT: 'finishedAt',
})
