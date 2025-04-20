import dynamic from 'next/dynamic'
import { Suspense, use, useEffect, useState, useRef } from 'react'
import { Lightformer, Environment, Float, ContactShadows, Text, OrbitControls } from '@react-three/drei'
import { Bloom, EffectComposer, N8AO, TiltShift2 } from '@react-three/postprocessing'
import { css } from '../../../styled-system/css'
import { useSpring, animated } from '@react-spring/three'
import { Keyboard } from '../../components/canvas/Examples'
import { Canvas, useFrame } from '@react-three/fiber'
import Model from 'src/components/canvas/Astronaut'
import { useProgress, Html, useGLTF } from '@react-three/drei'
import { easing } from 'maath'

type showCubeProps = {
  showCube: boolean
}
type AnimationSet = 'walking' | 'running' | 'jumping'
const AnimatedAstronaut = animated(Model)

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className={StyledLoader}>{progress} % loaded</div>
    </Html>
  )
}

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(state.camera.position, [1 + state.mouse.x / 4, 1.5 + state.mouse.y / 4, 2.5], 0.2, delta)
  })
}

const AboutMeCube = ({ showCube }: showCubeProps) => {
  const { scale } = useSpring({ scale: showCube ? 0.015 : 0, config: { duration: 200 } })
  const { scale: boxScale } = useSpring({ scale: showCube ? 0.015 : 0, config: { duration: 200 } })
  return (
    <Canvas dpr={[1, 1]} shadows camera={{ position: [0, 0.5, 15], fov: 50 }}>
      <ambientLight />
      <directionalLight position={[-5, 5, 5]} castShadow shadow-mapSize={1024} />
      <Suspense fallback={null}>
        <group position={[5, 0, -3]}>
          <AnimatedAstronaut animationSet={'walking' as AnimationSet} scale={scale} />
        </group>
      </Suspense>
      <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[5, 0, -5]} receiveShadow>
        <planeGeometry args={[10, 10, 1, 1]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>

      <Rig />
    </Canvas>
  )
}

export default AboutMeCube

const StyledLoader = css({
  color: 'MainText',
})
