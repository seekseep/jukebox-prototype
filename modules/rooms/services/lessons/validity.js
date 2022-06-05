import { LESSON_VALIDITY, REPEAT_TYPE, SCHEDULE_TYPE } from '@rooms/constants'
import { format, getDate, getDay } from 'date-fns'

const { INVALID, VALID, UNCERTAIN } = LESSON_VALIDITY

export const TEACHER_MAX_PARALLEL_LESSONS = 3
export const STUDENT_MAX_PARALLEL_LESSONS = 1
export const SHEET_MAX_PARALLEL_LESSONS = 1

class LessonValidity {
  constructor () {
    this.validity = VALID
    this.messages = []
  }

  setValidity (validity) {
    if (this.validity === INVALID) {
      return
    }
    this.validity = validity
  }

  append (message, validity) {
    console.info(validity, message)
    this.messages.push(message)
    this.setValidity(validity)
  }

  uncertain (message) {
    this.append(message, UNCERTAIN)
  }

  invalid (message) {
    this.append(message, INVALID)
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

function getAccountAvailability (lesson, accountSchedules = []) {
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
  return true
}

function getAccountsMap (accounts) {
  const accountsMap = {}
  accounts.forEach(account => {
    accountsMap[account.id] = account
  })
  return accountsMap
}

function getAccountRelationsMap (relations) {
  const accountRelationsMap = {}
  relations.forEach((relation) => {
    accountRelationsMap[relation.departure.id] = accountRelationsMap[relation.departure.id] || {}
    accountRelationsMap[relation.departure.id][relation.destination.id] = relation
  })
  return accountRelationsMap
}

function getResourceSchedulesMap (schedules) {
  const resourceSchedulesMap = {}
  schedules.forEach((schedule) => {
    resourceSchedulesMap[schedule.resource.id] = resourceSchedulesMap[schedule.resource.id] || []
    resourceSchedulesMap[schedule.resource.id].push(schedule)
  })
  return resourceSchedulesMap
}

function getParallelLessons (lesson, lessons) {
  const parallelLessons = lessons.filter((l) => {
    return (
      (lesson.startedAt <= l.startedAt && l.startedAt <= lesson.finishedAt)
      || (lesson.startedAt <= l.finished && l.finished <= lesson.finishedAt)
    )
  })
  return parallelLessons
}

function getSheetsMap (sheets) {
  const sheetsMap = {}
  sheets.forEach(sheet => {
    sheetsMap[sheet.id] = sheet
  })
  return sheetsMap
}

function getAccountsFromLessons (lessons, accountsMap) {
  return Object.values(
    lessons.reduce((coexisttingAccounts, lesson) => {
      lesson.teachers.forEach((teacherRef) => {
        coexisttingAccounts[teacherRef.id] = accountsMap[teacherRef.id]
      })
      lesson.students.forEach((studentRef) => {
        coexisttingAccounts[studentRef.id] = accountsMap[studentRef.id]
      })
      return coexisttingAccounts
    }, {})
  )
}

function getAccountRelations (departureAccount, destinationAccounts, accountRelationsMap) {
  const accountRelations = []

  destinationAccounts.forEach(destinationAccount => {
    const departureAccountRelations = accountRelationsMap[departureAccount.id] || {}
    const relation = departureAccountRelations[destinationAccount.id]
    if (!relation) return
    accountRelations.push({
      account : destinationAccount,
      relation: relation
    })
  })

  return accountRelations
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

  // NOTE: 各リソースのインデックス
  const accountsMap = getAccountsMap(accounts)
  const sheetsMap = getSheetsMap(sheets)
  const accountRelationsMap = getAccountRelationsMap(relations)
  const resourceSchedulesMap = getResourceSchedulesMap(schedules)

  // NOTE: 並列する授業
  const parallelLessons = getParallelLessons(lesson, lessons)

  // NOTE: 講師の妥当性
  console.group('講師の妥当性')
  lesson.teachers.forEach((teacherRef) => {
    const teacher = accountsMap[teacherRef.id]

    // NOTE: 出勤予定の確認
    const teacherSchedules = resourceSchedulesMap[teacher.id]
    const availabilty = getAccountAvailability(lesson, teacherSchedules)
    if (availabilty === false) {
      lessonValidity.invalid('講師が出勤する予定がありません')
    }

    // NOTE: 同時指導可能授業数の確認
    const teacherParallelLessons = parallelLessons.filter(lesson => {
      // TODO: 授業の種別によって妥当性の確認の方法を調整する。個別授業・一斉授業
      return lesson.teachers.some(teacherRef => teacherRef.id === teacher.id)
    })
    if (teacherParallelLessons.length > TEACHER_MAX_PARALLEL_LESSONS) {
      lessonValidity.invalid('講師の最大並列授業数を上回っています')
    }

    // NOTE: 講師から見た授業参加者の確認
    const coexisttingAccounts = getAccountsFromLessons(teacherParallelLessons, accountsMap)
    const coexisttingAccountRelations = getAccountRelations(teacher, coexisttingAccounts, accountRelationsMap)
    coexisttingAccountRelations.forEach(({ relation, account }) => {
      if (relation.score > 0) return
      lessonValidity.invalid(`${teacher.name}は${account.name}との関係が悪いです${relation.comment ? `(${relation.comment})` : ''}`)
    })
  })
  console.groupEnd('講師の妥当性')

  // NOTE: 生徒の妥当性
  console.group('生徒の妥当性')
  lesson.students.forEach((studentRef) => {
    const student = accountsMap[studentRef.id]

    // NOTE: 出勤予定の確認
    const studentSchedules = resourceSchedulesMap[student.id]
    const availabilty = getAccountAvailability(lesson, studentSchedules)
    if (availabilty === false) {
      lessonValidity.invalid('生徒が登校する予定がありません')
    }

    // NOTE: 同時指導可能授業数の確認
    const studentParallelLessons = parallelLessons.filter(lesson => {
      // TODO: 授業の種別によって妥当性の確認の方法を調整する。個別授業・一斉授業
      return lesson.students.some(studentRef => studentRef.id === student.id)
    })
    if (studentParallelLessons.length > STUDENT_MAX_PARALLEL_LESSONS) {
      lessonValidity.invalid('生徒の最大並列授業数を上回っています')
    }

    // NOTE: 生徒から見た授業参加者の確認
    const coexisttingAccounts = getAccountsFromLessons(studentParallelLessons, accountsMap)
    const coexisttingAccountRelations = getAccountRelations(student, coexisttingAccounts, accountRelationsMap)
    coexisttingAccountRelations.forEach(({ relation, account }) => {
      if (relation.score > 0) return
      lessonValidity.invalid(`${student.name}は${account.name}との関係が悪いです${relation.comment ? `(${relation.comment})` : ''}`)
    })
  })
  console.groupEnd('生徒の妥当性')

  // NOTE: 席の妥当性
  console.group('席の妥当性')
  lesson.sheets.forEach((sheetRef) => {
    const sheet = sheetsMap[sheetRef.id]

    // NOTE: 出勤予定の確認
    const sheetSchedules = resourceSchedulesMap[sheet.id]
    const availabilty = getAccountAvailability(lesson, sheetSchedules)
    if (availabilty === false) {
      lessonValidity.invalid('席が利用できない時間帯です')
    }

    // NOTE: 同時指導可能授業数の確認
    const sheetParallelLessons = parallelLessons.filter(lesson => {
      // TODO: 授業の種別によって妥当性の確認の方法を調整する。個別授業・一斉授業
      return lesson.sheets.some(sheetRef => sheetRef.id === sheet.id)
    })
    if (sheetParallelLessons.length > SHEET_MAX_PARALLEL_LESSONS) {
      lessonValidity.invalid('席の同時利用制限に達しています')
    }
  })
  console.groupEnd('席の妥当性')

  console.groupEnd('授業の妥当性確認')
  return lessonValidity
}
