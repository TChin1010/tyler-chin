import * as THREE from 'three'
import React, {useEffect, useRef} from 'react'
import {useFrame, type RootState, type ThreeElements } from '@react-three/fiber'

type meshProps = ThreeElements['mesh'] &  {
                    shapeArgs?: unknown
                    onFrame?: (mesh: React.RefObject<THREE.Mesh>, state: RootState, delta: number) => void,
                    color?: string}

/**
 * Constructs a 3D box!
 * 
 * @param param0 MeshProps + useFrame function + color + details
 * @returns an HTML three component of a box
 */
export function Box({onFrame , color, shapeArgs, ...rest}: meshProps) {
    const ref = useRef<THREE.Mesh>(null!)

    if(onFrame) {
        useFrame((state, delta) => {
            if(!ref.current) return
            onFrame(ref, state, delta)
        })
    }

    return (
        <mesh ref={ref} {...rest}>
            <boxGeometry args={shapeArgs as ConstructorParameters<typeof THREE.BoxGeometry>} />
            <meshBasicMaterial color={color} transparent opacity={0.5} blending={THREE.AdditiveBlending} 
  depthWrite={false}/>
        </mesh>
    )
}

/**
 * Constructs a 3D sphere!
 * 
 * @param param0 MeshProps + useFrame function + color + size
 * @returns an HTML three component of a sphere
 */
export function Sphere({onFrame, color, shapeArgs, ...rest}: meshProps) {
    const ref = useRef<THREE.Mesh>(null!)

    if(onFrame) {
        useFrame((state, delta) => {
            if(!ref.current) return
            onFrame(ref, state, delta)
        })
    }

    return (
        <mesh ref={ref} {...rest}>
            <sphereGeometry args={shapeArgs as ConstructorParameters<typeof THREE.SphereGeometry>} />
            <meshBasicMaterial color={color} transparent opacity={0.5} blending={THREE.AdditiveBlending} 
  depthWrite={false}/>
        </mesh>
    )
}

/**
 * Constructs a 3D donut!
 * 
 * @param param0 MeshProps + useFrame function + color + size
 * @returns an HTML three component of a donut
 */
export function Ring({onFrame, color, shapeArgs, ...rest}: meshProps) {
    const ref = useRef<THREE.Mesh>(null!)
    
    if(onFrame) {
        useFrame((state, delta) => {
            if(!ref.current) return
            onFrame(ref, state, delta)
        })
    }

    return (
        <mesh ref={ref} {...rest}>
            <torusGeometry args={shapeArgs as ConstructorParameters<typeof THREE.TorusGeometry>} />
            <meshBasicMaterial color={color} transparent opacity={0.5} blending={THREE.AdditiveBlending} 
  depthWrite={false}/>
        </mesh>
    )
}
