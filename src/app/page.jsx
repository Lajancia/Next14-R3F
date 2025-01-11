'use client'
import KeyboardParts from '../parts/keyboard/Keyboard'
import Header from '../components/header'
import Info from '../parts/keyboard/Info'
import { css } from '../../styled-system/css'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const FlexContainer = css({ display: 'flex', alignItems: 'center', height: '100%' })
const HalfWidthContainer = css({ width: '50%', height: '100%' })
const HalfWidthInfoContainer = css({ width: '50%', height: '70%' })

export default function Page() {
  const [showKeyboard, setShowKeyboard] = useState(false)

  useEffect(() => {
    setShowKeyboard(true)
  }, [])

  const handleCloseKeyboard = () => {
    setShowKeyboard(!showKeyboard)
  }

  return (
    <>
      <Header handleClose={handleCloseKeyboard} />
      <div className={FlexContainer}>
        <div className={HalfWidthContainer}>
          <KeyboardParts showKeyboard={showKeyboard} />
        </div>
        <div className={HalfWidthInfoContainer}>
          <Info showKeyboard={showKeyboard} />
        </div>
      </div>
    </>
  )
}
