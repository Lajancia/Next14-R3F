'use client'

import * as THREE from 'three'
import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Image, ScrollControls, Scroll, useScroll, Text, View, useProgress, Html } from '@react-three/drei'
import { proxy, useSnapshot } from 'valtio'
import { easing } from 'maath'
import { css } from '../../../styled-system/css'
import { Group } from 'three'

type MinimapProps = {
  geometry: THREE.BufferGeometry
  material: THREE.Material
  easing: {
    damp: (target: any, key: string, value: number, factor: number, delta: number) => void
  }
}

const material = new THREE.LineBasicMaterial({ color: 'white' })
const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -0.5, 0), new THREE.Vector3(0, 0.5, 0)])
const imagePaths = []

for (let i = 1; i <= 24; i++) {
  imagePaths.push(`/img/gallery/${i}.jpeg`)
}
const state = proxy({
  clicked: null,
  urls: imagePaths,
})

function Minimap({ geometry, material, easing }: MinimapProps) {
  const ref = useRef<Group>(null)
  const scroll = useScroll()
  const { urls } = useSnapshot(state)
  const { height } = useThree((state) => state.viewport)
  useFrame((state, delta) => {
    if (ref.current) {
      Array.from(ref.current.children).forEach((child, index) => {
        const y = scroll.curve(index / urls.length - 1.5 / urls.length, 4 / urls.length)
        easing.damp((child as any).scale, 'y', 0.15 + y / 6, 0.15, delta)
      })
    }
  })
  return (
    <group ref={ref}>
      {urls.map((_, i) => (
        <line
          color={'#000'}
          key={i}
          // @ts-ignore
          geometry={geometry}
          material={material}
          position={[i * 0.06 - urls.length * 0.03, -height / 2 + 0.6, 0]}
        />
      ))}
    </group>
  )
}

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className={StyledLoader}> {progress} % loaded</div>
    </Html>
  )
}

// @ts-ignore
function Item({ index, position, scale, c = new THREE.Color(), ...props }) {
  const ref = useRef<Group>()
  const scroll = useScroll()
  const { clicked, urls } = useSnapshot(state)
  const [hovered, hover] = useState(false)
  const click = () => (state.clicked = index === clicked ? null : index)
  const over = () => hover(true)
  const out = () => hover(false)
  useFrame((state, delta) => {
    const y = scroll.curve(index / urls.length - 1.5 / urls.length, 4 / urls.length)
    // @ts-ignore
    easing.damp3(ref.current.scale, [clicked === index ? 4.7 : scale[0], clicked === index ? 5 : 4 + y, 1], 0.15, delta)
    // @ts-ignore
    ref.current.material.scale[0] = ref.current.scale.x
    // @ts-ignore
    ref.current.material.scale[1] = ref.current.scale.y
    // @ts-ignore
    if (clicked !== null && index < clicked) easing.damp(ref.current.position, 'x', position[0] - 2, 0.15, delta)
    // @ts-ignore
    if (clicked !== null && index > clicked) easing.damp(ref.current.position, 'x', position[0] + 2, 0.15, delta)
    // @ts-ignore
    if (clicked === null || clicked === index) easing.damp(ref.current.position, 'x', position[0], 0.15, delta)
    // @ts-ignore
    easing.damp(ref.current.material, 'grayscale', hovered || clicked === index ? 0 : Math.max(0, 1 - y), 0.15, delta)
    easing.dampC(
      // @ts-ignore
      ref.current.material.color,
      hovered || clicked === index ? 'white' : '#aaa',
      hovered ? 0.3 : 0.15,
      delta,
    )
  })
  return (
    <Image
      // @ts-ignore
      ref={ref}
      {...props}
      position={position}
      scale={scale}
      onClick={click}
      onPointerOver={over}
      onPointerOut={out}
      // @ts-ignore
      alt='gallery'
      layout='fill'
    />
  )
}

function Items({ w = 0.7, gap = 0.15 }) {
  const { urls } = useSnapshot(state)
  const { width } = useThree((state) => state.viewport)
  const xW = w + gap

  return (
    <ScrollControls horizontal damping={0.1} pages={(width - xW + urls.length * xW) / width}>
      <Text fontSize={0.3} position={[0, -2.5, 0]} color={'#373737'}>
        3D Modeling
      </Text>
      <Scroll>
        {
          urls.map((url, i) => <Item key={i} index={i} position={[i * xW, 1, 0]} scale={[w, 4, 1]} url={url} />) /* prettier-ignore */
        }
      </Scroll>
    </ScrollControls>
  )
}

const App = () => (
  <>
    <Canvas
      gl={{ antialias: false }}
      dpr={[1, 1.5]}
      onPointerMissed={() => (state.clicked = null)}
      className={css({ height: '80%' })}
    >
      <Suspense fallback={<Loader />}>
        <Items />
      </Suspense>
    </Canvas>
  </>
)

export default App

const StyledLoader = css({
  color: 'MainText',
})
