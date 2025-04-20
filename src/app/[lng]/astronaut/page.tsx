'use client'
import { Suspense, useEffect, useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, useAnimations } from '@react-three/drei'
import { easing } from 'maath'
import { css } from '../../../../styled-system/css'
function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(state.camera.position, [1 + state.mouse.x / 4, 1.5 + state.mouse.y / 4, 2.5], 0.2, delta)
  })
}

export default function App() {
  const [animationSetting, setAnimationSetting] = useState('walk')
  return (
    <>
      <div className={StyledButtonWrapper}>
        <button className={StyledButton} onClick={() => setAnimationSetting('standSit')}>
          stand and sit
        </button>
        <button className={StyledButton} onClick={() => setAnimationSetting('walking')}>
          walk
        </button>
        <button className={StyledButton} onClick={() => setAnimationSetting('sitting')}>
          sit
        </button>
      </div>
      <div className={StyledModelContainer}>
        <ControlModel animationSet={animationSetting} />
      </div>
    </>
  )
}

const StyledModelContainer = css({
  width: '100vw',
  height: '100dvh',
  zIndex: 0,
})
const StyledButtonWrapper = css({
  position: 'absolute',
  width: '100vw',
  height: '100dvh',
  zIndex: 1,

  lg: { width: '100vw' },
  xl: { width: '50vw' },
})

const StyledButton = css({
  width: '10rem',
  padding: '1rem',
  marginLeft: '0.5rem',
  border: '1px solid',
  borderColor: 'MainText',
  color: 'MainText',
  borderRadius: '10px',
  zIndex: 10,
  '& hover': {
    backgroundColor: 'white',
  },
})

const ControlModel = ({ animationSet }: { animationSet: string }) => {
  return (
    <Canvas shadows camera={{ position: [0, 0.5, 15], fov: 50 }}>
      <ambientLight />
      <directionalLight position={[-5, 5, 5]} castShadow shadow-mapSize={1024} />
      <group position={[5, 0, -3]}>
        <Suspense fallback={null}>
          <Model animationSet={animationSet} />
        </Suspense>
      </group>
      <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[0, 0, -5]} receiveShadow>
        <planeGeometry args={[10, 10, 1, 1]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
      <Rig />
    </Canvas>
  )
}

// @ts-expect-error type ignore
function Model(props) {
  const { nodes, animations, materials } = useGLTF('/astronaut_animation.glb')
  const { ref, actions, names } = useAnimations(animations)
  const speed = 10 / 900
  useFrame(() => {
    if (ref.current && ref.current.position.x > -2.5) {
      ref.current.position.x -= speed
    } else {
      if (ref.current && ref.current.rotation.y < 0.7) ref.current.rotation.y += 0.01
    }
  })

  // @ts-expect-error type ignore
  useEffect(() => {
    // walk 애니메이션 실행
    // @ts-expect-error type ignore
    actions['walk'].reset().fadeIn(0.5).play()
    const walkDuration = 4000 // walk 애니메이션 지속 시간

    setTimeout(() => {
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
    }, walkDuration)
    // @ts-expect-error type ignore
    return () => actions[props.animationSet].fadeOut(0.5)
  }, [actions, names, props.animationSet])

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 1.5]} scale={0.015}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          castShadow
          receiveShadow
          geometry={nodes.astronaut_1.geometry}
          material={materials.CLAY}
          skeleton={nodes.astronaut_1.skeleton}
        />
        <skinnedMesh
          castShadow
          receiveShadow
          geometry={nodes.astronaut_2.geometry}
          material={materials.CLAY}
          skeleton={nodes.astronaut_2.skeleton}
        />
        <skinnedMesh
          castShadow
          receiveShadow
          geometry={nodes.astronaut_3.geometry}
          material={materials.CLAY}
          skeleton={nodes.astronaut_3.skeleton}
        />
      </group>
    </group>
  )
}
