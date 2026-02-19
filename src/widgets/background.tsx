import * as SHAPES from '../components/three/spaceBackgroundShapes.tsx'
import * as THREE from 'three'

import { Color } from 'three'
import React, { useLayoutEffect, useRef } from 'react'
import {useThree, type RootState} from '@react-three/fiber'
import './background.css'

const PLANET_TO_SPACE_CLOUD_DISTANCE = 250 // default distance of camera to shapes (All real)
const BOUNCE_MARGIN = 0.3 // MARGIN OF WHICH the shapes bounce of the sides (0, 1)
const SPEED_OF_MOVEMENT = 100 // speed of which shapes move (All real)
const SPEED_OF_ROTATION = 0.1 // speed of which shapes rotate (0, 1)

/**
 * Returns a function that encodes random movement for a shape.
 * This function ensures that shapes can only exist within the view of the camera
 * 
 * @param {number} z_position_default is the expected distance between the shapes and the camera
 * @returns a useFrame function
 */
function createRandomMovement(z_position_default: number) {
    const camera = useThree().camera as THREE.PerspectiveCamera
    const movable_height = 2 * z_position_default * Math.tan((180 - camera.fov) / 2 * (Math.PI / 180))
    const movable_width = (document.documentElement.clientWidth / document.documentElement.clientHeight) * movable_height
    let angle_of_rotation = Math.random() * Math.PI * 2
    let angle_of_movement_x = Math.random() * Math.PI * 2
    let angle_of_movement_y = Math.random() * Math.PI * 2
    return function onFrame(mesh: React.RefObject<THREE.Mesh>, state: RootState, delta: number) {
        if (!mesh.current) return
        mesh.current.rotation.x += Math.cos(angle_of_rotation) * delta * SPEED_OF_ROTATION
        mesh.current.rotation.y += Math.sin(angle_of_rotation) * delta * SPEED_OF_ROTATION
        
        // TODO: THIS IS LIKELY HIGHLY INEFFIECENT AS IT MAKES
        // MANY REPEAT CALCULATIONS
        // PERHAPS ADD A TIMER
        if(Math.abs(mesh.current.position.x) > movable_width / 2 - 200) {
           if (mesh.current.position.x < 0) {
                angle_of_movement_x = Math.random() * Math.PI - Math.PI / 2
            } else {
                angle_of_movement_x = Math.random() * Math.PI + Math.PI / 2
            }
        }

        if(Math.abs(mesh.current.position.y)  > movable_height / 2 - (movable_height / 2) * BOUNCE_MARGIN) {
            if (mesh.current.position.y < 0) {
                console.log(mesh.current.position)
                angle_of_movement_y = Math.random() * Math.PI
            } else {
                angle_of_movement_y = Math.random() * Math.PI + Math.PI
            }
        }
        
        mesh.current.position.x += Math.cos(angle_of_movement_x) * delta * SPEED_OF_MOVEMENT
        mesh.current.position.y += Math.sin(angle_of_movement_y) * delta  * SPEED_OF_MOVEMENT


    }
}

function BackgroundColor() {
    const { scene } = useThree()
    const root = document.documentElement
    const primary_bg_c = getComputedStyle(root).getPropertyValue('--primary-background-color').trim()

    useLayoutEffect(() => {
        if (!scene) return
        scene.background = new Color(primary_bg_c || 'red')

    }, [scene, primary_bg_c])

    return null;
}

function ShapeCollection({z_position} : {z_position: number}) {
    const root = document.documentElement
    const secondary_bg_c = getComputedStyle(root).getPropertyValue('--secondary-background-color').trim()
    const onFrameRing = createRandomMovement(z_position);
    const onFrameBox = createRandomMovement(z_position);
    const onFrameSpere = createRandomMovement(z_position);
    return ( // Shapes should be spcaed such that checkpoint (plant) -- 250 units -- shapes -- 250 units -- planet
        <>
        <SHAPES.Box onFrame = {onFrameBox} color = {secondary_bg_c} position={[0, 0, z_position]} shapeArgs={[100, 100, 1]}></SHAPES.Box>
        <SHAPES.Ring onFrame = {onFrameRing} color = {secondary_bg_c} shapeArgs={[100, 33, 16, 100]}  position={[0, 0, z_position]} ></SHAPES.Ring>
        <SHAPES.Sphere onFrame = {onFrameSpere} color = {secondary_bg_c} shapeArgs={[25, 1, 6]}   position={[0, 0, z_position]} ></SHAPES.Sphere>
        </>
    )
}

export default function Background() {
    return (
        <>
            <BackgroundColor></BackgroundColor>
            <ShapeCollection z_position = {PLANET_TO_SPACE_CLOUD_DISTANCE}></ShapeCollection>
        </>
    )
}