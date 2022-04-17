import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className='min-h-screen flex flex-col'>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
