import { LESSON_VALIDITY, REPEAT_TYPE, SCHEDULE_TYPE } from '@rooms/constants'
import { format, getDate, getDay } from 'date-fns'

const { INVALID, VALID, UNCERTAIN } = LESSON_VALIDITY

export const TEACHER_MAX_PARALLEL_LESSONS = 3
export const STUDENT_MAX_PARALLEL_LESSONS = 1
export const SHEET_MAX_PARALLEL_LESSONS = 1

class LessonValidity {
  constructor () {
    this.validity = LESSON_VALIDITY.UNCERTAIN
    this.messages = []
  }

  setValidity (validity) {
    if (this.validity === INVALID) {
      return
    }
    this.validity = validity
  }

  append (message, validity) {
    this.messages.push(message)
    this.setValidity(validity)
  }

  uncertain (message) {
    this.append(message, LESSON_VALIDITY.UNCERTAIN)
  }

  invalid (message) {
    this.append(message, LESSON_VALIDITY.INVALID)
  }
}

function isAffectiveNoneRepeatSchedule(lesson, schedule) {
  switch (schedule.type) {
    // NOTE: 完全に含まれていたら
    case SCHEDULE_TYPE.AVAILABLE:
      return (
        schedule.startedAt <= lesson.startedAt
        && lesson.finishedAt <= schedule.finishedAt
      )
    // NOTE: 少しでも重なっていたら
    case SCHEDULE_TYPE.DISAVAILABLE:
      const isNotAffective = (
        lesson.finishedAt < schedule.startedAt
        || schedule.finishedAt < lesson.startedAt
      )
      return isNotAffective === false
    default:
      return false
  }
}

function getHourValue(string) {
  const [hours, minutes] = string.split(':').map(Number)
  return hours + minutes / 60
}

function isAffectiveRepeatSchedule (lesson, schedule) {

  console.log('isAffectiveRepeatSchedule')
  const lessonStartTime = getHourValue(format(lesson.startedAt, 'HH:mm'))
  const lessonFinishTime = getHourValue(format(lesson.finishedAt, 'HH:mm'))
  const scheduleStartTime = getHourValue(schedule.repeatStartTime)
  const scheduleFinishTime = getHourValue(schedule.repeatFinishTime)

  switch (schedule.type) {
    // NOTE: 完全に含まれていたら
    case SCHEDULE_TYPE.AVAILABLE: {
      // NOTE: 繰り返し期間の有効性
      const isRepeatAvailable = (
        schedule.repeatStartDate <= lesson.startedAt
        && (
          schedule.repeatFinishDate === null
          || lesson.finishedAt <= schedule.repeatFinishDate
        )
      )
      // NOTE: 繰り返し時間の有効性
      const isTimeAvailable = scheduleStartTime <= lessonStartTime && lessonFinishTime < scheduleFinishTime
      return isRepeatAvailable && isTimeAvailable
    }
    // NOTE: 少しでも重なっていたら
    case SCHEDULE_TYPE.DISAVAILABLE: {
      // NOTE: 繰り返し期間の有効性
      const isNotRepeatAvailable = (
        schedule.repeatFinishDate !== null && schedule.repeatFinishDate < lesson.startedAt
        || lesson.finishedAt < schedule.repeatStartDate
      )
      const isRepeatAvailable = isNotRepeatAvailable === false

      // NOTE: 繰り返し時間の有効性
      const isNotTimeAvailable = (
        scheduleFinishTime < lessonStartTime
        || lesson.finishTime < scheduleStartTime
      )
      const isTimeAvailable = isNotTimeAvailable === false

      return isRepeatAvailable && isTimeAvailable
    }
    default:
      return false
  }
}


function isAffectiveDailyRepeatSchedule(lesson, schedule) {
  if (!isAffectiveRepeatSchedule(lesson, schedule)) return false
  // NOTE: 他の関数と処理を比較するために、開業などを揃える
  return true
}

function isAffectiveWeeklyRepeatSchedule(lesson, schedule) {
  if (!isAffectiveRepeatSchedule(lesson, schedule)) return false
  return schedule.repeatIndexes.some(day => day === getDay(lesson.startedAt))
}

function isAffectiveMonthRepeatSchedule(lesson, schedule) {
  if (!isAffectiveRepeatSchedule(lesson, schedule)) return false
  return schedule.repeatIndexes.some(index => index + 1 === getDate(lesson.startedAt))
}

function isAffectiveSchedule(lesson, schedule) {
  switch (schedule.repeat) {
    case REPEAT_TYPE.NONE:
      return isAffectiveNoneRepeatSchedule(lesson, schedule)
    case REPEAT_TYPE.DAILY:
      return isAffectiveDailyRepeatSchedule(lesson, schedule)
    case REPEAT_TYPE.WEEKLY:
      return isAffectiveWeeklyRepeatSchedule(lesson, schedule)
    case REPEAT_TYPE.MONTHLY:
      return isAffectiveMonthRepeatSchedule(lesson, schedule)
    case REPEAT_TYPE.YEARLY:
    default:
      return false
  }
}

function getAccountAvailability (lesson, accountSchedules) {
  const whiteSchedules = []
  const blackSchedules = []

  accountSchedules.forEach((schedule) => {
    if (!isAffectiveSchedule(lesson, schedule)) return

    switch (schedule.type) {
      case SCHEDULE_TYPE.AVAILABLE:
      whiteSchedules.push(schedule)
      return
      case SCHEDULE_TYPE.DISAVAILABLE:
      blackSchedules.push(schedule)
      return
      default:
        return
    }
  })

  if (blackSchedules.length > 0) return false
  if (whiteSchedules.length < 1) return null
  return true
}

export function getLessonValidity (lesson, { lessons, accounts, sheets, relations, schedules }) {
  const lessonValidity = new LessonValidity()

  if (
    !lesson
    || !lessons
    || !accounts
    || !sheets
    || !relations
    || !schedules
  ) {

    lessonValidity.uncertain('検証中')
    return lessonValidity
  }
  console.group('授業の妥当性確認')

  const accountsMap = {}
  accounts.forEach(account => {
    accountsMap[account.id] = account
  })

  // NOTE: 関係性のインデックス
  const accountRelationsMap = {}
  relations.forEach((relation) => {
    accountRelationsMap[relation.departure.id] = accountRelationsMap[relation.departure.id] || {}
    accountRelationsMap[relation.departure.id][relation.destination.id] = relation
  })
  console.log('関係性のインデックス')
  console.log(accountRelationsMap)

  // NOTE: 予定のインデックス
  const resourceScheduleMap = {}
  schedules.forEach((schedule) => {
    resourceScheduleMap[schedule.resource.id] = resourceScheduleMap[schedule.resource.id] || []
    resourceScheduleMap[schedule.resource.id].push(schedule)
  })
  console.log('予定のインデックス')
  console.log(resourceScheduleMap)

  // NOTE: 並列する授業
  const parallelLessons = lessons.filter((l) => {
    return (
      (lesson.startedAt <= l.startedAt && l.startedAt <= lesson.finishedAt)
      || (lesson.startedAt <= l.finished && l.finished <= lesson.finishedAt)
    )
  })
  console.log('並列した授業')
  console.log(parallelLessons)

  // NOTE: 講師の妥当性
  console.group('講師の妥当性')
  lesson.teachers.forEach((teacherRef) => {
    const teacherId = teacherRef.id
    const teacher = accountsMap[teacherId]

    const teacherSchedules = resourceScheduleMap[teacher.id]
    const availabilty = getAccountAvailability(lesson, teacherSchedules)
    if (availabilty === false) {
      lessonValidity.invalid('講師が時間出勤していません')
    } else if (availabilty === null) {
      lessonValidity.uncertain('出勤しているか不明です')
    }

    // TODO: 授業の種別によって妥当性の確認の方法を調整する。個別授業・一斉授業
    const teacherParallelLessons = parallelLessons.filter(lesson => {
      return lesson.teachers.some(teacherRef => teacherRef.id === teacherId)
    })
    console.log(`同時に講師(${teacher.name})が担当してる授業`)
    console.log(teacherParallelLessons)

    if (teacherParallelLessons.length > TEACHER_MAX_PARALLEL_LESSONS) {
      lessonValidity.invalid('講師の最大並列授業数を上回っています')
    }

    // NOTE: 同時に授業を行っている人
    const coexisttingAccounts = Object.values(
      teacherParallelLessons.reduce((coexisttingAccounts, lesson) => {
        lesson.teachers.forEach((teacherRef) => {
          coexisttingAccounts[teacherRef.id] = accountsMap[teacherRef.id]
        })
        lesson.students.forEach((studentRef) => {
          coexisttingAccounts[studentRef.id] = accountsMap[studentRef.id]
        })
        return coexisttingAccounts
      }, {})
    )
    console.log('同時に授業を行っている人')
    console.log(coexisttingAccounts)
    coexisttingAccounts.forEach(account => {
      const relation = accountRelationsMap[teacher.id][account.id]
      if (!relation) return

      if (relation.score < 0) {
        lessonValidity.invalid(`${account.name}との関係が悪いです${relation.comment ? `(${relation.comment})` : ''}`)
      }
    })
  })
  console.groupEnd('講師の妥当性')


  // NOTE: 生徒の妥当性


  // NOTE: 席の妥当性


  console.groupEnd('授業の妥当性確認')
  return lessonValidity
}
