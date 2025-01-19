'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
import { css } from '../../../../styled-system/css'
import Header from '../../../components/header'
import Section01 from '../../../parts/aboutMe/Section01'
import Section02 from '../../../parts/aboutMe/Section02'
import Section03 from '../../../parts/aboutMe/Section03'
import Section04 from '../../../parts/aboutMe/Section04'
import AboutMeCube from '../../../parts/aboutMe/AboutMeCube'
import Section05 from '../../../parts/aboutMe/Section05'
import { useTranslation } from '../../i18n/client'

export default function Page({ params: { lng } }) {
  const { t } = useTranslation(lng, 'aboutMe')
  const ref = useRef()
  const [showCube, setShowCube] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setShowCube(true)
    }, 100)

    return () => {
      setShowCube(false)
    }
  }, [])

  const handleCloseKeyboard = () => {
    setShowCube(!showCube)
  }

  return (
    <>
      <div className={HeaderContainer}>
        <Header lng={lng} handleClose={handleCloseKeyboard} />
      </div>
      <div className={TextContentStyle}>
        <Section01 t={t} showSection01={showCube} />
        <Section02 t={t} showSection02={showCube} />
        <Section03 showSection03={showCube} />
        <Section04 t={t} showSection04={showCube} />
        <Section05 t={t} showSection05={showCube} />
      </div>
      <div ref={ref} className={containerStyles}>
        <AboutMeCube showCube={showCube} />
      </div>
    </>
  )
}
const TextContentStyle = css({
  position: 'absolute',
  width: '100%',
  height: '100vh',
  zIndex: 1,
})
const containerStyles = css({
  position: 'relative',
  width: '100%',
  height: '100%',
})

const HeaderContainer = css({ position: 'absolute', zIndex: 10, width: '100%', height: '20vh', overflow: 'auto' })
