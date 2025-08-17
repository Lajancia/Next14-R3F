import { Suspense, use, useEffect, useState, useRef } from 'react'
import {
  Lightformer,
  Environment,
  Float,
  ContactShadows,
  Text,
  OrbitControls,
  Html,
  useProgress,
} from '@react-three/drei'
import { css } from '../../../styled-system/css'
import { useSpring, animated } from '@react-spring/three'
import { Bike } from '../../components/canvas/Examples'
import { Canvas } from '@react-three/fiber'

const AnimatedBike = animated(Bike)

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className={StyledLoader}> {progress} % loaded</div>
    </Html>
  )
}

export default function Motorcycle({ showBike, scaleSet }: any) {
  const shadowRef = useRef()
  const animatedKeyboardRef = useRef()

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      const { clientX, clientY } = event
      const x = (clientX / window.innerWidth - 0.5) * 2 // -1 to 1 range
      const y = (0.5 - clientY / window.innerHeight) * 2 // -1 to 1 range
      if (shadowRef.current) {
        // @ts-ignore
        shadowRef.current.position.set(x, y, shadowRef.current.position.z) // 조정된 x, y 값을 적용
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const { scale } = useSpring({ scale: showBike ? scaleSet : 0, config: { duration: 200 } })

  return (
    <Canvas
      shadows
      gl={{ logarithmicDepthBuffer: true, antialias: false }}
      dpr={[1, 2]}
      camera={{ position: [-2, 10, 5], fov: 30 }}
    >
      <ambientLight position={[10, 10, 10]} />
      <Suspense fallback={<Loader />}>
        {/* @ts-ignore */}
        <Float ref={animatedKeyboardRef} floatIntensity={2}>
          {/* @ts-ignore */}
          <AnimatedBike castShadow scale={scale} position={[0, 0, 0]} rotation={[Math.PI / 1, 2, 2]} />
        </Float>
      </Suspense>
      <hemisphereLight intensity={0.5} />
      <directionalLight
        castShadow
        // position={[5, 10, 7.5]}
        intensity={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* <ContactShadows ref={shadowRef} resolution={2048} frames={1} scale={40} blur={0.2} opacity={1} far={10} /> */}
      <Environment preset='city'>
        <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
        <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 1]} scale={[10, 1, 1]} />
        <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 2]} scale={[10, 1, 1]} />
        <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
        <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 3]} scale={[10, 1, 1]} />
        <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 6]} scale={[10, 1, 1]} />
        <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 9]} scale={[10, 1, 1]} />
      </Environment>
      {/* @ts-ignore */}
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

const StyledLoader = css({
  color: 'MainText',
})
