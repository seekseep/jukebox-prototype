import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import '@/styles/globals.css'

import { AuthProvider } from '@/hooks/auth'

function App ({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <ToastContainer />
    </>
  )
}

export default App
