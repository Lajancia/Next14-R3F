'use client'
import Gallery from '../../parts/gallery/Gallery'
import Header from '../../components/header'
import { useState, useEffect } from 'react'
import { css } from '../../../styled-system/css'
import PageTransition from '../../templates/PageAnimation'

const HeaderContainer = css({ width: '100%', height: '20%' })
const FlexContainer = css({ width: '100%', height: '80%' })

export default function Page() {
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
        <Header handleClose={handleCloseGallery} />
      </div>
      <div className={FlexContainer}>
        <PageTransition transition={showGallery}>
          <Gallery />
        </PageTransition>
      </div>
    </>
  )
}
