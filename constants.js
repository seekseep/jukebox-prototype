export const AUTH_STATE = Object.freeze({
  LOADING     : 'LOADING',
  UNAUTHORIZED: 'UNAUTHORIZED',
  AUTHORIZED  : 'AUTHORIZED'
})

export const STUDENT_STATUS = Object.freeze({
  ALL      : 'ALL',
  ACTIVE   : 'ACTIVE',
  DISACTIVE: 'DISACTIVE'
})

export const SCHEDULE_RULE_TERM_TYPE = Object.freeze({
  DAILY  : 'DAILY',
  WEEKLY : 'WEEKLY',
  MONTHLY: 'MONTHLY'
})

export const SCHEDULE_TYPE = Object.freeze({
  AVAILABLE   : 'AVAILABLE',
  DISAVAILABLE: 'DISAVAILABLE'
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

export const SCHEDULE_UNIT_TERM = Object.freeze({
  DAILY  : 'DAILY',
  WEEKLY : 'WEEKLY',
  MONTHLY: 'MONTHLY'
})

export const SCHEDULE_STATUS = Object.freeze({
  UNSUBMITTED: 'UNSUBMITTED',
  SUBMITTED  : 'SUBMITTED',
  PUBLISHED  : 'PUBLISHED',
  ARCHIVED   : 'ARCHIVED',
})

export const WEEK_DAY = Object.freeze({
  SUNDAY   : 0,
  MONDAY   : 1,
  TUESDAY  : 2,
  WEDNESDAY: 3,
  THURSDAY : 4,
  FRIDAY   : 5,
  SATURDAY : 6
})

export const WEEK_DAY_ALL = -1

export const REPEAT_TYPE = Object.freeze({
  NONE   : 'NONE',
  DAILY  : 'DAILY',
  WEEKLY : 'WEEKLY',
  MONTHLY: 'MONTHLY',
  YEARLY : 'YEARLY',
  CUSOTM : 'CUSTOM'
})

export const ICON = Object.freeze({
  USER   : '👤',
  TEACHER: '👨‍🏫',
  STUDENT: '👩‍🎓',
  PARENT : '👪',
  SCHOOL : '🏫',
  ROOM   : '🚪',
  SUBJECT: '📕',
  LESSON : '📖',
  SHEET  : '🪑',
  ADMIN  : '🚧',
  FAMILY : '🏠'
})

export const RESOURCE_TYPE = Object.freeze({
  SCHOOL : 'SCHOOL',
  ROOM   : 'ROOM',
  STUDENT: 'STUDENT',
  PARENT : 'PARENT',
  TEACHER: 'TEACHER',
  SHEET  : 'SHEET',
  SUBJECT: 'SUBJECT',
  LESSON : 'LESSON',
})

export const RELATION_SCORE = Object.freeze({
  BEST  : 2,
  BETTER: 1,
  NORMAL: 0,
  WORTH : -1,
  WORST : -2,
})

export const GENDER_TYPE = Object.freeze({
  MALE  : 'MALE',
  FEMALE: 'FEMALE',
  OTHER : 'OTHER',
})

export const ROLE_TYPE = Object.freeze({})
