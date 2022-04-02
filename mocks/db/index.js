import { factory, manyOf, nullable, oneOf, primaryKey } from '@mswjs/data'
import {
  relateSchoolAndRooms,
  relateRoomAndTeachers,
  relateRoomAndStudents,
  relateRoomAndSubjects,
  relateStudentAndSubject,
  createModelId,
  createSubjectWithLessons,
  createBasicStudentScheduleRules
} from './serviceis'

export const db = factory({
  school: {
    id: primaryKey(() => createModelId()),
    name: String,
    rooms: manyOf("room")
  },
  room: {
    id: primaryKey(() => createModelId()),
    name: String,
    school: oneOf("school"),
    students: manyOf("student"),
    subjects: manyOf("subject"),
    teachers: manyOf("teacher"),
    students: manyOf("student"),
  },
  student: {
    id: primaryKey(() => createModelId()),
    name: String,
    scheduleRules: manyOf("scheduleRule"),
    room: oneOf("room"),
    subjects: manyOf("subject"),
  },
  scheduleRule: {
    id: primaryKey(() => createModelId()),
    type: String,
    startedAt: Number,
    finishedAt: Number,
    repeat: {
      term: nullable(String),
      finishedAt: nullable(Number),
    }
  },
  teacher: {
    id: primaryKey(() => createModelId()),
    name: String,
    room: oneOf("room")
  },
  subject: {
    id: primaryKey(() => createModelId()),
    room: oneOf("room"),
    students: manyOf("student"),
    lessons: manyOf("lesson"),
    name: String
  },
  lesson: {
    id: primaryKey(() => createModelId()),
    name: String,
    subejct: oneOf("subject")
  },
})

const school = db.school.create({ name: "A塾" })

const rooms = [
  db.room.create({ name: "北教室" }),
  db.room.create({ name: "東教室" }),
  db.room.create({ name: "南教室" }),
  db.room.create({ name: "西教室" }),
]

const teachers = [
  db.teacher.create({ name: "岩倉具視" }),
  db.teacher.create({ name: "木戸孝允" }),
  db.teacher.create({ name: "大久保利通" }),
]

const students = [
  db.student.create({
    name: "伊藤博文",
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name: "山口尚芳",
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name: "田辺太一",
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name: "何礼之",
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name: "福地源一郎",
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name: "渡辺洪基",
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name: "小松済治",
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name: "林董三郎",
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name: "長野桂次郎",
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name: "川路寛堂",
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name: "安藤太郎",
    scheduleRules: createBasicStudentScheduleRules(db),
  }),
  db.student.create({
    name: "池田政懋",
    scheduleRules: createBasicStudentScheduleRules(db),
  })
]

const subjects = [
  createSubjectWithLessons(db, {
    name: "一斉英語"
  }, {
    count: 4,
    name: (subject, index) => `${subject.name} ${index+1}回目`,
  }),
  createSubjectWithLessons(db, {
    name: "個人英語"
  }, {
    count: 4,
    name: (subject, index) => `${subject.name} ${index+1}回目`,

  }),
  createSubjectWithLessons(db, {
    name: "個人数学"
  }, {
    count: 4,
    name: (subject, index) => `${subject.name} ${index+1}回目`,
  })
]

relateSchoolAndRooms(db, school, rooms)
relateRoomAndTeachers(db, rooms[0], teachers)
relateRoomAndStudents(db, rooms[0], students)
relateRoomAndSubjects(db, rooms[0], subjects)

students.forEach(student => {
  relateStudentAndSubject(db, student, subjects[0])
})
relateStudentAndSubject(db, students[0], subjects[1])
relateStudentAndSubject(db, students[0], subjects[2])
