import CssBaseline from '@mui/material/CssBaseline';

function App({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  )
}

export default App
