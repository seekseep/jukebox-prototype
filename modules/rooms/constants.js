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

export const CALENDAR_TERM = Object.freeze({
  DAILY : 'DAILY',
  WEEKLY: 'WEEKLY',
})

export const CALENDAR_FORMAT = Object.freeze({
  TEACHER: 'TEACHER',
  DAY    : 'DAY',
})

export const REPEAT_TYPE = Object.freeze({
  NONE   : 'NONE',
  DAILY  : 'DAILY',
  WEEKLY : 'WEEKLY',
  MONTHLY: 'MONTHLY',
  YEARLY : 'YEARLY',
})

export const SCHEDULE_TYPE_LABEL = Object.freeze({
  AVAILABLE   : '利用可能',
  DISAVAILABLE: '利用不可能'
})

export const STUDENT_SCHEDULE_TYPE_LABEL = Object.freeze({
  AVAILABLE   : '登校可能',
  DISAVAILABLE: '休み'
})

export const TEACHER_SCHEDULE_TYPE_LABEL = Object.freeze({
  AVAILABLE   : '出勤可能',
  DISAVAILABLE: '休み'
})

export const SHEET_SCHEDULE_TYPE_LABEL = Object.freeze({
  AVAILABLE   : '利用可能',
  DISAVAILABLE: '利用不可能'
})

export const SCHEDULE_TYPE = Object.freeze({
  AVAILABLE   : 'AVAILABLE',
  DISAVAILABLE: 'DISAVAILABLE'
})
