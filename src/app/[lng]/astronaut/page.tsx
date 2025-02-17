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
  const [animationSetting, setAnimationSetting] = useState('standSit')
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
    <Canvas shadows camera={{ position: [1, 1.5, 2.5], fov: 50 }}>
      <ambientLight />
      <directionalLight position={[-5, 5, 5]} castShadow shadow-mapSize={1024} />
      <group position={[0, -1, 0]}>
        <Suspense fallback={null}>
          <Model animationSet={animationSet} />
        </Suspense>
      </group>
      <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[10, 10, 1, 1]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
      <Rig />
    </Canvas>
  )
}

// @ts-expect-error type ignore
function Model(props) {
  const halo = useRef()
  const { scene, nodes, animations, materials } = useGLTF('/astronaut_animation.glb')
  scene.castShadow = true
  scene.receiveShadow = true

  const { ref, actions, names } = useAnimations(animations)

  const [index, setIndex] = useState(0)

  // Change animation when the index changes
  // @ts-expect-error type ignore
  useEffect(() => {
    console.log('name', names, index, props.animationSet)
    console.log(materials, materials.CLAY)

    // @ts-expect-error type ignore
    actions[props.animationSet].reset().fadeIn(0.5).play()
    // @ts-expect-error type ignore
    return () => actions[props.animationSet].fadeOut(0.5)
  }, [index, actions, names, props.animationSet])

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
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

      <mesh
        //  @ts-expect-error type ignore
        ref={halo}
        receiveShadow
        position={[0, 1, -1]}
      >
        <circleGeometry args={[1, 64]} />
        <meshStandardMaterial />
      </mesh>
    </group>
  )
}
