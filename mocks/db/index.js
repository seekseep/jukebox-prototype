import { factory, manyOf, nullable, oneOf, primaryKey } from '@mswjs/data'
import { SCHEDULE_STATUS, SCHEDULE_UNIT_TERM } from '../../constatnts'
import {
  createModelId,
  relateSchoolAndRooms,
  relateRoomAndTeachers,
  relateRoomAndStudents,
  relateRoomAndSubjects,
  relateRoomAndSubjectGroups,
  relateStudentAndSubject,
  relateSubjectGroupAndSubject,
  relateTeacherAndSubjectGroup,
  createSubjectWithLessons,
  createBasicRoomScheduleRules,
  createBasicStudentScheduleRules,
  createBasicTeacherScheduleRules,
} from './serviceis'

export const db = factory({
  school: {
    id   : primaryKey(() => createModelId()),
    name : String,
    rooms: manyOf('room')
  },
  family: {
    id      : primaryKey(() => createModelId()),
    name    : String,
    parents : manyOf('parent'),
    students: manyOf('student'),
  },
  room: {
    id          : primaryKey(() => createModelId()),
    name        : String,
    scheduleUnit: {
      term : String,
      value: Number,
    },
    school       : oneOf('school'),
    students     : manyOf('student'),
    subjects     : manyOf('subject'),
    teachers     : manyOf('teacher'),
    students     : manyOf('student'),
    schedules    : manyOf('schedule'),
    scheduleRules: manyOf('scheduleRule'),
    subjectGroups: manyOf('subjectGroup'),
  },
  parent: {
    id      : primaryKey(() => createModelId()),
    name    : String,
    families: manyOf('family')
  },
  student: {
    id           : primaryKey(() => createModelId()),
    name         : String,
    scheduleRules: manyOf('scheduleRule'),
    room         : oneOf('room'),
    subjects     : manyOf('subject'),
    schedules    : manyOf('schedule'),
  },
  schedule: {
    id        : primaryKey(() => createModelId()),
    status    : String,
    startedAt : Number,
    finishedAt: Number,
    events    : manyOf('event')
  },
  event: {
    id        : primaryKey(() => createModelId()),
    startedAt : Number,
    finishedAt: Number,
    lesson    : oneOf('lesson')
  },
  scheduleRule: {
    id        : primaryKey(() => createModelId()),
    type      : String,
    startedAt : Number,
    finishedAt: Number,
    repeat    : {
      term      : nullable(String),
      finishedAt: nullable(Number),
    }
  },
  teacher: {
    id           : primaryKey(() => createModelId()),
    name         : String,
    room         : oneOf('room'),
    scheduleRules: manyOf('scheduleRule'),
    subjectGroups: manyOf('subjectGroup')
  },
  subjectGroup: {
    id      : primaryKey(() => createModelId()),
    name    : String,
    room    : oneOf('room'),
    teachers: manyOf('teacher'),
    subjects: manyOf('subject'),
  },
  subject: {
    id           : primaryKey(() => createModelId()),
    name         : String,
    room         : oneOf('room'),
    subjectGroups: manyOf('subjectGroup'),
    students     : manyOf('student'),
    lessons      : manyOf('lesson'),
  },
  lesson: {
    id     : primaryKey(() => createModelId()),
    name   : String,
    subejct: oneOf('subject')
  },
})

const school = db.school.create({ name: 'A塾' })

const rooms = [
  db.room.create({
    name        : '北教室',
    scheduleUnit: {
      term : SCHEDULE_UNIT_TERM.MONTHLY,
      value: 1
    },
    schedules: [
      db.schedule.create({
        status    : SCHEDULE_STATUS.PUBLISHED,
        startedAt : new Date(2022, 0, 1),
        finishedAt: new Date(2022, 0, 31),
      }),
      db.schedule.create({
        status    : SCHEDULE_STATUS.PUBLISHED,
        startedAt : new Date(2022, 1, 1),
        finishedAt: new Date(2022, 1, 28),
      }),
      db.schedule.create({
        status    : SCHEDULE_STATUS.PUBLISHED,
        startedAt : new Date(2022, 2, 1),
        finishedAt: new Date(2022, 2, 31),
      }),
      db.schedule.create({
        status    : SCHEDULE_STATUS.UNSUBMITTED,
        startedAt : new Date(2022, 3, 1),
        finishedAt: new Date(2022, 3, 30),
      }),
    ],
    scheduleRules: createBasicRoomScheduleRules(db)
  }),
  db.room.create({
    name        : '東教室',
    scheduleUnit: {
      term : SCHEDULE_UNIT_TERM.MONTHLY,
      value: 1
    },
    scheduleRules: createBasicRoomScheduleRules(db)
  }),
  db.room.create({
    name        : '南教室',
    scheduleUnit: {
      term : SCHEDULE_UNIT_TERM.MONTHLY,
      value: 1
    },
    scheduleRules: createBasicRoomScheduleRules(db)
  }),
  db.room.create({
    name        : '西教室',
    scheduleUnit: {
      term : SCHEDULE_UNIT_TERM.MONTHLY,
      value: 1
    },
    scheduleRules: createBasicRoomScheduleRules(db)
  }),
]

const teachers = [
  db.teacher.create({
    name         : '若松貴文',
    scheduleRules: createBasicTeacherScheduleRules(db)
  }),
  db.teacher.create({
    name         : '金井ともみ',
    scheduleRules: createBasicTeacherScheduleRules(db)
  }),
  db.teacher.create({
    name         : '山川為春',
    scheduleRules: createBasicTeacherScheduleRules(db)
  }),
]

const students = [
  db.student.create({
    name         : '黒木ユウイチ',
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name         : '黒木ミカ',
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name         : '和井健吉',
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name         : '満尾稔江',
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name         : '長光寿々彦',
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name         : '中川美保',
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name         : '樫原滝造',
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name         : '矢部静代',
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name         : '米田秋穂',
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name         : '横江雪音',
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name         : '長尾茅',
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name         : '福安小都音',
    scheduleRules: createBasicStudentScheduleRules(db),
  })
]

const subjectGroups = [
  db.subjectGroup.create({ name: '中学英語' }),
  db.subjectGroup.create({ name: '中学数学' }),
  db.subjectGroup.create({ name: '小学算数' }),
]

const subjects = [
  createSubjectWithLessons(db, {
    name: '一斉英語'
  }, {
    count: 4,
    name : (subject, index) => `${subject.name} ${index+1}回目`,
  }),
  createSubjectWithLessons(db, {
    name: '個人英語'
  }, {
    count: 4,
    name : (subject, index) => `${subject.name} ${index+1}回目`,

  }),
  createSubjectWithLessons(db, {
    name: '個人数学'
  }, {
    count: 4,
    name : (subject, index) => `${subject.name} ${index+1}回目`,
  }),
  createSubjectWithLessons(db, {
    name: '個人算数'
  }, {
    count: 4,
    name : (subject, index) => `${subject.name} ${index+1}回目`,
  }),
]

db.family.create({
  name    : '黒木家',
  students: [
    students[0],
    students[1],
  ],
  parents: [
    db.parent.create({
      name: '黒木ヨウイチ',
    }),
    db.parent.create({
      name: '黒木ユカ',
    })
  ]
})

relateSchoolAndRooms(db, school, rooms)
relateRoomAndTeachers(db, rooms[0], teachers)
relateRoomAndStudents(db, rooms[0], students)
relateRoomAndSubjects(db, rooms[0], subjects)
relateRoomAndSubjectGroups(db, rooms[0], subjectGroups)


relateTeacherAndSubjectGroup(db, teachers[0], subjectGroups[0])
relateTeacherAndSubjectGroup(db, teachers[0], subjectGroups[1])
relateTeacherAndSubjectGroup(db, teachers[0], subjectGroups[2])

relateSubjectGroupAndSubject(db, subjectGroups[0], subjects[0])
relateSubjectGroupAndSubject(db, subjectGroups[0], subjects[1])
relateSubjectGroupAndSubject(db, subjectGroups[1], subjects[2])

students.forEach(student => {
  relateStudentAndSubject(db, student, subjects[0])
})
relateStudentAndSubject(db, students[0], subjects[1])
relateStudentAndSubject(db, students[0], subjects[2])
