import { Layout } from '../components/dom/Layout'
import { cookies } from 'next/headers'
import '../../index.css'
// import '@/parts/keyboard/Underlay'
import Underlay from '../parts/keyboard/Underlay'
import { Jersey_25 } from 'next/font/google'

// import { ThemeName, getTheme } from 'styled-system/themes'
const jersey25 = Jersey_25({
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata = {
  title: 'SoominLab Portfolio',
  description: 'A minimal starter for Nextjs + React-three-fiber and Threejs.',
}

export default function RootLayout({ children }) {
  const store = cookies()
  const themeName = store.get('theme')?.value || 'dark'
  const theme = themeName

  return (
    <html lang='en' className='antialiased' data-color-mode={theme}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={jersey25.className}>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        <Underlay />
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
