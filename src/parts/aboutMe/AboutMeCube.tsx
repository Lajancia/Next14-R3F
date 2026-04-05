import dynamic from 'next/dynamic'
import { Suspense, use, useEffect, useState, useRef } from 'react'
import { Lightformer, Environment, Float, ContactShadows, Text, OrbitControls } from '@react-three/drei'
import { Bloom, EffectComposer, N8AO, TiltShift2 } from '@react-three/postprocessing'
import { css } from '../../../styled-system/css'
import { useSpring, animated } from '@react-spring/three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Cube } from '../../components/canvas/Examples'
import Model from 'src/components/canvas/Astronaut'
import { useProgress, Html, useGLTF } from '@react-three/drei'
import { easing } from 'maath'

type showCubeProps = {
  showCube: boolean
}
type AnimationSet = 'walking' | 'running' | 'jumping'
const AnimatedAstronaut = animated(Model)
const AnimatedCube = animated(Cube)

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className={StyledLoader}>{progress} % loaded</div>
    </Html>
  )
}

// function Rig() {
//   return useFrame((state, delta) => {
//     easing.damp3(state.camera.position, [1 + state.mouse.x / 4, 1.5 + state.mouse.y / 4, 2.5], 0.2, delta)
//   })
// }

const AboutMeCube = ({ showCube }: showCubeProps) => {
  const { scale } = useSpring({ scale: showCube ? 3 : 0, config: { duration: 200 } })
  const { scale: boxScale } = useSpring({ scale: showCube ? 0.015 : 0, config: { duration: 200 } })
  return (
    <Canvas dpr={[1, 1]} shadows camera={{ position: [5, 0, 80], fov: 25 }}>
      <directionalLight castShadow intensity={5} position={[10, 6, 6]} shadow-mapSize={[1024, 1024]} color={'#93A8BD'}>
        <orthographicCamera attach='shadow-camera' left={-20} right={20} top={20} bottom={-20} />
      </directionalLight>

      <Suspense fallback={<Loader />}>
        {/* @ts-ignore */}
        <AnimatedCube scale={scale} position={[13, 0, 0]} />
        {/* <Environment preset="city" resolution={256} background blur={0.8}/> */}
      </Suspense>
      {/* <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[5, 0, -5]} receiveShadow>
        <planeGeometry args={[10, 10, 1, 1]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh> */}

      {/* <Rig /> */}
    </Canvas>
  )
}

export default AboutMeCube

const StyledLoader = css({
  color: 'MainText',
})
