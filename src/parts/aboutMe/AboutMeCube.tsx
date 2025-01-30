import dynamic from 'next/dynamic'
import { Suspense, use, useEffect, useState, useRef } from 'react'
import { Lightformer, Environment, Float, ContactShadows, Text, OrbitControls } from '@react-three/drei'
import { Bloom, EffectComposer, N8AO, TiltShift2 } from '@react-three/postprocessing'
import { css } from '../../../styled-system/css'
import { useSpring, animated } from '@react-spring/three'
import { Keyboard } from '../../components/canvas/Examples'
import { Canvas } from '@react-three/fiber'
import { Cube } from '../../components/canvas/Examples'
import { useProgress, Html, useGLTF } from '@react-three/drei'

type showCubeProps = {
  showCube: boolean
}
const AnimatedCube = animated(Cube)

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className={StyledLoader}>{progress} % loaded</div>
    </Html>
  )
}

const AboutMeCube = ({ showCube }: showCubeProps) => {
  const { scale } = useSpring({ scale: showCube ? 3 : 0, config: { duration: 200 } })

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
    </Canvas>
  )
}

export default AboutMeCube

const StyledLoader = css({
  color: 'MainText',
})
