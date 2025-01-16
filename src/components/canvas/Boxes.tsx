import { useRef, useState, useMemo, useEffect } from 'react'
import { Color } from 'three'
import { Text } from '@react-three/drei'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { Vector3 } from 'three'
import Cookies from 'js-cookie'

function Box({ text, ...props }) {
  const ref = useRef()
  // const black = useMemo(() => new Color('transparent'), [])
  const orange = useMemo(() => new Color('orange'), [])
  const [theme, setTheme] = useState(Cookies.get('theme') === 'dark' ? 'white' : 'black')
  const [hovered, setHovered] = useState(false)

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
    return () => {
      observer.disconnect()
    }
  }, [])

  useFrame(({ mouse, viewport }) => {
    const x = (mouse.x * viewport.width) / 2.5
    const y = (mouse.y * viewport.height) / 2.5
    // @ts-ignore
    ref.current.lookAt(x, y, 1)
    // @ts-ignore
    ref.current.material.color.lerp(hovered ? orange : theme, 0.5)
  })

  return (
    <mesh {...props} ref={ref} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <meshStandardMaterial />
      <Text fontSize={0.5} position-z={0.501} color={hovered ? orange : theme}>
        {text}
      </Text>
      {props.children}
    </mesh>
  )
}

function Rig() {
  const { camera, mouse } = useThree()
  const vec = new Vector3()

  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x, mouse.y, camera.position.z), 0.05)
    camera.lookAt(0, 0, 0)
  })
}

export default function BoxesCursor() {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <directionalLight position={[0, 0, 1]} />
      {/* @ts-ignore */}
      <group>
        <Box position={[-4, 2, 0]} text={'React'} />
        <Box position={[0, 2, 0]} text={'Next14'} />
        <Box position={[4, 2, 0]} text={'Typescript'} />
      </group>
      <group>
        <Box position={[-4, 0, 0]} text={'Jenkins'} />

        <Box position={[4, 0, 0]} text={'Docker'} />
      </group>
      <group>
        <Box position={[-4, -2, 0]} text={'Blender'} />
        <Box position={[0, -2, 0]} text={'Github'} />
        <Box position={[4, -2, 0]} text={'Figma'} />
      </group>

      <Rig />
    </Canvas>
  )
}
