'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Canvas, useThree } from '@react-three/fiber'
import { css } from '../../../styled-system/css'
import { useGLTF, Lightformer, Environment, Float, ContactShadows, Text, OrbitControls } from '@react-three/drei'
import { Bloom, EffectComposer, N8AO, TiltShift2 } from '@react-three/postprocessing'
import { Mesh } from 'three'
import { useSpring, animated } from '@react-spring/three'
// import { Keyboard } from '../../components/canvas/Examples'
import ts from 'typescript'
import Header from '../../components/header'
import Section01 from '../../parts/aboutMe/Section01'
import Section02 from '../../parts/aboutMe/Section02'
import Section03 from '../../parts/aboutMe/Section03'
import AboutMeCube from '../../parts/aboutMe/AboutMeCube'

const HeaderContainer = css({ position: 'absolute', zIndex: 10, width: '100%', height: '20vh' })

export default function Page() {
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
        <Header handleClose={handleCloseKeyboard} />
      </div>
      <div className={TextContentStyle}>
        <Section01 showSection01={showCube} />
        <Section02 showSection02={showCube} />
        <Section03 showSection03={showCube} />
      </div>
      <div ref={ref} className={containerStyles}>
        <AboutMeCube showCube={showCube} />
      </div>
    </>
  )
}
const TextContentStyle = css({
  position: 'absolute',
  width: '100vw',
  height: '100vh',
  zIndex: 1,
})
const containerStyles = css({
  position: 'relative',
  width: '100%',
  height: '100%',
})
