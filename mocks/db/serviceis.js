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

export function relateSchoolAndRoom(db, school, room) {
  db.school.update({
    where: { id: { equals: school.id } },
    data: { rooms: appendRelation(room) },
  });
  db.room.update({
    where: { id: { equals: room.id } },
    data: { school },
  });
}

export function relateSchoolAndRooms(db, school, rooms) {
  rooms.forEach(room => relateSchoolAndRoom(db, school, room))
}

export function relateRoomAndTeacher(db, room, teacher) {
  db.room.update({
    where: { id: { equals: room.id } },
    data: { teachers: appendRelation(teacher) },
  });
  db.teacher.update({
    where: { id: { equals: teacher.id } },
    data: { room },
  });
}

export function relateRoomAndTeachers(db, room, teachers) {
  teachers.forEach(teacher => relateRoomAndTeacher(db, room, teacher))
}

export function relateRoomAndStudent(db, room, student) {
  db.room.update({
    where: { id: { equals: room.id } },
    data: { students: appendRelation(student) },
  });
  db.student.update({
    where: { id: { equals: student.id } },
    data: { room },
  });
}

export function relateRoomAndStudents(db, room, students) {
  students.forEach(student => relateRoomAndStudent(db, room, student))
}

export function relateRoomAndSubject(db, room, subject) {
  db.room.update({
    where: { id: { equals: room.id } },
    data: { subjects: appendRelation(subject) },
  });
  db.subject.update({
    where: { id: { equals: subject.id } },
    data: { room },
  });
}

export function relateRoomAndSubjects(db, room, subjects) {
  subjects.forEach(subject => relateRoomAndSubject(db, room, subject))
}

export function relateSubjectAndLesson (db, subject, lesson) {
  db.subject.update({
    where: { id: { equals: subject.id } },
    data: { lessons: appendRelation(lesson) },
  });
  db.lesson.update({
    where: { id: { equals: lesson.id } },
    data: { subject },
  });
}

export function relateSubjectAndLessons (db, subject, lessons) {
  lessons.forEach(lesson => relateRoomAndSubject(db, subject, lesson))
}

export function relateStudentAndSubject (db, student, subject) {
  db.subject.update({
    where: { id: { equals: subject.id } },
    data: { students: appendRelation(student) },
  });
  db.student.update({
    where: { id: { equals: student.id } },
    data: { subjects: appendRelation(subject) },
  });
}

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
