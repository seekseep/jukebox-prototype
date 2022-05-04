import { factory, manyOf, nullable, oneOf, primaryKey } from '@mswjs/data'
import { format } from 'date-fns'

import { SCHEDULE_STATUS, WEEK_DAY } from '../../constatnts'
import {
  createModelId,
  createPersonalSubject,
  createTeacher,
  createStudent,
  createRoom,
  createMothlySchedule,
} from './serviceis'

const scheduleRuleDefinition = {
  type      : String,
  startedAt : Date,
  finishedAt: Date,
  repeat    : {
    term      : nullable(String),
    finishedAt: nullable(Date),
  }
}

const frameDefinision = {
  start: {
    hours  : Number,
    minutes: Number,
  },
  finish: {
    hours  : Number,
    minutes: Number,
  }
}

const scheduleUnitDefinition = {
  term : String,
  value: Number,
}

const lessonDefinition = {
  name      : String,
  startedAt : Number,
  finishedAt: Number,
  teachers  : manyOf('teacher')
}

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
  parent: {
    id      : primaryKey(() => createModelId()),
    name    : String,
    families: manyOf('family')
  },
  room: {
    id                : primaryKey(() => createModelId()),
    name              : String,
    businessStartHour : Number,
    businessFinishHour: Number,
    scheduleUnit      : scheduleUnitDefinition,
    frameConditions   : [{
      name : String,
      rules: [{
        day   : Number,
        frames: {
          start: {
            hours  : Number,
            minutes: Number
          },
          finish: {
            hours  : Number,
            minutes: Number
          },
        }
      }]
    }],
    scheduleRules: [scheduleRuleDefinition],
    school       : oneOf('school'),
    students     : manyOf('student'),
    subjects     : manyOf('subject'),
    teachers     : manyOf('teacher'),
    students     : manyOf('student'),
    schedules    : manyOf('schedule'),
  },
  student: {
    id           : primaryKey(() => createModelId()),
    name         : String,
    scheduleRules: [scheduleRuleDefinition],
    subjects     : manyOf('subject'),
    schedules    : manyOf('schedule'),
  },
  teacher: {
    id           : primaryKey(() => createModelId()),
    name         : String,
    scheduleRules: [scheduleRuleDefinition],
    subjectTags  : [String]
  },
  subject: {
    id                : primaryKey(() => createModelId()),
    name              : String,
    tags              : [String],
    students          : manyOf('student'),
    frameConditionName: String,
    frames            : [{ day: Number, index: Number }],
    lessons           : [lessonDefinition]
  },
  schedule: {
    id        : primaryKey(() => createModelId()),
    status    : String,
    startedAt : Date,
    finishedAt: Date,
  },
})

const school = db.school.create({ name: 'A塾' })

const rooms = [
  createRoom(db, school, {
    name     : '北教室',
    schedules: [
      createMothlySchedule(db, new Date(2022, 2), { status: SCHEDULE_STATUS.PUBLISHED }),
      createMothlySchedule(db, new Date(2022, 3), { status: SCHEDULE_STATUS.SUBMITTED }),
    ]
  }),
  createRoom(db, school, { name: '東教室' }),
  createRoom(db, school, { name: '西教室' }),
  createRoom(db, school, { name: '南教室' }),
]

const [room] = rooms

const teachers = [
  createTeacher(db, room, { name: '若松貴文', subjectTags: ['英語', '数学'], }),
  createTeacher(db, room, { name: '金井ともみ', subjectTags: ['英語', '数学'], }),
  createTeacher(db, room, { name: '山川為春', subjectTags: ['英語', '数学'], }),
  createTeacher(db, room, { name: '小山聖紘', subjectTags: ['英語' ], }),
  createTeacher(db, room, { name: '水野光高', subjectTags: ['英語' ], }),
  createTeacher(db, room, { name: '飯塚昌彦', subjectTags: ['英語' ], }),
  createTeacher(db, room, { name: '柏原宗太郎', subjectTags: ['英語' ], }),
  createTeacher(db, room, { name: '金本健由', subjectTags: ['数学'], }),
  createTeacher(db, room, { name: '庄籠朱鷺', subjectTags: ['数学'], }),
  createTeacher(db, room, { name: '川北伊瀬', subjectTags: ['数学'], }),
]

const students = [
  createStudent(db, room, { name: '黒木ユウイチ' }),
  createStudent(db, room, { name: '黒木ミカ' }),
  createStudent(db, room, { name: '和井健吉' }),
  createStudent(db, room, { name: '満尾稔江' }),
  createStudent(db, room, { name: '長光寿々彦' }),
  createStudent(db, room, { name: '中川美保' }),
  createStudent(db, room, { name: '樫原滝造' }),
  createStudent(db, room, { name: '矢部静代' }),
  createStudent(db, room, { name: '米田秋穂' }),
  createStudent(db, room, { name: '横江雪音' }),
  createStudent(db, room, { name: '長尾茅' }),
  createStudent(db, room, { name: '福安小都音' }),
  createStudent(db, room, { name: '遠山岩之介' }),
  createStudent(db, room, { name: '川北伊瀬' }),
  createStudent(db, room, { name: '井沢明里' }),
  createStudent(db, room, { name: '室谷恵里子' }),
  createStudent(db, room, { name: '阪田吉乃' }),
  createStudent(db, room, { name: '武山慶樹' }),
  createStudent(db, room, { name: '上野柚吾' }),
  createStudent(db, room, { name: '川辺滝三' }),
  createStudent(db, room, { name: '小山かおり' }),
  createStudent(db, room, { name: '香村寛顕' }),
  createStudent(db, room, { name: '篠原葉月' }),
  createStudent(db, room, { name: '篠崎理津子' }),
  createStudent(db, room, { name: '大西美鈴' }),
  createStudent(db, room, { name: '沢井七' }),
  createStudent(db, room, { name: '井出湊也' }),
  createStudent(db, room, { name: '花村英範' }),
  createStudent(db, room, { name: '金本健由' }),
  createStudent(db, room, { name: '籠辰兵衛' }),
  createStudent(db, room, { name: '福本真之' }),
]

const { MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY } = WEEK_DAY
const frameConditionName = room.frameConditions[0].name

room.schedules.forEach(schedule => {
  const { startedAt } = schedule
  createPersonalSubject(db, room, students[0], '英語', startedAt, frameConditionName, [[MONDAY, 0]], teachers[0]),
  createPersonalSubject(db, room, students[0], '数学', startedAt, frameConditionName, [[TUESDAY, 1]], teachers[1]),
  createPersonalSubject(db, room, students[1], '英語', startedAt, frameConditionName, [[WEDNESDAY, 2]], teachers[2]),
  createPersonalSubject(db, room, students[1], '数学', startedAt, frameConditionName, [[THURSDAY, 3]], teachers[3]),
  createPersonalSubject(db, room, students[2], '英語', startedAt, frameConditionName, [[FRIDAY, 4]], teachers[0]),
  createPersonalSubject(db, room, students[2], '数学', startedAt, frameConditionName, [[MONDAY, 0]], teachers[1]),
  createPersonalSubject(db, room, students[3], '英語', startedAt, frameConditionName, [[TUESDAY, 1]], teachers[2]),
  createPersonalSubject(db, room, students[3], '数学', startedAt, frameConditionName, [[WEDNESDAY, 2]], teachers[3]),
  createPersonalSubject(db, room, students[4], '英語', startedAt, frameConditionName, [[THURSDAY, 3]], teachers[0]),
  createPersonalSubject(db, room, students[4], '数学', startedAt, frameConditionName, [[FRIDAY, 4]], teachers[1]),
  createPersonalSubject(db, room, students[5], '英語', startedAt, frameConditionName, [[MONDAY, 0]], teachers[2]),
  createPersonalSubject(db, room, students[5], '数学', startedAt, frameConditionName, [[TUESDAY, 1]], teachers[3]),
  createPersonalSubject(db, room, students[6], '英語', startedAt, frameConditionName, [[WEDNESDAY, 2]], teachers[0]),
  createPersonalSubject(db, room, students[6], '数学', startedAt, frameConditionName, [[THURSDAY, 3]], teachers[1]),
  createPersonalSubject(db, room, students[7], '英語', startedAt, frameConditionName, [[FRIDAY, 4]], teachers[2]),
  createPersonalSubject(db, room, students[7], '数学', startedAt, frameConditionName, [[MONDAY, 0]], teachers[3]),
  createPersonalSubject(db, room, students[8], '英語', startedAt, frameConditionName, [[TUESDAY, 1]], teachers[0]),
  createPersonalSubject(db, room, students[8], '数学', startedAt, frameConditionName, [[WEDNESDAY, 2]], teachers[1]),
  createPersonalSubject(db, room, students[9], '英語', startedAt, frameConditionName, [[THURSDAY, 3]], teachers[2]),
  createPersonalSubject(db, room, students[9], '数学', startedAt, frameConditionName, [[FRIDAY, 4]], teachers[3]),
  createPersonalSubject(db, room, students[10], '英語', startedAt, frameConditionName, [[MONDAY, 0]], teachers[0]),
  createPersonalSubject(db, room, students[10], '数学', startedAt, frameConditionName, [[WEDNESDAY, 1]], teachers[1]),
  createPersonalSubject(db, room, students[11], '英語', startedAt, frameConditionName, [[WEDNESDAY, 2]], teachers[2]),
  createPersonalSubject(db, room, students[11], '数学', startedAt, frameConditionName, [[WEDNESDAY, 3]], teachers[3]),
  createPersonalSubject(db, room, students[12], '英語', startedAt, frameConditionName, [[WEDNESDAY, 4]], teachers[0]),
  createPersonalSubject(db, room, students[12], '数学', startedAt, frameConditionName, [[WEDNESDAY, 0]], teachers[1]),
  createPersonalSubject(db, room, students[13], '英語', startedAt, frameConditionName, [[WEDNESDAY, 1]], teachers[2]),
  createPersonalSubject(db, room, students[13], '数学', startedAt, frameConditionName, [[WEDNESDAY, 2]], teachers[3]),
  createPersonalSubject(db, room, students[14], '英語', startedAt, frameConditionName, [[WEDNESDAY, 3]], teachers[0]),
  createPersonalSubject(db, room, students[14], '数学', startedAt, frameConditionName, [[WEDNESDAY, 4]], teachers[1]),
  createPersonalSubject(db, room, students[15], '英語', startedAt, frameConditionName, [[THURSDAY, 0]], teachers[2]),
  createPersonalSubject(db, room, students[15], '数学', startedAt, frameConditionName, [[THURSDAY, 1]], teachers[3]),
  createPersonalSubject(db, room, students[16], '英語', startedAt, frameConditionName, [[THURSDAY, 2]], teachers[0]),
  createPersonalSubject(db, room, students[16], '数学', startedAt, frameConditionName, [[THURSDAY, 3]], teachers[1]),
  createPersonalSubject(db, room, students[17], '英語', startedAt, frameConditionName, [[THURSDAY, 4]], teachers[2]),
  createPersonalSubject(db, room, students[17], '数学', startedAt, frameConditionName, [[THURSDAY, 0]], teachers[3]),
  createPersonalSubject(db, room, students[18], '英語', startedAt, frameConditionName, [[THURSDAY, 1]], teachers[0]),
  createPersonalSubject(db, room, students[18], '数学', startedAt, frameConditionName, [[THURSDAY, 2]], teachers[1]),
  createPersonalSubject(db, room, students[19], '英語', startedAt, frameConditionName, [[THURSDAY, 3]], teachers[2]),
  createPersonalSubject(db, room, students[19], '数学', startedAt, frameConditionName, [[THURSDAY, 4]], teachers[3]),
  createPersonalSubject(db, room, students[20], '英語', startedAt, frameConditionName, [[FRIDAY, 0]], teachers[0]),
  createPersonalSubject(db, room, students[20], '数学', startedAt, frameConditionName, [[FRIDAY, 1]], teachers[0]),
  createPersonalSubject(db, room, students[21], '英語', startedAt, frameConditionName, [[FRIDAY, 2]], teachers[0]),
  createPersonalSubject(db, room, students[21], '数学', startedAt, frameConditionName, [[FRIDAY, 3]], teachers[0]),
  createPersonalSubject(db, room, students[22], '英語', startedAt, frameConditionName, [[FRIDAY, 4]], teachers[0]),
  createPersonalSubject(db, room, students[22], '数学', startedAt, frameConditionName, [[FRIDAY, 0]], teachers[0]),
  createPersonalSubject(db, room, students[23], '英語', startedAt, frameConditionName, [[FRIDAY, 1]], teachers[0]),
  createPersonalSubject(db, room, students[23], '数学', startedAt, frameConditionName, [[FRIDAY, 2]], teachers[0]),
  createPersonalSubject(db, room, students[24], '英語', startedAt, frameConditionName, [[FRIDAY, 3]], teachers[0]),
  createPersonalSubject(db, room, students[24], '数学', startedAt, frameConditionName, [[FRIDAY, 4]], teachers[0]),
  createPersonalSubject(db, room, students[25], '英語', startedAt, frameConditionName, [[MONDAY, 0]], teachers[1]),
  createPersonalSubject(db, room, students[25], '数学', startedAt, frameConditionName, [[MONDAY, 1]], teachers[1]),
  createPersonalSubject(db, room, students[26], '英語', startedAt, frameConditionName, [[MONDAY, 2]], teachers[1]),
  createPersonalSubject(db, room, students[26], '数学', startedAt, frameConditionName, [[MONDAY, 3]], teachers[1]),
  createPersonalSubject(db, room, students[27], '英語', startedAt, frameConditionName, [[MONDAY, 4]], teachers[1]),
  createPersonalSubject(db, room, students[27], '数学', startedAt, frameConditionName, [[MONDAY, 0]], teachers[1]),
  createPersonalSubject(db, room, students[28], '英語', startedAt, frameConditionName, [[MONDAY, 1]], teachers[1]),
  createPersonalSubject(db, room, students[28], '数学', startedAt, frameConditionName, [[MONDAY, 2]], teachers[1]),
  createPersonalSubject(db, room, students[29], '英語', startedAt, frameConditionName, [[MONDAY, 3]], teachers[1]),
  createPersonalSubject(db, room, students[29], '数学', startedAt, frameConditionName, [[MONDAY, 4]], teachers[1])
})

const parents = [
  db.parent.create({ name: '黒木ヨウイチ' }),
  db.parent.create({ name: '黒木ユカ' })
]

db.family.create({
  name    : '黒木家',
  students: [ students[0], students[1] ],
  parents : [ parents[0], parents[1]]
})
