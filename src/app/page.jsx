'use client'
import KeyboardParts from '@/parts/keyboard/Keyboard'
import Header from '@/components/header'
import Info from '@/parts/keyboard/Info'
import { css } from 'styled-system/css'
const FlexContainer = css({ display: 'flex', alignItems: 'center', height: '100%' })
const HalfWidthContainer = css({ width: '50%', height: '100%' })

export default function Page() {
  return (
    <>
      <Header />
      <div className={FlexContainer}>
        <div className={HalfWidthContainer}>
          <KeyboardParts />
        </div>
        <div className={HalfWidthContainer}>
          <Info />
        </div>
      </div>
    </>
  )
}
