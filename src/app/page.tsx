'use client'
import KeyboardParts from '../parts/keyboard/Keyboard'
import Header from '../components/header'
import Info from '../parts/keyboard/Info'
import { css } from '../../styled-system/css'
import { useEffect, useState, useRef } from 'react'
import BackgroundText from '../parts/keyboard/BackgroundText'
import Keyboards from '../parts/keyboard/Keyboard'
import Footer from '../components/footer'
import { easing } from 'maath'

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
      <div className={StyledFooter}>
        <Footer showFooter={showKeyboard} />
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
  pointerEvents: 'none',
})
const containerStyles = css({
  width: '100vw',
  height: '100vh',
  zIndex: 0,
})

const StyledFooter = css({
  overflow: 'hidden',
  zIndex: 1,
  position: 'absolute',
  bottom: 0,
  height: '10vh',
  display: 'flex',
  justifyContent: 'center',

  alignItems: 'center',
  width: '100%',
})
