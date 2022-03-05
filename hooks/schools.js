import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { ROLE_TYPE } from '../constatnts'
import { db } from '../mocks/db'

export function useCurrentSchoolId () {
  const {
    query: {
      schoolId
    }
  } = useRouter()

  return schoolId
}

export function useAllSchools () {
  return db.school.getAll()
}

export function useSchool (schoolId) {
  return db.school.findFirst({
    where: {
      id: {
        equals: schoolId
      }
    }
  })
}

export function useCurrentSchool () {
  const currentSchoolId = useCurrentSchoolId()
  const currentSchool = useSchool(currentSchoolId)
  return currentSchool
}

export function useSchoolTeachers (schoolId) {
  const school = useSchool(schoolId)
  return useSchoolUserByRoleType(school, ROLE_TYPE.TEACHER)
}

export function useSchoolStudents (schoolId) {
  const school = useSchool(schoolId)
  return useSchoolUserByRoleType(school, ROLE_TYPE.STUDENT)
}

export function useSchoolRooms (schoolId) {
  const school = useSchool(schoolId)
  return school?.rooms
}

export function useSchoolUserByRoleType (school, roleType) {
  const filteredSchoolUsers = useMemo(() => {
    if (!school) return null

    let filteredSchoolUsers = {}

    function append (teacher, room = null) {
      filteredSchoolUsers = {
        ...filteredSchoolUsers,
        [teacher.id]: {
          ...teacher,
          rooms: [
            ...(filteredSchoolUsers[teacher.id]?.rooms || []),
            ...(room ? [room] : [])
          ]
        }
      }
    }

    school.roles.forEach(role => {
      if (role.type === roleType) append(role.user)
    })

    school.rooms.forEach(room => {
      room.roles.forEach(role => {
        if (role.type === roleType) append(role.user, room)
      })
    })

    return Object.values(filteredSchoolUsers)
  }, [school, roleType])

  return filteredSchoolUsers
}
