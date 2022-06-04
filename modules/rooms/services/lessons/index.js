import { format, getDate, getMonth, getYear, add, getDay, nextSunday } from 'date-fns'
import locale from 'date-fns/locale/ja'

export function getLessonDateLabel(lesson) {
  const { startedAt } = lesson
  if (!startedAt) return '不明'
  return format(startedAt, 'yyyy年MM月dd日 HH:mm')
}

export function getEventDateDurationLabel(startedAt, finishedAt, isAllDay) {
  if (!finishedAt) {
    return `${format(startedAt, 'yyyy年MM月dd日')}${isAllDay ? ' 〜' : ''}`
  }

  if (getYear(startedAt) !== getYear(finishedAt)) {
    return `${format(startedAt, 'yyyy年MM月dd日')} 〜 ${format(startedAt, 'yyyy年MM月dd日')}`
  }

  if (getMonth(startedAt) !== getMonth(finishedAt)) {
    return `${format(startedAt, 'yyyy年MM月dd日')} 〜 ${format(finishedAt, 'MM月dd日')}`
  }

  if (getDate(startedAt) !== getDate(finishedAt)) {
    return `${format(startedAt, 'yyyy年MM月dd日')} 〜 ${format(finishedAt, 'dd日')}`
  }

  return `${format(startedAt, 'yyyy年MM月dd日')}`
}

export function getEventDurationLabel(startedAt, finishedAt, isAllDay = false) {
  if (!finishedAt) return `${format(startedAt, 'yyyy年MM月dd日')}`

  if (getYear(startedAt) !== getYear(finishedAt)) {
    if (isAllDay) return `${format(startedAt, 'yyyy年MM月dd日')} 〜 ${format(finishedAt, 'yyyy年MM月dd日')}`
    return `${format(startedAt, 'yyyy年MM月dd日 HH:mm')} 〜 ${format(finishedAt, 'yyyy年MM月dd日 HH:mm')}`
  }

  if (getMonth(startedAt) !== getMonth(finishedAt)) {
    if (isAllDay) return `${format(startedAt, 'yyyy年MM月dd日')} 〜 ${format(finishedAt, 'MM月dd日')}`
    return `${format(startedAt, 'yyyy年MM月dd日 HH:mm')} 〜 ${format(finishedAt, 'MM月dd日 HH:mm')}`
  }

  if (getDate(startedAt) !== getDate(finishedAt)) {
    if (isAllDay) return `${format(startedAt, 'yyyy年MM月dd日')} 〜 ${format(finishedAt, 'dd日')}`
    return `${format(startedAt, 'yyyy年MM月dd日 HH:mm')} 〜 ${format(finishedAt, 'dd日 HH:mm')}`
  }

  if (isAllDay) return `${format(startedAt, 'yyyy年MM月dd日')}`
  return `${format(startedAt, 'yyyy年MM月dd日 HH:mm')} 〜 ${format(finishedAt, 'HH:mm')}`
}

export function getLessonDateTimeLabel (lesson) {
  const { startedAt, finishedAt } = lesson
  return getEventDurationLabel(startedAt, finishedAt)
}

export function getDayTeacherLessonsSets (lessons, { startedAt, teachers, days }) {
  const dayTeacherLessonsSets = days.map((day) => {
    const teacherLessonsSets = teachers.reduce((teacherLessonsSets, teacher) => {
      return {
        ...teacherLessonsSets,
        [teacher.id]: {
          teacher,
          lessons: []
        }
      }
    }, {})

    return {
      date    : add(startedAt, { days: day }),
      teachers: teacherLessonsSets
    }
  })

  lessons.forEach((lesson) => {
    const day = getDay(lesson.startedAt)
    lesson.teachers.forEach(teacher => {
      dayTeacherLessonsSets[day].teachers[teacher.id].lessons.push(lesson)
    })
  })

  return Object.values(dayTeacherLessonsSets).map(({ date, teachers: teacherLessonsSets }) => {
    return {
      date,
      teachers: Object.values(teacherLessonsSets)
    }
  })
}

export function getTeacherDayLessonsSets (lessons, { days, startedAt, teachers }) {
  const teacherDayLessonsSets = {}

  teachers.forEach(teacher => {
    const dayLessonsSets = days.reduce((dayLessonsSets, day) => ({
      ...dayLessonsSets,
      [day]: {
        date   : add(startedAt, { days: day }),
        lessons: []
      }
    }), {})

    teacherDayLessonsSets[teacher.id] = {
      teacher,
      days: dayLessonsSets
    }
  })

  lessons.forEach((lesson) => {
    const day = getDay(lesson.startedAt)
    lesson.teachers.forEach(teacher => {
      teacherDayLessonsSets[teacher.id].days[day].lessons.push(lesson)
    })
  })

  return Object.values(teacherDayLessonsSets).map(({ teacher, days: dayLessonsSets }) => ({
    teacher,
    days: Object.values(dayLessonsSets)
  }))
}


export function getDayTeacherLessonsSet (lessons, { teachers, startedAt }) {
  const teacherLessonsSets = teachers.reduce((teacherLessonsSets, teacher) => {
    return {
      ...teacherLessonsSets,
      [teacher.id]: {
        teacher,
        lessons: []
      }
    }
  }, {})

  const dayTeacherLessonsSet = {
    date    : startedAt,
    teachers: teacherLessonsSets
  }

  lessons.forEach((lesson) => {
    lesson.teachers.forEach(teacher => {
      dayTeacherLessonsSet.teachers[teacher.id].lessons.push(lesson)
    })
  })

  return (({ date, teachers }) => ({
    date,
    teachers: Object.values(teachers)
  }))(dayTeacherLessonsSet)
}

export function getDayLabel (day, formatPattern = 'E') {
  const date = add(nextSunday(new Date()), { days: day })
  return format(date, formatPattern, { locale })
}
