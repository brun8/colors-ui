import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      className='
        min-h-screen flex flex-col
        antialiased
        transition-colors ease-in-out duration-150
        dark:bg-gray-900 dark:text-gray-200 bg-gray-100 text-gray-900;
      '
    >
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
