import { factory, manyOf, nullable, oneOf, primaryKey } from '@mswjs/data'
import {
  SCHEDULE_STATUS,
  SCHEDULE_UNIT_TERM,
  WEEK_DAY
} from '../../constatnts'
import {
  createModelId,
  relateSchoolAndRooms,
  relateRoomAndTeachers,
  relateRoomAndStudents,
  relateRoomAndSubjects,
  relateRoomAndSubjectGroups,
  relateTeacherAndSubjectGroup,
  createPersonalSubject,
  createBasicRoomScheduleRules,
  createTeacher,
  createStudent,
  createRoom
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
    id                : primaryKey(() => createModelId()),
    name              : String,
    businessStartHour : Number,
    businessFinishHour: Number,
    scheduleUnit      : {
      term : String,
      value: Number,
    },
    frames: (() => ([
      [{ start: { hours: 0, minutes: 0 }, finish: { hours: 23, minutes: 0 } }],
    ])),
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
    id        : primaryKey(() => createModelId()),
    name      : String,
    startedAt : Number,
    finishedAt: Number,
    teachers  : manyOf('teacher'),
    subejct   : oneOf('subject')
  },
})

const school = db.school.create({ name: 'A塾' })

const rooms = [
  createRoom(db, {
    name     : '北教室',
    schedules: [
      db.schedule.create({
        status    : SCHEDULE_STATUS.UNSUBMITTED,
        startedAt : new Date(2022, 3, 1),
        finishedAt: new Date(2022, 3, 30),
      }),
    ],
  }),
  createRoom(db, { name: '東教室' }),
  createRoom(db, { name: '西教室' }),
  createRoom(db, { name: '南教室' }),
]

const teachers = [
  createTeacher(db, { name: '若松貴文' }),
  createTeacher(db, { name: '金井ともみ' }),
  createTeacher(db, { name: '山川為春' }),
  createTeacher(db, { name: '小山聖紘' }),
  createTeacher(db, { name: '水野光高' }),
  // createTeacher(db, { name: '飯塚昌彦' }),
  // createTeacher(db, { name: '柏原宗太郎' }),
  // createTeacher(db, { name: '金本健由' }),
  // createTeacher(db, { name: '庄籠朱鷺' }),
  // createTeacher(db, { name: '川北伊瀬' }),
]

const students = [
  createStudent(db, { name: '黒木ユウイチ' }),
  createStudent(db, { name: '黒木ミカ' }),
  createStudent(db, { name: '和井健吉' }),
  createStudent(db, { name: '満尾稔江' }),
  createStudent(db, { name: '長光寿々彦' }),
  createStudent(db, { name: '中川美保' }),
  createStudent(db, { name: '樫原滝造' }),
  createStudent(db, { name: '矢部静代' }),
  createStudent(db, { name: '米田秋穂' }),
  createStudent(db, { name: '横江雪音' }),
  // createStudent(db, { name: '長尾茅' }),
  // createStudent(db, { name: '福安小都音' }),
  // createStudent(db, { name: '遠山岩之介' }),
  // createStudent(db, { name: '川北伊瀬' }),
  // createStudent(db, { name: '井沢明里' }),
  // createStudent(db, { name: '室谷恵里子' }),
  // createStudent(db, { name: '阪田吉乃' }),
  // createStudent(db, { name: '武山慶樹' }),
  // createStudent(db, { name: '上野柚吾' }),
  // createStudent(db, { name: '川辺滝三' }),
  // createStudent(db, { name: '小山かおり' }),
  // createStudent(db, { name: '香村寛顕' }),
  // createStudent(db, { name: '篠原葉月' }),
  // createStudent(db, { name: '篠崎理津子' }),
  // createStudent(db, { name: '大西美鈴' }),
  // createStudent(db, { name: '沢井七' }),
  // createStudent(db, { name: '井出湊也' }),
  // createStudent(db, { name: '花村英範' }),
  // createStudent(db, { name: '金本健由' }),
  // createStudent(db, { name: '籠辰兵衛' }),
  // createStudent(db, { name: '福本真之' }),
]

const subjectGroups = [
  db.subjectGroup.create({ name: '英語' }),
  db.subjectGroup.create({ name: '数学' }),
]

const { MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY } = WEEK_DAY
const [room] = rooms
const subjectStartedAt = new Date(2022, 3, 1)
const subjects = [
  createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[0], teacher: teachers[0], frames: [[MONDAY, 0]] }),
  createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[0], teacher: teachers[1], frames: [[TUESDAY, 1]] }),
  createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[1], teacher: teachers[2], frames: [[WEDNESDAY, 2]] }),
  createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[1], teacher: teachers[3], frames: [[THURSDAY, 3]] }),
  createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[2], teacher: teachers[0], frames: [[FRIDAY, 4]] }),
  createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[2], teacher: teachers[1], frames: [[MONDAY, 0]] }),
  createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[3], teacher: teachers[2], frames: [[TUESDAY, 1]] }),
  createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[3], teacher: teachers[3], frames: [[WEDNESDAY, 2]] }),
  createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[4], teacher: teachers[0], frames: [[THURSDAY, 3]] }),
  createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[4], teacher: teachers[1], frames: [[FRIDAY, 4]] }),
  createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[5], teacher: teachers[2], frames: [[MONDAY, 0]] }),
  createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[5], teacher: teachers[3], frames: [[TUESDAY, 1]] }),
  createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[6], teacher: teachers[0], frames: [[WEDNESDAY, 2]] }),
  createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[6], teacher: teachers[1], frames: [[THURSDAY, 3]] }),
  createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[7], teacher: teachers[2], frames: [[FRIDAY, 4]] }),
  createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[7], teacher: teachers[3], frames: [[MONDAY, 0]] }),
  createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[8], teacher: teachers[0], frames: [[TUESDAY, 1]] }),
  createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[8], teacher: teachers[1], frames: [[WEDNESDAY, 2]] }),
  createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[9], teacher: teachers[2], frames: [[THURSDAY, 3]] }),
  createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[9], teacher: teachers[3], frames: [[FRIDAY, 4]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[10], teacher: teachers[0], frames: [[WEDNESDAY, 0]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[10], teacher: teachers[1], frames: [[WEDNESDAY, 1]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[11], teacher: teachers[2], frames: [[WEDNESDAY, 2]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[11], teacher: teachers[3], frames: [[WEDNESDAY, 3]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[12], teacher: teachers[0], frames: [[WEDNESDAY, 4]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[12], teacher: teachers[1], frames: [[WEDNESDAY, 0]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[13], teacher: teachers[2], frames: [[WEDNESDAY, 1]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[13], teacher: teachers[3], frames: [[WEDNESDAY, 2]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[14], teacher: teachers[0], frames: [[WEDNESDAY, 3]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[14], teacher: teachers[1], frames: [[WEDNESDAY, 4]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[15], teacher: teachers[2], frames: [[THURSDAY, 0]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[15], teacher: teachers[3], frames: [[THURSDAY, 1]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[16], teacher: teachers[0], frames: [[THURSDAY, 2]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[16], teacher: teachers[1], frames: [[THURSDAY, 3]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[17], teacher: teachers[2], frames: [[THURSDAY, 4]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[17], teacher: teachers[3], frames: [[THURSDAY, 0]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[18], teacher: teachers[0], frames: [[THURSDAY, 1]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[18], teacher: teachers[1], frames: [[THURSDAY, 2]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[19], teacher: teachers[2], frames: [[THURSDAY, 3]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[19], teacher: teachers[3], frames: [[THURSDAY, 4]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[20], teacher: teachers[0], frames: [[FRIDAY, 0]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[20], teacher: teachers[0], frames: [[FRIDAY, 1]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[21], teacher: teachers[0], frames: [[FRIDAY, 2]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[21], teacher: teachers[0], frames: [[FRIDAY, 3]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[22], teacher: teachers[0], frames: [[FRIDAY, 4]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[22], teacher: teachers[0], frames: [[FRIDAY, 0]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[23], teacher: teachers[0], frames: [[FRIDAY, 1]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[23], teacher: teachers[0], frames: [[FRIDAY, 2]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[24], teacher: teachers[0], frames: [[FRIDAY, 3]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[24], teacher: teachers[0], frames: [[FRIDAY, 4]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[25], teacher: teachers[1], frames: [[MONDAY, 0]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[25], teacher: teachers[1], frames: [[MONDAY, 1]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[26], teacher: teachers[1], frames: [[MONDAY, 2]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[26], teacher: teachers[1], frames: [[MONDAY, 3]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[27], teacher: teachers[1], frames: [[MONDAY, 4]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[27], teacher: teachers[1], frames: [[MONDAY, 0]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[28], teacher: teachers[1], frames: [[MONDAY, 1]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[28], teacher: teachers[1], frames: [[MONDAY, 2]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '英語', subjectGroups: [subjectGroups[0]], student: students[29], teacher: teachers[1], frames: [[MONDAY, 3]] }),
  // createPersonalSubject(db, { room, startedAt: subjectStartedAt, name: '数学', subjectGroups: [subjectGroups[1]], student: students[29], teacher: teachers[1], frames: [[MONDAY, 4]] })
]

const parents = [
  db.parent.create({
    name: '黒木ヨウイチ',
  }),
  db.parent.create({
    name: '黒木ユカ',
  })
]

db.family.create({
  name    : '黒木家',
  students: [ students[0], students[1] ],
  parents : [ parents[0], parents[1]]
})

relateSchoolAndRooms(db, school, rooms)
relateRoomAndTeachers(db, rooms[0], teachers)
relateRoomAndStudents(db, rooms[0], students)
relateRoomAndSubjects(db, rooms[0], subjects)
relateRoomAndSubjectGroups(db, rooms[0], subjectGroups)

teachers.forEach(teacher => {
  subjectGroups.forEach(subjectGroup => {
    relateTeacherAndSubjectGroup(db, teacher, subjectGroup)
  })
})
