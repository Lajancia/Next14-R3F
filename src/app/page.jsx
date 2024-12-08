'use client'
import KeyboardParts from '../parts/keyboard/Keyboard'
import Header from '../components/header'
import Info from '../parts/keyboard/Info'
import { css } from '../../styled-system/css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const FlexContainer = css({ display: 'flex', alignItems: 'center', height: '100%' })
const HalfWidthContainer = css({ width: '50%', height: '100%' })

export default function Page() {
  const router = useRouter()
  const [showKeyboard, setShowKeyboard] = useState(true)

  const handleCloseKeyboard = () => {
    setShowKeyboard(!showKeyboard)
  }

  // const navigateToNextPage = () => {
  //   router.push('/gallery')
  // }
  return (
    <>
      <Header handleKeyboard={handleCloseKeyboard} />
      <div className={FlexContainer}>
        <div className={HalfWidthContainer}>
          <KeyboardParts showKeyboard={showKeyboard} />
        </div>
        <div className={HalfWidthContainer}>
          <Info />
        </div>
      </div>
    </>
  )
}
