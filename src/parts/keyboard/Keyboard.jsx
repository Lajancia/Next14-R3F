import { useFrame } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Lightformer, Environment, Float, ContactShadows, Text, OrbitControls } from '@react-three/drei'
import { Bloom, EffectComposer, N8AO, TiltShift2 } from '@react-three/postprocessing'
import { easing } from 'maath'
import { css } from '../../../styled-system/css'

const Keyboard = dynamic(() => import('../../components/canvas/Examples').then((mod) => mod.Keyboard), { ssr: false })
const View = dynamic(() => import('../../components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div>
      <svg className={spinnerStyles} fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})

export default function KeyboardParts() {
  return (
    <>
      <View orbit className={css({ height: '100%' })}>
        <spotLight position={[10, 10, 10]} penumbra={3} castShadow angle={1} />
        <ambientLight position={[10, 10, 10]} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Float floatIntensity={0.5}>
            <Keyboard scale={0.3} position={[0, 0, 0]} rotation={[Math.PI / 3.7, 5.5, 0]} />
          </Float>
          <ContactShadows position={[0, -5, 0]} opacity={0.8} scale={30} blur={1.75} far={4.5} />
        </Suspense>
        <Environment preset='city'>
          <Lightformer
            intensity={1}
            position={[10, 5, 10]}
            scale={[10, 10, 1]}
            onUpdate={(self) => self.lookAt(10, 10, 0)}
          />
        </Environment>
        <EffectComposer disableNormalPass>
          <Bloom />
        </EffectComposer>
        <OrbitControls enableZoom={false} />
      </View>
    </>
  )
}

const spinnerStyles = css({
  marginLeft: '-0.25rem', // Equivalent to -ml-1
  marginRight: '0.75rem', // Equivalent to mr-3
  height: '1.25rem', // Equivalent to h-5
  width: '1.25rem', // Equivalent to w-5
  animation: 'spin 1s linear infinite', // Equivalent to animate-spin
  color: 'black', // Equivalent to text-black
  '@keyframes spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
})
