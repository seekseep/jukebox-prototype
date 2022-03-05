import { add, sub, parseISO } from 'date-fns'
import { factory, nullable, manyOf, oneOf, primaryKey } from '@mswjs/data'
import { LESSON_STATUS, ROLE_TYPE } from '../../constatnts'

const commonColumns = {
  createdAt: () => new Date().getTime(),
  updatedAt: nullable(Number),
  deletedAt: nullable(Number)
}

export const db = factory({
  user: {
    id: primaryKey(() => `${db.user.count() + 1}`),
    name: String,
    birthday: Number,
    ...commonColumns
  },
  authentication: {
    id: primaryKey(() => `${db.authentication.count() + 1}`),
    user: oneOf('user'),
    username: String,
    password: () => 'password',
    ...commonColumns
  },
  lesson: {
    id: primaryKey(() => `${db.lesson.count() + 1}`),
    name: String,
    status: () => LESSON_STATUS.ACTIVE,
    roles: manyOf('role'),
    events: manyOf('event'),
    ...commonColumns
  },
  room: {
    id: primaryKey(() => `${db.room.count() + 1}`),
    name: String,
    roles: manyOf('role'),
    lessons: manyOf('lesson'),
    ...commonColumns
  },
  school: {
    id: primaryKey(() => `${db.school.count() + 1}`),
    name: String,
    rooms: manyOf('room'),
    roles: manyOf('role'),
    ...commonColumns
  },
  event: {
    id: primaryKey(() => `${db.event.count() + 1}`),
    name: String,
    status: () => LESSON_STATUS.ACTIVE,
    roles: manyOf('role'),
    startedAt: Number,
    finishedAt: Number,
    ...commonColumns
  },
  role: {
    id: primaryKey(() => `${db.role.count() + 1}`),
    type: String,
    user: oneOf('user'),
    ...commonColumns
  }
})

function ageToRandomBirthday (age) {
  const now = new Date()
  const start = sub(now, { year: age })
  return add(start, { date: Math.floor(365 * Math.random()) }).getTime()
}

function createRolesFromUsersAndRoleType (users, roleType) {
  return users.map(user => db.role.create({ type: roleType, user }))
}

function createRoles ({ students = [], teachers = [], owners = [], parents = [] }) {
  return [
    ...createRolesFromUsersAndRoleType(owners, ROLE_TYPE.OWNER),
    ...createRolesFromUsersAndRoleType(teachers, ROLE_TYPE.TEACHER),
    ...createRolesFromUsersAndRoleType(students, ROLE_TYPE.STUDENT),
    ...createRolesFromUsersAndRoleType(parents, ROLE_TYPE.PARENT)
  ]
}

function createLessonAndLessonEvents ({ name, teachers, students, eventCount, eventDuration, startedAt: lessonStartedAt, repeatInterval }) {
  return db.lesson.create({
    name,
    roles: createRoles({
      students, teachers
    }),
    events: Array.from({ length: eventCount }).fill(null).map((_, i) => {
      const startedAt = Array.from({ length: i }).fill(null).reduce(startedAt => add(startedAt, repeatInterval), lessonStartedAt)
      const finishedAt = add(startedAt, eventDuration)
      return db.event.create({
        name: `第${i + 1}回 ${name}`,
        startedAt: startedAt.getTime(),
        finishedAt: finishedAt.getTime(),
        roles: createRoles({
          students, teachers
        })
      })
    })
  })
}

const son = db.user.create({ name: '磯野カツオ', birthday: ageToRandomBirthday(11) })
db.authentication.create({ user: son, username: 'katsuo' })

const sonFriend1 = db.user.create({ name: '中島', birthday: ageToRandomBirthday(11) })
db.authentication.create({ user: sonFriend1, username: 'nakajima' })

const sonFriend2 = db.user.create({ name: '花沢花子', birthday: ageToRandomBirthday(11) })
db.authentication.create({ user: sonFriend2, username: 'hanazawa' })

const sonFriend3 = db.user.create({ name: 'かおりちゃん', birthday: ageToRandomBirthday(11) })
db.authentication.create({ user: sonFriend3, username: 'kaori' })

const sonFriend4 = db.user.create({ name: '早川さん', birthday: ageToRandomBirthday(11) })
db.authentication.create({ user: sonFriend4, username: 'hayakawa' })

const sonFriend5 = db.user.create({ name: '橋本', birthday: ageToRandomBirthday(11) })
db.authentication.create({ user: sonFriend5, username: 'hashimoto' })

const sonFriend6 = db.user.create({ name: '西原', birthday: ageToRandomBirthday(11) })
db.authentication.create({ user: sonFriend6, username: 'nishihara' })

const daughter = db.user.create({ name: '磯野ワカメ', birthday: ageToRandomBirthday(9) })
db.authentication.create({ user: daughter, username: 'wakame' })

const daughterFriend1 = db.user.create({ name: 'スズコちゃん', birthday: ageToRandomBirthday(9) })
db.authentication.create({ user: daughterFriend1, username: 'suzuko' })

const daughterFriend2 = db.user.create({ name: 'みゆきちゃん', birthday: ageToRandomBirthday(9) })
db.authentication.create({ user: daughterFriend2, username: 'miyuki' })

const daughterFriend3 = db.user.create({ name: '堀川くん', birthday: ageToRandomBirthday(9) })
db.authentication.create({ user: daughterFriend3, username: 'horikawa' })

const father = db.user.create({ name: '磯野波平' })
db.authentication.create({ user: father, username: 'namihei' })

const principal = db.user.create({ name: '校長先生' })
db.authentication.create({ user: principal, username: 'kocho' })

const sonTeacher = db.user.create({ name: 'カツオの担任の先生' })
db.authentication.create({ user: sonTeacher, username: 'katsuotc' })

const daughterTeacher = db.user.create({ name: 'ワカメの担任の先生' })
db.authentication.create({ user: daughterTeacher, username: 'wakametc' })

const sonRoomTeachers = [
  sonTeacher
]
const sonRoomStudents = [
  son,
  sonFriend1,
  sonFriend2,
  sonFriend3,
  sonFriend4,
  sonFriend5,
  sonFriend6
]

const sonRoom = db.room.create({
  name: '5年3組',
  roles: createRoles({
    teachers: sonRoomTeachers,
    students: sonRoomStudents
  }),
  lessons: [
    createLessonAndLessonEvents({
      name: '国語',
      teachers: sonRoomTeachers,
      students: sonRoomStudents,
      eventCount: 15,
      eventDuration: { minutes: 45 },
      startedAt: parseISO('2023-04-01 09:00'),
      repeatInterval: { weeks: 1 }
    }),
    createLessonAndLessonEvents({
      name: '算数',
      teachers: sonRoomTeachers,
      students: sonRoomStudents,
      eventCount: 15,
      eventDuration: { minutes: 45 },
      startedAt: parseISO('2023-04-01 10:00'),
      repeatInterval: { weeks: 1 }
    })
  ]
})

const daughterRoomTeachers = [daughterTeacher]
const daughterRoomStudents = [
  daughter,
  daughterFriend1,
  daughterFriend2,
  daughterFriend3
]

const daughterRoom = db.room.create({
  name: '3年1組',
  roles: createRoles({
    teachers: daughterRoomTeachers,
    students: daughterRoomStudents
  }),
  lessons: [
    createLessonAndLessonEvents({
      name: '国語',
      teachers: daughterRoomTeachers,
      students: daughterRoomStudents,
      eventCount: 15,
      eventDuration: { minutes: 45 },
      startedAt: parseISO('2023-04-01 09:00'),
      repeatInterval: { weeks: 1 }
    }),
    createLessonAndLessonEvents({
      name: '算数',
      teachers: daughterRoomTeachers,
      students: daughterRoomStudents,
      eventCount: 15,
      eventDuration: { minutes: 45 },
      startedAt: parseISO('2023-04-01 10:00'),
      repeatInterval: { weeks: 1 }
    })
  ]
})

/* const kamomeSchool = */ db.school.create({
  name: 'かもめ第三小学校',
  roles: createRoles({
    owners: [principal]
  }),
  rooms: [
    sonRoom,
    daughterRoom
  ]
})
