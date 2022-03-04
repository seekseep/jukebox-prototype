import { factory, manyOf, oneOf, primaryKey } from '@mswjs/data'
import { ROLE_TYPE } from '../../constatnts'

const commonColumns = {
  createdAt: () => new Date(),
  updatedAt: Date,
  deletedAt: Date
}

export const db = factory({
  user: {
    id: primaryKey(() => `${db.user.count() + 1}`),
    name: String,
    birthday: Date,
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
    roles: manyOf('role'),
    startedAt: Date,
    finishedAt: Date,
    status: String,
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
    roles: manyOf('role'),
    startedAt: Date,
    finishedAt: Date,
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
  const startDate = new Date(`${now.getFullYear() - 1}/${now.getMonth() + 1}/${now.getDate()} 00:00:00`)
  return new Date(startDate.getTime() + Math.floor(Math.random() * 364 * 12 * 30 * 24 * 60 * 60 * 10000))
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

const ONE_MINUTE = 60 * 1000
const ONE_DAY = 24 * 60 * 60 * 1000
const ONE_WEEK = ONE_DAY * 7

function createLessonAndLessonEvents ({ name, teachers, students, eventCount, eventDuration, startedAt, repeatInterval }) {
  return db.lesson.create({
    name,
    roles: createRoles({
      students, teachers
    }),
    events: Array.from({ length: eventCount }).fill(null).map((_, i) =>
      db.event.create({
        name: `第${i + 1}回 ${name}`,
        startedAt: startedAt + new Date(repeatInterval * i),
        finishedAt: startedAt + new Date(repeatInterval * i) + new Date(eventDuration),
        roles: createRoles({
          students, teachers
        })
      })
    )
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
      eventDuration: 45 * ONE_MINUTE,
      startedAt: new Date('2023/04/01 9:00'),
      repeatInterval: ONE_WEEK
    }),
    createLessonAndLessonEvents({
      name: '算数',
      teachers: sonRoomTeachers,
      students: sonRoomStudents,
      eventCount: 15,
      eventDuration: 45 * ONE_MINUTE,
      startedAt: new Date('2023/04/01 10:00'),
      repeatInterval: ONE_WEEK
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
      eventDuration: 45 * ONE_MINUTE,
      startedAt: new Date('2023/04/01 9:00'),
      repeatInterval: ONE_WEEK
    }),
    createLessonAndLessonEvents({
      name: '算数',
      teachers: daughterRoomTeachers,
      students: daughterRoomStudents,
      eventCount: 15,
      eventDuration: 45 * ONE_MINUTE,
      startedAt: new Date('2023/04/01 10:00'),
      repeatInterval: ONE_WEEK
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
