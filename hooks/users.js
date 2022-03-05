import { useRouter } from 'next/router'
import { db } from '../mocks/db'

export function useCurrentUserId () {
  const {
    query: {
      userId
    }
  } = useRouter()
  return userId
}

export function useUser (userId) {
  return db.user.findFirst({
    where: {
      id: {
        equals: userId
      }
    }
  })
}

export function useAllUsers () {
  return db.user.getAll()
}
