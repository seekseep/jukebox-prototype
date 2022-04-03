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
    name         : '岩倉具視',
    scheduleRules: createBasicTeacherScheduleRules(db)
  }),
  db.teacher.create({
    name         : '木戸孝允',
    scheduleRules: createBasicTeacherScheduleRules(db)
  }),
  db.teacher.create({
    name         : '大久保利通',
    scheduleRules: createBasicTeacherScheduleRules(db)
  }),
]

const students = [
  db.student.create({
    name         : '伊藤博文',
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name         : '山口尚芳',
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name         : '田辺太一',
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name         : '何礼之',
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name         : '福地源一郎',
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name         : '渡辺洪基',
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name         : '小松済治',
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name         : '林董三郎',
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name         : '長野桂次郎',
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name         : '川路寛堂',
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name         : '安藤太郎',
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name         : '池田政懋',
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
