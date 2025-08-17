'use client'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, useState, useEffect } from 'react'
import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import { easing } from 'maath'
import Cookies from 'js-cookie'

export const Blob = ({ route = '/', ...props }) => {
  const router = useRouter()
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  return (
    <mesh
      onClick={() => router.push(route)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial roughness={0.5} color={hovered ? 'hotpink' : '#1fb2f5'} />
    </mesh>
  )
}

export const Logo = ({ route = '/blob', ...props }) => {
  const mesh = useRef(null)
  const router = useRouter()

  const [hovered, hover] = useState(false)
  const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), [])

  useCursor(hovered)
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.y = Math.sin(t) * (Math.PI / 8)
    mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
    mesh.current.rotation.z -= delta / 4
  })

  return (
    <group ref={mesh} {...props}>
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} />
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, 1]} />
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, -1]} />
      <mesh onClick={() => router.push(route)} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshPhysicalMaterial roughness={0.5} color={hovered ? 'hotpink' : '#1fb2f5'} />
      </mesh>
    </group>
  )
}

export function Keyboard(props) {
  const { scene, nodes, materials } = useGLTF('/keyboard_website.glb')
  const [color, setColor] = useState('orange')
  const handlePointerOver = (e) => {
    console.log('objectname', e.object.name)
    // nodes.Keycap_O.material.color.set('white') // Change color to black on hover
    setColor('white')
  }
  const handlePointerOut = (e) => {
    // nodes.Keycap_O.material.color.set('orange') // Change color back to white
    setColor('orange')
  }
  useFrame((state, delta) => easing.dampC(nodes.Keycap_O.material.color, color, 0.25, delta))
  useMemo(() => {
    nodes.Transparent_Pannel.material = new THREE.MeshPhysicalMaterial({
      roughness: 0.2, // Slightly smoother
      metalness: 0, // Non-metallic
      color: '#ffffff', // White color
      envMapIntensity: 1, // Stronger reflection
      clearcoat: 1, // High clear coat for that glossy look
      clearcoatRoughness: 0.1,
    })
  }, [nodes, materials])

  return (
    <>
      <primitive
        object={scene}
        castShadow
        {...props} // Apply the event handlers to the Keycap_O object
        onPointerOver={(e) => {
          handlePointerOver(e)
        }}
        onPointerOut={(e) => {
          handlePointerOut(e)
        }}
      />
    </>
  )
}

export function Bike(props) {
  const { nodes } = useGLTF('/bike.glb')
  const bikeMaterial = new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.5,
    color: 'black',
    roughness: 0,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    envMapIntensity: 21,
  })
  return <primitive {...props} material={bikeMaterial} object={nodes.bike} />
}

export function Cube(props) {
  const [theme, setTheme] = useState(Cookies.get('theme') === 'light' ? 'black' : 'white')
  useEffect(() => {
    const targetNode = document.documentElement
    const callback = function (mutationsList) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-color-mode') {
          const newTheme = targetNode.getAttribute('data-color-mode')
          console.log(`Theme changed to: ${newTheme}`)
          if (newTheme === 'dark') {
            setTheme('white')
          } else {
            setTheme('black')
          }
        }
      }
    }
    const observer = new MutationObserver(callback) // Start observing the target node for attribute changes
    observer.observe(targetNode, { attributes: true }) // Clean up the observer on component unmount

    setTheme(Cookies.get('theme') === 'light' ? 'black' : 'white')
    return () => {
      observer.disconnect()
    }
  }, [])

  const Cube = useRef()
  const { nodes } = useGLTF('/work.glb')

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.5,
    color: theme,
    roughness: 0,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    envMapIntensity: 21,
  })

  useFrame(() => {
    Cube.current.rotation.y += 0.01
  })
  return <primitive ref={Cube} {...props} material={glassMaterial} object={nodes.Cube} />
}
