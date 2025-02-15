'use client'

import Gallery from '../../../parts/gallery/Gallery'
import Header from '../../../components/Header'
import { useState, useEffect } from 'react'
import PageTransition from '../../../templates/PageAnimation'
import Footer from '../../../components/Footer'
import { StyledHeaderContainer, StyledFlexContainer, StyledFooter } from './styles'

type PageProps = {
  params: {
    lng: string
  }
}

export default function Page({ params: { lng } }: PageProps) {
  const [showGallery, setShowGallery] = useState(false)

  useEffect(() => {
    setShowGallery(true)
  }, [])

  const handleCloseGallery = () => {
    setShowGallery(!showGallery)
  }

  return (
    <>
      <div className={StyledHeaderContainer}>
        <Header lng={lng} handleClose={handleCloseGallery} />
      </div>
      <div className={StyledFlexContainer}>
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
