import { SWRConfig } from 'swr'

import '../styles/globals.css'

const API_URL_BASE = process.env.NEXT_PUBLIC_API_URL_BASE

if (typeof window !== 'undefined') {
  const { worker } = require('../mocks/browser')
  worker.start()
}

async function fetcher (resource, init) {
  const response = await fetch(`${API_URL_BASE}${resource}`, init)

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.info = await response.json()
    error.status = await response.status
    throw error
  }

  const data = await response.json()
  return data
}

function App ({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        provider: () => new Map(),
        fetcher
      }}>
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default App
