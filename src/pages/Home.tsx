import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import Background from '../widgets/background'

import './Home.css'

function Camera() {
    const { camera } = useThree()

    useFrame(() => {
        camera.position.set(0, 0, 0)
        camera.lookAt(0, 0, 1)
    })

    return null
}

export default function Home() {
    return (
        <>
            <Canvas className = "blurred-canvas">
                <Camera></Camera>
                <Background></Background>
            </Canvas>
        </>
    )
}