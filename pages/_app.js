import '../styles/globals.css'

if (typeof window !== 'undefined') {
  const { worker } = require('../mocks/browser')
  worker.start()
}

function App ({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  )
}

export default App
