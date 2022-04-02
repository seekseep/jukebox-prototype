import pluralize from 'pluralize'
import {
  nextMonday,
  nextTuesday,
  nextWednesday,
  nextThursday,
  nextFriday,
  add, sub
} from 'date-fns'
import { SCHEDULE_RULE_TERM_TYPE, SCHEDULE_RULE_TYPE } from "../../constatnts";

function createCompareModel(baseModel, compare) {
  return (model) => compare(baseModel, model);
}

function defaultModelCompare (a,b) {
  return a && b && a?.id === b?.id
}

function appendRelation(model, compare = defaultModelCompare) {
  return function updater(models) {
    if (!models) return [model];
    if (models.findIndex(createCompareModel(model, compare)) > -1) {
      return models;
    }
    return [...models, model];
  };
}

export const createModelId = (() => {
  let index = 1
  return () => `${index++}`
})()

export function createOneToManyRelater (oneModelName, manyModelName, { oneModelPrimaryKey = 'id', manyModelPrimaryKey = 'id' } = {}) {
  return function relateOneToMany (db, oneModel, manyModel) {
    db[oneModelName].update({
      where: { [oneModelPrimaryKey]: { equals: oneModel[oneModelPrimaryKey] }},
      data: { [pluralize(manyModelName)]: appendRelation(manyModel) }
    })
    db[manyModelName].update({
      where: { [manyModelPrimaryKey]: { equals: manyModel[manyModelPrimaryKey] }},
      data: { [oneModelName]: oneModel }
    })
  }
}

// NOTE: 原則、人->モノ。両者が人の場合、親人->子人。両者がモノの場合、親モノ->子モノ。
export function createManyToManyRelater (manyModelAName, manyModelBName, { manyModelAPrimaryKey = 'id', manyModelBPrimaryKey = 'id' } = {}) {
  return function relateManyToMany (db, manyModelA, manyModelB) {
    db[manyModelAName].update({
      where: { [manyModelAPrimaryKey]: { equals: manyModelA[manyModelAPrimaryKey] }},
      data: { [pluralize(manyModelBName)]: appendRelation(manyModelB) }
    })
    db[manyModelBName].update({
      where: { [manyModelBPrimaryKey]: { equals: manyModelB[manyModelBPrimaryKey] }},
      data: { [pluralize(manyModelAName)]: appendRelation(manyModelA) }
    })
  }
}

export const relateSchoolAndRoom = createOneToManyRelater("school", "room")
export function relateSchoolAndRooms(db, school, rooms) {
  rooms.forEach(room => relateSchoolAndRoom(db, school, room))
}

export const relateRoomAndTeacher = createOneToManyRelater("room", "teacher")
export function relateRoomAndTeachers(db, room, teachers) {
  teachers.forEach(teacher => relateRoomAndTeacher(db, room, teacher))
}

export const relateRoomAndStudent = createOneToManyRelater("room", "student")
export function relateRoomAndStudents(db, room, students) {
  students.forEach(student => relateRoomAndStudent(db, room, student))
}

export const relateRoomAndSubject = createOneToManyRelater("room", "subject")
export function relateRoomAndSubjects(db, room, subjects) {
  subjects.forEach(subject => relateRoomAndSubject(db, room, subject))
}

export const relateRoomAndSubjectGroup = createOneToManyRelater("room", "subjectGroup")
export function relateRoomAndSubjectGroups(db, room, subjectGroups) {
  subjectGroups.forEach(subjectGroup => relateRoomAndSubjectGroup(db, room, subjectGroup))
}

export const relateSubjectAndLesson = createOneToManyRelater("subject", "lesson")
export function relateSubjectAndLessons (db, subject, lessons) {
  lessons.forEach(lesson => relateRoomAndSubject(db, subject, lesson))
}

export const relateTeacherAndSubjectGroup = createManyToManyRelater("teacher", "subjectGroup")
export const relateTeacherAndLesson = createManyToManyRelater("teacher", "lesson")
export const relateStudentAndSubject = createManyToManyRelater("student", "subject")
export const relateSubjectGroupAndSubject = createManyToManyRelater("subjectGroup", "subject")

export function createSubjectWithLessons (db, subjectOptions, lessonsOptions) {
  const subject = db.subject.create(subjectOptions)
  const lessons = Array.from({ length: lessonsOptions.count }).fill(null).map((_, index) =>
    db.lesson.create({
      name: lessonsOptions.name(subject, index),
      students: lessonsOptions.students,
      subject
    })
  )

  relateSubjectAndLessons(db, subject, lessons)

  return subject
}

export function createBasicStudentScheduleRules (db) {
  const repeatStartedAt = new Date(2020, 3, 1)
  const repeatFinishedAt = sub(add(repeatStartedAt, { years: 3 }), {days:1})
  const monday = nextMonday(repeatStartedAt)
  const tuesday = nextTuesday(repeatStartedAt)
  const wednesday = nextWednesday(repeatStartedAt)
  const thursday = nextThursday(repeatStartedAt)
  const friday = nextFriday(repeatStartedAt)

  return [
    db.scheduleRule.create({
      startedAt: add(monday, { hours: 16, minutes: 0 }).getTime(),
      finishedAt: add(monday, { hours: 20, minutes: 0 }).getTime(),
      type: SCHEDULE_RULE_TYPE.AVAILABLE,
      repeat: {
        term: SCHEDULE_RULE_TERM_TYPE.WEEKLY,
        finishedAt: repeatFinishedAt,
      }
    }),
    db.scheduleRule.create({
      startedAt: add(tuesday, { hours: 16, minutes: 0 }).getTime(),
      finishedAt: add(tuesday, { hours: 20, minutes: 0 }).getTime(),
      type: SCHEDULE_RULE_TYPE.AVAILABLE,
      repeat: {
        term: SCHEDULE_RULE_TERM_TYPE.WEEKLY,
        finishedAt: repeatFinishedAt,
      }
    }),
    db.scheduleRule.create({
      startedAt: add(wednesday, { hours: 16, minutes: 0 }).getTime(),
      finishedAt: add(wednesday, { hours: 20, minutes: 0 }).getTime(),
      type: SCHEDULE_RULE_TYPE.AVAILABLE,
      repeat: {
        term: SCHEDULE_RULE_TERM_TYPE.WEEKLY,
        finishedAt: repeatFinishedAt,
      }
    }),
    db.scheduleRule.create({
      startedAt: add(thursday, { hours: 16, minutes: 0 }).getTime(),
      finishedAt: add(thursday, { hours: 20, minutes: 0 }).getTime(),
      type: SCHEDULE_RULE_TYPE.AVAILABLE,
      repeat: {
        term: SCHEDULE_RULE_TERM_TYPE.WEEKLY,
        finishedAt: repeatFinishedAt,
      }
    }),
    db.scheduleRule.create({
      startedAt: add(friday, { hours: 16, minutes: 0 }).getTime(),
      finishedAt: add(friday, { hours: 20, minutes: 0 }).getTime(),
      type: SCHEDULE_RULE_TYPE.AVAILABLE,
      repeat: {
        term: SCHEDULE_RULE_TERM_TYPE.WEEKLY,
        finishedAt: repeatFinishedAt,
      }
    }),
    db.scheduleRule.create({
      startedAt: add(repeatStartedAt, { hours: 0, minutes: 0 }).getTime(),
      finishedAt: add(repeatStartedAt, { hours: 23, minutes: 59 }).getTime(),
      type: SCHEDULE_RULE_TYPE.DISAVAILABLE,
      repeat: {
        term: SCHEDULE_RULE_TERM_TYPE.MONTHLY,
        finishedAt: repeatFinishedAt,
      }
    }),
    db.scheduleRule.create({
      startedAt: add(repeatStartedAt, { days: 0, hours: 0, minutes: 0 }).getTime(),
      finishedAt: add(repeatStartedAt, { days: 0, hours: 23, minutes: 59 }).getTime(),
      type: SCHEDULE_RULE_TYPE.DISAVAILABLE,
      repeat: { term: null, finishedAt: null }
    }),
    db.scheduleRule.create({
      startedAt: add(repeatStartedAt, { days: 1, hours: 0, minutes: 0 }).getTime(),
      finishedAt: add(repeatStartedAt, { days: 1, hours: 23, minutes: 59 }).getTime(),
      type: SCHEDULE_RULE_TYPE.DISAVAILABLE,
      repeat: { term: null, finishedAt: null }
    }),
    db.scheduleRule.create({
      startedAt: add(repeatStartedAt, { days: 2, hours: 0, minutes: 0 }).getTime(),
      finishedAt: add(repeatStartedAt, { days: 2, hours: 23, minutes: 59 }).getTime(),
      type: SCHEDULE_RULE_TYPE.DISAVAILABLE,
      repeat: { term: null, finishedAt: null }
    }),
    db.scheduleRule.create({
      startedAt: add(repeatStartedAt, { days: 3, hours: 0, minutes: 0 }).getTime(),
      finishedAt: add(repeatStartedAt, { days: 3, hours: 23, minutes: 59 }).getTime(),
      type: SCHEDULE_RULE_TYPE.DISAVAILABLE,
      repeat: { term: null, finishedAt: null }
    }),
  ]
}

export function createBasicTeacherScheduleRules(db) {
  const repeatStartedAt = new Date(2020, 3, 1)
  const repeatFinishedAt = sub(add(repeatStartedAt, { years: 3 }), {days:1})
  const monday = nextMonday(repeatStartedAt)
  const tuesday = nextTuesday(repeatStartedAt)
  const wednesday = nextWednesday(repeatStartedAt)
  const thursday = nextThursday(repeatStartedAt)
  const friday = nextFriday(repeatStartedAt)

  return [
    db.scheduleRule.create({
      startedAt: add(monday, { hours: 9, minutes: 0 }).getTime(),
      finishedAt: add(monday, { hours: 21, minutes: 0 }).getTime(),
      type: SCHEDULE_RULE_TYPE.AVAILABLE,
      repeat: {
        term: SCHEDULE_RULE_TERM_TYPE.WEEKLY,
        finishedAt: repeatFinishedAt,
      }
    }),
    db.scheduleRule.create({
      startedAt: add(tuesday, { hours: 9, minutes: 0 }).getTime(),
      finishedAt: add(tuesday, { hours: 21, minutes: 0 }).getTime(),
      type: SCHEDULE_RULE_TYPE.AVAILABLE,
      repeat: {
        term: SCHEDULE_RULE_TERM_TYPE.WEEKLY,
        finishedAt: repeatFinishedAt,
      }
    }),
    db.scheduleRule.create({
      startedAt: add(wednesday, { hours: 9, minutes: 0 }).getTime(),
      finishedAt: add(wednesday, { hours: 21, minutes: 0 }).getTime(),
      type: SCHEDULE_RULE_TYPE.AVAILABLE,
      repeat: {
        term: SCHEDULE_RULE_TERM_TYPE.WEEKLY,
        finishedAt: repeatFinishedAt,
      }
    }),
    db.scheduleRule.create({
      startedAt: add(thursday, { hours: 9, minutes: 0 }).getTime(),
      finishedAt: add(thursday, { hours: 21, minutes: 0 }).getTime(),
      type: SCHEDULE_RULE_TYPE.AVAILABLE,
      repeat: {
        term: SCHEDULE_RULE_TERM_TYPE.WEEKLY,
        finishedAt: repeatFinishedAt,
      }
    }),
    db.scheduleRule.create({
      startedAt: add(friday, { hours: 9, minutes: 0 }).getTime(),
      finishedAt: add(friday, { hours: 21, minutes: 0 }).getTime(),
      type: SCHEDULE_RULE_TYPE.AVAILABLE,
      repeat: {
        term: SCHEDULE_RULE_TERM_TYPE.WEEKLY,
        finishedAt: repeatFinishedAt,
      }
    }),
    db.scheduleRule.create({
      startedAt: add(repeatStartedAt, { days: 3, hours: 0, minutes: 0 }).getTime(),
      finishedAt: add(repeatStartedAt, { days: 3, hours: 23, minutes: 59 }).getTime(),
      type: SCHEDULE_RULE_TYPE.DISAVAILABLE,
      repeat: { term: null, finishedAt: null }
    }),
  ]
}
