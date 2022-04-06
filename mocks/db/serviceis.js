import pluralize from 'pluralize'
import {
  nextMonday,
  nextTuesday,
  nextWednesday,
  nextThursday,
  nextFriday,
  getDay,
  add, sub, getMonth, nextDay
} from 'date-fns'
import {
  SCHEDULE_RULE_TERM_TYPE,
  SCHEDULE_RULE_TYPE,
  SCHEDULE_UNIT_TERM
} from '../../constatnts'

const REPEAT_NONE = Object.freeze({
  term      : null,
  finishedAt: null
})


function createCompareModel(baseModel, compare) {
  return (model) => compare(baseModel, model)
}

function defaultModelCompare (a,b) {
  return a && b && a?.id === b?.id
}

function appendRelation(model, compare = defaultModelCompare) {
  return function updater(models) {
    if (!models) return [model]
    if (models.findIndex(createCompareModel(model, compare)) > -1) {
      return models
    }
    return [...models, model]
  }
}

export const createModelId = (() => {
  let index = 1
  return () => `${index++}`
})()

export function createOneToManyRelater (oneModelName, manyModelName, { oneModelPrimaryKey = 'id', manyModelPrimaryKey = 'id' } = {}) {
  return function relateOneToMany (db, oneModel, manyModel) {
    db[oneModelName].update({
      where: { [oneModelPrimaryKey]: { equals: oneModel[oneModelPrimaryKey] } },
      data : { [pluralize(manyModelName)]: appendRelation(manyModel) }
    })
    db[manyModelName].update({
      where: { [manyModelPrimaryKey]: { equals: manyModel[manyModelPrimaryKey] } },
      data : { [oneModelName]: oneModel }
    })
  }
}

// NOTE: 原則、人->モノ。両者が人の場合、親人->子人。両者がモノの場合、親モノ->子モノ。
export function createManyToManyRelater (manyModelAName, manyModelBName, { manyModelAPrimaryKey = 'id', manyModelBPrimaryKey = 'id' } = {}) {
  return function relateManyToMany (db, manyModelA, manyModelB) {
    db[manyModelAName].update({
      where: { [manyModelAPrimaryKey]: { equals: manyModelA[manyModelAPrimaryKey] } },
      data : { [pluralize(manyModelBName)]: appendRelation(manyModelB) }
    })
    db[manyModelBName].update({
      where: { [manyModelBPrimaryKey]: { equals: manyModelB[manyModelBPrimaryKey] } },
      data : { [pluralize(manyModelAName)]: appendRelation(manyModelA) }
    })
  }
}

export const relateSchoolAndRoom = createOneToManyRelater('school', 'room')
export function relateSchoolAndRooms(db, school, rooms) {
  rooms.forEach(room => relateSchoolAndRoom(db, school, room))
}

export const relateRoomAndTeacher = createOneToManyRelater('room', 'teacher')
export function relateRoomAndTeachers(db, room, teachers) {
  teachers.forEach(teacher => relateRoomAndTeacher(db, room, teacher))
}

export const relateRoomAndStudent = createOneToManyRelater('room', 'student')
export function relateRoomAndStudents(db, room, students) {
  students.forEach(student => relateRoomAndStudent(db, room, student))
}

export const relateRoomAndSubject = createOneToManyRelater('room', 'subject')
export function relateRoomAndSubjects(db, room, subjects) {
  subjects.forEach(subject => relateRoomAndSubject(db, room, subject))
}

export const relateRoomAndSubjectGroup = createOneToManyRelater('room', 'subjectGroup')
export function relateRoomAndSubjectGroups(db, room, subjectGroups) {
  subjectGroups.forEach(subjectGroup => relateRoomAndSubjectGroup(db, room, subjectGroup))
}

export const relateSubjectAndLesson = createOneToManyRelater('subject', 'lesson')
export function relateSubjectAndLessons (db, subject, lessons) {
  lessons.forEach(lesson => relateSubjectAndLesson(db, subject, lesson))
}

export const relateTeacherAndSubjectGroup = createManyToManyRelater('teacher', 'subjectGroup')
export const relateTeacherAndLesson = createManyToManyRelater('teacher', 'lesson')
export const relateStudentAndSubject = createManyToManyRelater('student', 'subject')
export const relateSubjectGroupAndSubject = createManyToManyRelater('subjectGroup', 'subject')

export function createSubjectWithLessons (db, subjectOptions, lessonsOptions) {
  const subject = db.subject.create(subjectOptions)
  const lessons = Array.from({ length: lessonsOptions.count }).fill(null).map((_, index) =>
    db.lesson.create({
      name    : lessonsOptions.name(subject, index),
      students: lessonsOptions.students,
      subject
    })
  )

  relateSubjectAndLessons(db, subject, lessons)

  return subject
}

function createRepeat(term, finishedAt) {
  return { term, finishedAt }
}

function createWeeklyRepeat (finishedAt) {
  return createRepeat(SCHEDULE_RULE_TERM_TYPE.WEEKLY, finishedAt)
}

function createMonthlyRepeat (finishedAt) {
  return createRepeat(SCHEDULE_RULE_TERM_TYPE.MONTHLY, finishedAt)
}

function createSchedule (startedAt, finishedAt, repeat, type = SCHEDULE_RULE_TYPE.AVAILABLE) {
  return {
    startedAt,
    finishedAt,
    repeat,
    type
  }
}

export function createBasicStudentScheduleRules () {
  const repeatStartedAt = new Date(2020, 3, 1)
  const repeatFinishedAt = sub(add(repeatStartedAt, { years: 3 }), { days: 1 })
  const monday = nextMonday(repeatStartedAt)
  const tuesday = nextTuesday(repeatStartedAt)
  const wednesday = nextWednesday(repeatStartedAt)
  const thursday = nextThursday(repeatStartedAt)
  const friday = nextFriday(repeatStartedAt)

  const weeklyRepeat = createWeeklyRepeat(repeatFinishedAt)
  const monthlyRepeat = createMonthlyRepeat(repeatFinishedAt)

  function createWeeklyAvailableRule (startedAt, finishedAt, type) {
    return createSchedule(startedAt, finishedAt, weeklyRepeat, type)
  }

  return [
    createWeeklyAvailableRule(
      add(monday, { hours: 16, minutes: 0 }),
      add(monday, { hours: 20, minutes: 0 })
    ),
    createWeeklyAvailableRule(
      add(tuesday, { hours: 16, minutes: 0 }),
      add(tuesday, { hours: 20, minutes: 0 })
    ),
    createWeeklyAvailableRule(
      add(wednesday, { hours: 16, minutes: 0 }),
      add(wednesday, { hours: 20, minutes: 0 })
    ),
    createWeeklyAvailableRule(
      add(thursday, { hours: 16, minutes: 0 }),
      add(thursday, { hours: 20, minutes: 0 })
    ),
    createWeeklyAvailableRule(
      add(friday, { hours: 16, minutes: 0 }),
      add(friday, { hours: 20, minutes: 0 })
    ),
    {
      startedAt : add(repeatStartedAt, { hours: 0, minutes: 0 }),
      finishedAt: add(repeatStartedAt, { hours: 23, minutes: 59 }),
      type      : SCHEDULE_RULE_TYPE.DISAVAILABLE,
      repeat    : monthlyRepeat
    },
    {
      startedAt : add(repeatStartedAt, { days: 0, hours: 0, minutes: 0 }),
      finishedAt: add(repeatStartedAt, { days: 0, hours: 23, minutes: 59 }),
      type      : SCHEDULE_RULE_TYPE.DISAVAILABLE,
      repeat    : REPEAT_NONE
    },
    {
      startedAt : add(repeatStartedAt, { days: 1, hours: 0, minutes: 0 }),
      finishedAt: add(repeatStartedAt, { days: 1, hours: 23, minutes: 59 }),
      type      : SCHEDULE_RULE_TYPE.DISAVAILABLE,
      repeat    : REPEAT_NONE
    },
    {
      startedAt : add(repeatStartedAt, { days: 2, hours: 0, minutes: 0 }),
      finishedAt: add(repeatStartedAt, { days: 2, hours: 23, minutes: 59 }),
      type      : SCHEDULE_RULE_TYPE.DISAVAILABLE,
      repeat    : REPEAT_NONE
    },
    {
      startedAt : add(repeatStartedAt, { days: 3, hours: 0, minutes: 0 }),
      finishedAt: add(repeatStartedAt, { days: 3, hours: 23, minutes: 59 }),
      type      : SCHEDULE_RULE_TYPE.DISAVAILABLE,
      repeat    : REPEAT_NONE
    },
  ]
}

export function createBasicTeacherScheduleRules() {
  const repeatStartedAt = new Date(2020, 3, 1)
  const repeatFinishedAt = sub(add(repeatStartedAt, { years: 3 }), { days: 1 })
  const monday = nextMonday(repeatStartedAt)
  const tuesday = nextTuesday(repeatStartedAt)
  const wednesday = nextWednesday(repeatStartedAt)
  const thursday = nextThursday(repeatStartedAt)
  const friday = nextFriday(repeatStartedAt)

  const weeklyRepeat = createWeeklyRepeat(repeatFinishedAt)

  function createWeeklyAvailableRule (startedAt, finishedAt, type) {
    return createSchedule(startedAt, finishedAt, weeklyRepeat, type)
  }

  return [
    createWeeklyAvailableRule(
      add(monday, { hours: 9, minutes: 0 }),
      add(monday, { hours: 21, minutes: 0 })
    ),
    createWeeklyAvailableRule(
      add(tuesday, { hours: 9, minutes: 0 }),
      add(tuesday, { hours: 21, minutes: 0 })
    ),
    createWeeklyAvailableRule(
      add(wednesday, { hours: 9, minutes: 0 }),
      add(wednesday, { hours: 21, minutes: 0 })
    ),
    createWeeklyAvailableRule(
      add(thursday, { hours: 9, minutes: 0 }),
      add(thursday, { hours: 21, minutes: 0 })
    ),
    createWeeklyAvailableRule(
      add(friday, { hours: 9, minutes: 0 }),
      add(friday, { hours: 21, minutes: 0 })
    ),
    {
      startedAt : add(repeatStartedAt, { days: 3, hours: 0, minutes: 0 }),
      finishedAt: add(repeatStartedAt, { days: 3, hours: 23, minutes: 59 }),
      type      : SCHEDULE_RULE_TYPE.DISAVAILABLE,
      repeat    : REPEAT_NONE
    },
  ]
}


export function createBasicRoomScheduleRules() {
  const repeatStartedAt = new Date(2020, 3, 1)
  const repeatFinishedAt = sub(add(repeatStartedAt, { years: 3 }), { days: 1 })
  const monday = nextMonday(repeatStartedAt)
  const tuesday = nextTuesday(repeatStartedAt)
  const wednesday = nextWednesday(repeatStartedAt)
  const thursday = nextThursday(repeatStartedAt)
  const friday = nextFriday(repeatStartedAt)

  const weeklyRepeat = createWeeklyRepeat(repeatFinishedAt)

  function createWeeklyAvailableRule (startedAt, finishedAt, type) {
    return createSchedule(startedAt, finishedAt, weeklyRepeat, type)
  }

  return [
    createWeeklyAvailableRule(
      add(monday, { hours: 9, minutes: 0 }),
      add(monday, { hours: 21, minutes: 0 })
    ),
    createWeeklyAvailableRule(
      add(tuesday, { hours: 9, minutes: 0 }),
      add(tuesday, { hours: 21, minutes: 0 })
    ),
    createWeeklyAvailableRule(
      add(wednesday, { hours: 9, minutes: 0 }),
      add(wednesday, { hours: 21, minutes: 0 })
    ),
    createWeeklyAvailableRule(
      add(thursday, { hours: 9, minutes: 0 }),
      add(thursday, { hours: 21, minutes: 0 })
    ),
    createWeeklyAvailableRule(
      add(friday, { hours: 9, minutes: 0 }),
      add(friday, { hours: 21, minutes: 0 })
    ),
    {
      startedAt : add(repeatStartedAt, { days: 20, hours: 0, minutes: 0 }),
      finishedAt: add(repeatStartedAt, { days: 20, hours: 23, minutes: 59 }),
      type      : SCHEDULE_RULE_TYPE.DISAVAILABLE,
      repeat    : {
        term      : SCHEDULE_RULE_TERM_TYPE.MONTHLY,
        finishedAt: repeatFinishedAt
      }
    },
    {
      startedAt : add(repeatStartedAt, { days: 3, hours: 0, minutes: 0 }),
      finishedAt: add(repeatStartedAt, { days: 3, hours: 23, minutes: 59 }),
      type      : SCHEDULE_RULE_TYPE.DISAVAILABLE,
      repeat    : REPEAT_NONE
    },
  ]
}

export function createStudent (db, room, studentOptions = {}) {
  const student = db.student.create({
    scheduleRules: createBasicStudentScheduleRules(),
    room,
    ...studentOptions
  })

  relateRoomAndStudent(db, room, student)

  return student
}

export function createTeacher (db, room, teacherOptions = {}) {
  const teacher = db.teacher.create({
    scheduleRules: createBasicTeacherScheduleRules(),
    room,
    ...teacherOptions
  })

  relateRoomAndTeacher(db, room, teacher)

  return teacher
}

export function createFrame([startHours, startMinutes], [finishHours, finishMinutes]) {
  return {
    start : { hours: startHours, minutes: startMinutes },
    finish: { hours: finishHours, minutes: finishMinutes },
  }
}

export function getFrame (room, day, index) {
  return room.frames[day][index]
}

export function createPersonalSubject (
  db, room, student, name, startedAt, frames, teacher, lessonCount = 4,
) {

  const subjectName = (student, name) => `個人${name} ${student.name}`

  const subject = db.subject.create({
    name   : subjectName(student, name),
    tags   : [name],
    lessons: frames.reduce((lessons, [day, index]) => {
      const baseDate = getDay(startedAt) === day ? startedAt : nextDay(startedAt, day)
      return Array.from({ length: lessonCount }).fill(null).reduce((lessons, _, i) => {
        const lessonDate = add(baseDate, { weeks: i })
        const frame = getFrame(room, day, index)
        if (getMonth(lessonDate) > getMonth(startedAt) || lessons.length >= lessonCount) return lessons
        return [
          ...lessons,
          {
            name      : subjectName(student, name),
            startedAt : add(lessonDate, frame.start),
            finishedAt: add(lessonDate, frame.finish),
            teachers  : [teacher]
          }
        ]
      }, lessons)
    }, []),
  })

  relateRoomAndSubject(db, room, subject)
  relateStudentAndSubject(db, student, subject)

  return subject
}

export function createRoom (db, school, roomOptions = {}) {
  const room = db.room.create({
    scheduleUnit: {
      term : SCHEDULE_UNIT_TERM.MONTHLY,
      value: 1
    },
    scheduleRules: createBasicRoomScheduleRules(),
    frames       : [
      [],
      ...Array.from({ length: 5 }).fill(null).map(() => ([
        createFrame([15, 0], [15, 55]),
        createFrame([16, 0], [16, 55]),
        createFrame([17, 0], [17, 55]),
        createFrame([18, 0], [18, 55]),
        createFrame([19, 0], [19, 55]),
      ])),
      [],
    ],
    school,
    ...roomOptions,
  })

  relateSchoolAndRoom(db, school, room)

  return room
}
