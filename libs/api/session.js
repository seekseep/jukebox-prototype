import { request } from './request'

export async function getCurrentUser () {
  return request("/session")
}

export async function login (username, password) {
  return request("/session", "POST", { username, password })
}

export async function logout () {
  return request("/session", "DELETE")
}
