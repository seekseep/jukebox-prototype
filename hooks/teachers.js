import { useRouter } from 'next/router'
import { db } from '../mocks/db'

export function useCurrentTeacherId () {
  const {
    query: {
      userId
    }
  } = useRouter()
  return userId
}

export function useTeacher (teacherId) {
  return db.user.findFirst({
    where: {
      id: {
        equals: teacherId
      }
    }
  })
}

export function useAllTeachers () {
  return db.teacher.getAll()
}
