import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import '../styles/globals.css'

function App ({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  )
}

export default App
