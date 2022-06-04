import { REPEAT_TYPE } from '@rooms/constants'
import { add } from 'date-fns'

export function createLessons({ subject, students, teachers, sheets, startedAt, finishedAt, repeat, repeatCount }) {
  switch (repeat) {
    case REPEAT_TYPE.DAILY:
      return createDailyLessons({ subject, students, teachers, sheets, startedAt, finishedAt, repeatCount })
    case REPEAT_TYPE.WEEKLY:
      return createWeeklyLessons({ subject, students, teachers, sheets, startedAt, finishedAt, repeatCount })
    case REPEAT_TYPE.MONTHLY:
      return createMonthlyLessons({ subject, students, teachers, sheets, startedAt, finishedAt, repeatCount })
    case REPEAT_TYPE.YEARLY:
      return createYearlyLessons({ subject, students, teachers, sheets, startedAt, finishedAt, repeatCount })
    case REPEAT_TYPE.NONE:
    default:
      return [createLesson({ subject, students, teachers, sheets, startedAt, finishedAt, repeatCount })]
  }
}

export function createLesson ({ subject, teachers, sheets, students, startedAt, finishedAt }) {
  return { subject, students, teachers, sheets, startedAt, finishedAt }
}

export function createDailyLessons ({ subject, teachers, students, sheets, startedAt, finishedAt, repeatCount }) {
  const lessons = []
  for (let i = 0; i < repeatCount; i++) {
    lessons.push(createLesson({
      subject,
      students,
      teachers,
      sheets,
      startedAt : add(startedAt, { days: i }),
      finishedAt: add(finishedAt, { days: i }),
    }))
  }
  return lessons
}

export function createWeeklyLessons ({ subject, teachers, students, sheets, startedAt, finishedAt, repeatCount }) {
  const lessons = []
  for (let i = 0; i < repeatCount; i++) {
    lessons.push(createLesson({
      subject,
      students,
      teachers,
      sheets,
      startedAt : add(startedAt, { weeks: i }),
      finishedAt: add(finishedAt, { weeks: i }),
    }))
  }
  return lessons
}

export function createMonthlyLessons ({ subject, teachers, students, sheets, startedAt, finishedAt, repeatCount }) {
  const lessons = []
  for (let i = 0; i < repeatCount; i++) {
    lessons.push(createLesson({
      subject,
      students,
      teachers,
      sheets,
      startedAt : add(startedAt, { months: i }),
      finishedAt: add(finishedAt, { months: i }),
    }))
  }
  return lessons
}

export function createYearlyLessons  ({ subject, teachers, students, sheets, startedAt, finishedAt, repeatCount }) {
  const lessons = []
  for (let i = 0; i < repeatCount; i++) {
    lessons.push(createLesson({
      subject,
      students,
      teachers,
      sheets,
      startedAt : add(startedAt, { years: i }),
      finishedAt: add(finishedAt, { years: i }),
    }))
  }
  return lessons
}
