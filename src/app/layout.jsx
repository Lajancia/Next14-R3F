import { Layout } from '@/components/dom/Layout'
import '@/global.css'
import '@/parts/keyboard/Underlay'
import Underlay from '@/parts/keyboard/Underlay'
import { Jersey_25 } from 'next/font/google'

const jersey25 = Jersey_25({
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata = {
  title: 'Next.js + Three.js',
  description: 'A minimal starter for Nextjs + React-three-fiber and Threejs.',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='antialiased'>
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
