'use client'
import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, Canvas as CanvasImpl } from '@react-three/drei'
import { Three } from '../../helpers/components/Three'

export const Common = ({ color }) => (
  <Suspense fallback={null}>
    {color && <color attach='background' args={[color]} />}
    <ambientLight />
    <pointLight position={[20, 30, 10]} intensity={3} decay={0.2} />
    <pointLight position={[-10, -10, -10]} color='blue' decay={0.2} />
    <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
  </Suspense>
)

const Canvas = forwardRef(({ children, orbit, ...props }, ref) => {
  const localRef = useRef(null)

  return (
    <>
      <CanvasImpl ref={localRef} {...props}>
        {children}
      </CanvasImpl>
    </>
  )
})
Canvas.displayName = 'Canvas'

export { Canvas }
