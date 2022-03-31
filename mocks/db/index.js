import { factory, nullable, manyOf, oneOf, primaryKey } from '@mswjs/data'
import { v4 as uuidv4 } from 'uuid'
import { STUDENT_STATUS } from '../../constatnts'

export const db = factory({
  school: {
    id: primaryKey(() => uuidv4()),
    name: String,
  },
  room: {
    id: primaryKey(() => uuidv4()),
    name: String,
    schoolId: String
  },
  student: {
    id: primaryKey(() => uuidv4()),
    name: String,
    roomId: String,
    status: (() => STUDENT_STATUS.ACTIVE),
  }
})

const school1 = db.school.create({ name: "A塾" })

const room1 = db.room.create({ name: "北教室", schoolId: school1.id })
db.room.create({ name: "東教室", schoolId: school1.id })
db.room.create({ name: "南教室", schoolId: school1.id })
db.room.create({ name: "西教室", schoolId: school1.id })

db.student.create({ name: "岩倉具視", roomId: room1.id, })
db.student.create({ name: "木戸孝允", roomId: room1.id, })
db.student.create({ name: "大久保利通", roomId: room1.id, })
db.student.create({ name: "伊藤博文", roomId: room1.id, })
db.student.create({ name: "山口尚芳", roomId: room1.id, })
db.student.create({ name: "田辺太一", roomId: room1.id, })
db.student.create({ name: "何礼之", roomId: room1.id, })
db.student.create({ name: "福地源一郎", roomId: room1.id, })
db.student.create({ name: "渡辺洪基", roomId: room1.id, })
db.student.create({ name: "小松済治", roomId: room1.id, })
db.student.create({ name: "林董三郎", roomId: room1.id, })
db.student.create({ name: "長野桂次郎", roomId: room1.id, })
db.student.create({ name: "川路寛堂", roomId: room1.id, })
db.student.create({ name: "安藤太郎", roomId: room1.id, })
db.student.create({ name: "池田政懋", roomId: room1.id, })
