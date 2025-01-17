'use client'
import Gallery from '../../../parts/gallery/Gallery'
import Header from '../../../components/header'
import { useState, useEffect } from 'react'
import { css } from '../../../../styled-system/css'
import PageTransition from '../../../templates/PageAnimation'
import Footer from '../../../components/footer'

const HeaderContainer = css({ width: '100%', height: '20vh' })
const FlexContainer = css({ width: '100vw', height: '80vh' })

export default function Page({ params: { lng } }) {
  const [showGallery, setShowGallery] = useState(false)

  useEffect(() => {
    setShowGallery(true)
  }, [])

  const handleCloseGallery = () => {
    setShowGallery(!showGallery)
  }

  return (
    <>
      <div className={HeaderContainer}>
        <Header lng={lng} handleClose={handleCloseGallery} />
      </div>
      <div className={FlexContainer}>
        <PageTransition transition={showGallery}>
          <Gallery />
        </PageTransition>
      </div>
      <div className={StyledFooter}>
        <Footer showFooter={showGallery} />
      </div>
    </>
  )
}

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
