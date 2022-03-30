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
    ...commonColumns
  },
  role: {
    id: primaryKey(() => `${db.role.count() + 1}`),
    type: String,
    user: oneOf('user'),
    ...commonColumns
  },
  authentication: {
    id: primaryKey(() => `${db.authentication.count() + 1}`),
    user: oneOf('user'),
    username: String,
    password: () => 'password',
    ...commonColumns
  },
  subject: {
    id: primaryKey(() => `${db.subject.count() + 1}`),
    name: String,
    roles: manyOf('role'),
    lessons: manyOf('lesson'),
    ...commonColumns
  },
  lesson: {
    id: primaryKey(() => `${db.lesson.count() + 1}`),
    name: String,
    roles: manyOf('role'),
    events: manyOf('event'),
    ...commonColumns
  },
  school: {
    id: primaryKey(() => `${db.school.count() + 1}`),
    name: String,
    rooms: manyOf('room'),
    roles: manyOf('role'),
    ...commonColumns
  },
  room: {
    id: primaryKey(() => `${db.room.count() + 1}`),
    name: String,
    roles: manyOf('role'),
    lessons: manyOf('lesson'),
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
})

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

function createSubject ({ name, students = [], lessonCount = 0 }) {
  return db.subject.create({
    name,
    roles: createRoles({ students }),
    lessons: Array.from({ length: lessonCount }).fill(null).map((_, index) =>
      db.lesson.create({
        name: `${name} - ${index + 1}`,

      })
    )
  })
}


const son = db.user.create({ name: '磯野カツオ' })
db.authentication.create({ user: son, username: 'katsuo' })

const sonFriend1 = db.user.create({ name: '中島' })
db.authentication.create({ user: sonFriend1, username: 'nakajima' })

const sonFriend2 = db.user.create({ name: '花沢花子' })
db.authentication.create({ user: sonFriend2, username: 'hanazawa' })

const sonFriend3 = db.user.create({ name: 'かおりちゃん' })
db.authentication.create({ user: sonFriend3, username: 'kaori' })

const sonFriend4 = db.user.create({ name: '早川さん' })
db.authentication.create({ user: sonFriend4, username: 'hayakawa' })

const sonFriend5 = db.user.create({ name: '橋本' })
db.authentication.create({ user: sonFriend5, username: 'hashimoto' })

const sonFriend6 = db.user.create({ name: '西原' })
db.authentication.create({ user: sonFriend6, username: 'nishihara' })

const daughter = db.user.create({ name: '磯野ワカメ' })
db.authentication.create({ user: daughter, username: 'wakame' })

const daughterFriend1 = db.user.create({ name: 'スズコちゃん' })
db.authentication.create({ user: daughterFriend1, username: 'suzuko' })

const daughterFriend2 = db.user.create({ name: 'みゆきちゃん' })
db.authentication.create({ user: daughterFriend2, username: 'miyuki' })

const daughterFriend3 = db.user.create({ name: '堀川くん' })
db.authentication.create({ user: daughterFriend3, username: 'horikawa' })

const father = db.user.create({ name: '磯野波平' })
db.authentication.create({ user: father, username: 'namihei' })

const principal = db.user.create({ name: '校長先生' })
db.authentication.create({ user: principal, username: 'kocho' })

const sonRoomTeacher1 = db.user.create({ name: 'カツオの担任の先生' })
db.authentication.create({ user: sonRoomTeacher1, username: 'katsuotc' })

const sonRoomTeacher2 = db.user.create({ name: '背黒純子' })
db.authentication.create({ user: sonRoomTeacher2, username: 'katsuotc' })

const sonRoomTeacher3 = db.user.create({ name: '黒若はじめ' })
db.authentication.create({ user: sonRoomTeacher3, username: 'katsuotc' })

const daughterRoomTeacher1 = db.user.create({ name: 'ワカメの担任の先生' })
db.authentication.create({ user: daughterRoomTeacher1, username: 'wakametc' })

const daughterRoomTeacher2 = db.user.create({ name: '藁井彩音' })
db.authentication.create({ user: daughterRoomTeacher2, username: 'wakametc' })

const daughterRoomTeacher3 = db.user.create({ name: '木脚正人' })
db.authentication.create({ user: daughterRoomTeacher3, username: 'wakametc' })

const sonRoomTeachers = [
  sonRoomTeacher1,
  sonRoomTeacher2,
  sonRoomTeacher3
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
  lessons: []
})

const daughterRoomTeachers = [
  daughterRoomTeacher1,
  daughterRoomTeacher2,
  daughterRoomTeacher3
]
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
  lessons: []
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
