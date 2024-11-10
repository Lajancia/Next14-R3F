'use client'

import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { r3f } from '@/helpers/global'
import * as THREE from 'three'

export default function Scene({ ...props }) {
  
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}
      onCreated={(state) => (state.gl.toneMapping = THREE.AgXToneMapping)}
      camera={{ position: [0, 1, 12], fov: 30 }}
    >
      {/* @ts-ignore */}
      <r3f.Out />
      <Preload all />
    </Canvas>
  )
}
