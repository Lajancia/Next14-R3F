'use client'
import { Suspense, useEffect, useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, useAnimations, Html, useProgress, Preload } from '@react-three/drei'
import * as THREE from 'three'
import Cookies from 'js-cookie'

type AnimationSet = 'walking' | 'running' | 'jumping'

function Model({ animationSet, scale }: { animationSet: AnimationSet; scale: number }) {
  const { nodes, animations, materials } = useGLTF('/astronaut_animation.glb')
  const { ref, actions, names } = useAnimations(animations)
  const [theme, setTheme] = useState(Cookies.get('theme') === 'light' ? 'black' : 'white')
  const speed = 8 / 900
  useFrame(() => {
    if (ref.current && ref.current.position.x > -2) {
      ref.current.position.x -= speed
    } else {
      if (ref.current && ref.current.rotation.y < 0.7) ref.current.rotation.y += 0.01
    }
  })

  useEffect(() => {
    // walk 애니메이션 실행
    // @ts-expect-error type ignore
    actions['walk'].reset().fadeIn(0.5).play()
    const walkDuration = 4000 // walk 애니메이션 지속 시간

    setTimeout(() => {
      try {
        // @ts-expect-error type ignore
        actions['walk'].fadeOut(0.5)
        // @ts-expect-error type ignore
        actions['standSit'].reset().fadeIn(0.5).play()

        const standSitDuration = 1500 // standSit 애니메이션 지속 시간

        setTimeout(() => {
          // @ts-expect-error type ignore
          actions['standSit'].fadeOut(0.5)
          // @ts-expect-error type ignore
          actions['sitting'].reset().fadeIn(0.5).play()
        }, standSitDuration)
      } catch (e) {
        console.debug('animation exit')
      }
    }, walkDuration)
  }, [actions, names, animationSet])

  useEffect(() => {
    const targetNode = document.documentElement
    const callback = function (mutationsList: any) {
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

  const clothMaterial = new THREE.MeshPhysicalMaterial({
    transparent: false,
    opacity: 1,
    color: theme,
    roughness: 1,
  })
  const helmetMaterial = new THREE.MeshPhysicalMaterial({
    transparent: false,
    opacity: 1,
    color: 'orange',
    roughness: 1,
  })
  const beltMaterial = new THREE.MeshPhysicalMaterial({
    transparent: false,
    opacity: 1,
    color: 'red',
    roughness: 1,
  })
  return (
    // @ts-expect-error type ignore
    <group ref={ref} scale={scale} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 1.5]}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          castShadow
          receiveShadow
          geometry={nodes.astronaut_1.geometry}
          material={helmetMaterial}
          skeleton={nodes.astronaut_1.skeleton}
        />
        <skinnedMesh
          castShadow
          receiveShadow
          geometry={nodes.astronaut_2.geometry}
          material={helmetMaterial}
          skeleton={nodes.astronaut_2.skeleton}
        />
        <skinnedMesh
          castShadow
          receiveShadow
          geometry={nodes.astronaut_3.geometry}
          material={clothMaterial}
          skeleton={nodes.astronaut_3.skeleton}
        />
      </group>
    </group>
  )
}

export default Model
