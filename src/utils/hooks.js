'use client'

import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

const useSceneCleanup = () => {
  const { scene, gl } = useThree()

  useEffect(() => {
    return () => {
      // Dispose of the scene and its objects
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) object.material.dispose()
        if (object.texture) object.texture.dispose()
      })

      // Dispose of the renderer
      gl.dispose()
    }
  }, [scene, gl])
}

export default useSceneCleanup
