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
import BackgroundText from '../../parts/keyboard/BackgroundText'
import Info from '../../parts/keyboard/Info'
import Keyboards from '../../parts/keyboard/Keyboard'

const HeaderContainer = css({ position: 'absolute', zIndex: 10, width: '100%', height: '20vh' })

export default function Page() {
  const ref = useRef()
  const [showKeyboard, setShowKeyboard] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setShowKeyboard(true)
    }, 100)

    return () => {
      setShowKeyboard(false)
    }
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
        <Canvas
          shadows
          gl={{ logarithmicDepthBuffer: true, antialias: false }}
          dpr={[1, 2]}
          camera={{ position: [0, 10, 2], fov: 30 }}
        >
          <Keyboards showKeyboard={showKeyboard} />
        </Canvas>
      </div>
    </>
  )
}

// function Box({ showKeyboard }) {
//   const shadowRef = useRef()
//   const animatedKeyboardRef = useRef()

//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       const { clientX, clientY } = event
//       const x = (clientX / window.innerWidth - 0.5) * 2 // -1 to 1 range
//       const y = (0.5 - clientY / window.innerHeight) * 2 // -1 to 1 range
//       if (shadowRef.current) {
//         // @ts-ignore
//         shadowRef.current.position.set(x, y, shadowRef.current.position.z) // 조정된 x, y 값을 적용
//       }
//     }
//     window.addEventListener('mousemove', handleMouseMove)
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove)
//     }
//   }, [])

//   const { scale } = useSpring({ scale: showKeyboard ? 0.3 : 0, config: { duration: 200 } })

//   return (
//     <>
//       <ambientLight position={[10, 10, 10]} />
//       <Suspense fallback={null}>
//         <Float ref={animatedKeyboardRef} floatIntensity={2}>
//           {/* @ts-ignore */}
//           <AnimatedKeyboard castShadow scale={scale} position={[-0.5, 0, 0]} rotation={[Math.PI / 1, 3.5, 3]} />
//         </Float>
//       </Suspense>
//       <hemisphereLight intensity={0.5} />
//       <directionalLight
//         castShadow
//         // position={[5, 10, 7.5]}
//         intensity={1}
//         shadow-mapSize-width={2048}
//         shadow-mapSize-height={2048}
//         shadow-camera-far={50}
//         shadow-camera-left={-10}
//         shadow-camera-right={10}
//         shadow-camera-top={10}
//         shadow-camera-bottom={-10}
//       />
//       {/* <ContactShadows ref={shadowRef} resolution={2048} frames={1} scale={40} blur={0.2} opacity={1} far={10} /> */}
//       <Environment preset='city'>
//         <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
//         <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 1]} scale={[10, 1, 1]} />
//         <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 2]} scale={[10, 1, 1]} />
//         <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
//         <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 3]} scale={[10, 1, 1]} />
//         <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 6]} scale={[10, 1, 1]} />
//         <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 9]} scale={[10, 1, 1]} />
//       </Environment>
//     </>
//   )
// }

const TextContentStyle = css({
  position: 'absolute',
  width: '50vw',
  height: '100vh',
  zIndex: 1,
})
const containerStyles = css({
  position: 'relative',
  width: '100%',
  height: '100%',
})
