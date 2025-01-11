'use client'
import KeyboardParts from '../parts/keyboard/Keyboard'
import Header from '../components/header'
import Info from '../parts/keyboard/Info'
import { css } from '../../styled-system/css'
import { useEffect, useState, useRef } from 'react'
import BackgroundText from '../parts/keyboard/BackgroundText'
import Keyboards from '../parts/keyboard/Keyboard'
import { Canvas } from '@react-three/fiber'
const FlexContainer = css({ display: 'flex', alignItems: 'center', height: '100vh', width: '100vw' })
const HalfWidthContainer = css({ width: '50%', height: '100%' })
const HalfWidthInfoContainer = css({ width: '50%', height: '70%' })

export default function Page() {
  const ref = useRef()
  const [showKeyboard, setShowKeyboard] = useState(false)

  useEffect(() => {
    setShowKeyboard(true)
  }, [])

  const handleCloseKeyboard = () => {
    setShowKeyboard(!showKeyboard)
  }

  return (
    <>
      <div className={HeaderContainer}>
        <Header handleClose={handleCloseKeyboard} />
      </div>
      <div className={TextContentStyle}>
        <Info showKeyboard={showKeyboard} />
      </div>
      <div ref={ref} className={containerStyles}>
        <BackgroundText showKeyboard={showKeyboard} />
        <Keyboards showKeyboard={showKeyboard} />
      </div>
    </>
  )
}

const HeaderContainer = css({ position: 'absolute', zIndex: 10, width: '100%', height: '20vh' })

const TextContentStyle = css({
  position: 'absolute',
  width: '50vw',
  height: '100vh',
  zIndex: 1,
})
const containerStyles = css({
  width: '100vw',
  height: '100vh',
  zIndex: 0,
})
