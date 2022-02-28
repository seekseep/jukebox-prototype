const API_URL_BASE = process.env.NEXT_PUBLIC_API_URL_BASE

function isGetMethod (method) {
  return method.toUpperCase() === "GET"
}

export async function request (resource, method = "GET", data = null) {
  const url = isGetMethod(method) && data ? (
    `${API_URL_BASE}/${resource}?${new URLSearchParams(data)}`
  ) : `${API_URL_BASE}/${resource}`

  const response = await fetch(url, {
    method,
    body: isGetMethod(method) && data ? JSON.stringify(data) : undefined
  })

  if (!response.ok) {
    const error  = new Error()
    error.message = await response.json().message
    error.status = response.status
    throw error
  }

  const data = await response.json()
  return data
}
