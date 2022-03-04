import { rest } from 'msw'

import { db } from './db'

const API_URL_BASE = process.env.NEXT_PUBLIC_API_URL_BASE

function apiPath (pathname) {
  return `${API_URL_BASE}${pathname}`
}

export const handlers = [
  // rest.get(apiPath('/session'), (req, res, ctx) => {
  //   const currentUserId = sessionStorage.getItem('current-user-id')
  //   const currentUser = db.users.findFirst({
  //     where: {
  //       userId: currentUserId
  //     }
  //   })

  //   return res(
  //     ctx.status(200),
  //     ctx.json(currentUser ? currentUser : null)
  //   )
  // }),
  // rest.post(apiPath('/session'), (req, res, ctx) => {
  //   const { username } = req.body

  //   const authentication = db.authentications.findFirst({
  //     where: {
  //       username: {
  //         equals: username
  //       }
  //     }
  //   })

  //   sessionStorage.setItem('current-user-id', authentication.userId)

  //   return res(
  //     ctx.status(200),
  //   )
  // }),
  // rest.delete(apiPath('/session'), (req, res, ctx) => {
  //   sessionStorage.removeItem('current-user-id')
  //   return res(
  //     ctx.status(200),
  //   )
  // }),
  // rest.get('/api/user', (req, res, ctx) => {
  //   // Check if the user is authenticated in this session
  //   const isAuthenticated = sessionStorage.getItem('is-authenticated')
  //   if (!isAuthenticated) {
  //     // If not authenticated, respond with a 403 error
  //     return res(
  //       ctx.status(403),
  //       ctx.json({
  //         errorMessage: 'Not authorized',
  //       }),
  //     )
  //   }
  //   // If authenticated, return a mocked user details
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       username: 'admin',
  //     }),
  //   )
  // }),
  // ...db.teacher.toHandlers('rest', `${API_URL_BASE}/teachers`),
  // ...db.student.toHandlers('rest', `${API_URL_BASE}/students`),
  // ...db.school.toHandlers('rest', `${API_URL_BASE}/schools`),
  // ...db.room.toHandlers('rest', `${API_URL_BASE}/rooms`),
  // ...db.lesson.toHandlers('rest', `${API_URL_BASE}/lessons`),
  // ...db.userRole.toHandlers('rest', `${API_URL_BASE}/userRoles`),
  // ...db.schoolRole.toHandlers('rest', `${API_URL_BASE}/schoolRoles`),
  // ...db.roomRole.toHandlers('rest', `${API_URL_BASE}/roomRoles`)
]
