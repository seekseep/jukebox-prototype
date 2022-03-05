import { useRouter } from 'next/router'
import { db } from '../mocks/db'

export function useCurrentStudentId () {
  const {
    query: {
      userId
    }
  } = useRouter()
  return userId
}

export function useStudent (studentId) {
  return db.user.findFirst({
    where: {
      id: {
        equals: studentId
      }
    }
  })
}

export function useAllStudents () {
  return db.student.getAll()
}
