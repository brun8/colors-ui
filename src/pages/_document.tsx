import { useAtom } from 'jotai'
import { Html, Head, Main, NextScript } from 'next/document'
import { themeAtom } from 'store/theme'

export default function Document() {
  const [theme] = useAtom(themeAtom)

  return (
    <Html className={`${theme}`}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
