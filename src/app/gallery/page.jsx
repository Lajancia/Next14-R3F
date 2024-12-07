'use client'

import Gallery from '../../parts/gallery/Gallery'
import Header from '../../components/header'

import { css } from '../../../styled-system/css'
import { Suspense } from 'react'

const HeaderContainer = css({ width: '100%', height: '20%' })
const FlexContainer = css({ width: '100%', height: '80%' })

export default function Page() {
  return (
    <>
      <div className={HeaderContainer}>
        <Header />
      </div>
      <div className={FlexContainer}>
        <Suspense fallback={null}>
          <Gallery />
        </Suspense>
      </div>
    </>
  )
}
