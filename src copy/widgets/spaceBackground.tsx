import * as SHAPES from '../components/three/spaceBackgroundShapes.tsx'
import * as THREE from 'three'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import React from 'react'
import {useThree, type RootState} from '@react-three/fiber'

const PLANET_TO_SPACE_CLOUD_DISTANCE = 250 // default distance of camera to shapes (All real)
const BOUNCE_MARGIN = 0.5 // MARGIN OF WHICH the shapes bounce of the sides (0, 1)
const SPEED_OF_MOVEMENT = 5 // speed of which shapes move (All real)
const SPEED_OF_ROTATION = 0.1 // speed of which shapes rotate (0, 1)
const SHAPE_SPAWN_MARGIN = 0.6 // distance at which shapes can spawn from boarder (0, 1)

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
    let angle_of_movement_x = Math.cos(Math.random() * Math.PI * 2)
    let angle_of_movement_y = Math.sin(Math.random() * Math.PI * 2)
    return function onFrame(mesh: React.RefObject<THREE.Mesh>, state: RootState, delta: number) {
        if (!mesh.current) return
        mesh.current.rotation.x += Math.cos(angle_of_rotation) * delta * SPEED_OF_ROTATION
        mesh.current.rotation.y += Math.sin(angle_of_rotation) * delta * SPEED_OF_ROTATION
        
        // TODO: THIS IS LIKELY HIGHLY INEFFIECENT AS IT MAKES
        // MANY REPEAT CALCULATIONS
        // PERHAPS ADD A TIMER
        if(Math.abs(mesh.current.position.x) > movable_width / 2 - 200) {
           if (mesh.current.position.x < 0 && angle_of_movement_x < 0) {
                angle_of_movement_x *= -1
            } else if (mesh.current.position.x > 0 && angle_of_movement_x > 0) {
                angle_of_movement_x *= -1
            }
        }

        if(Math.abs(mesh.current.position.y)  > movable_height / 2 - (movable_height / 2) * BOUNCE_MARGIN) {
            if (mesh.current.position.y < 0 && angle_of_movement_y < 0) {
                angle_of_movement_y *= -1
            } else if (mesh.current.position.y > 0 && angle_of_movement_y > 0) {
                angle_of_movement_y *= -1
            }
        }
        
        mesh.current.position.x += angle_of_movement_x * delta * SPEED_OF_MOVEMENT
        mesh.current.position.y += angle_of_movement_y * delta  * SPEED_OF_MOVEMENT


    }
}

function ShapeCollection({z_position} : {z_position: number}) {
    const root = document.documentElement
    const camera = useThree().camera as THREE.PerspectiveCamera
    const secondary_bg_c = getComputedStyle(root).getPropertyValue('--secondary-background-color').trim()
    const primary_star_colour = '#73507a'
    const onFrameRing = createRandomMovement(z_position)
    const onFrameBox = createRandomMovement(z_position)
    const onFrameSpere = createRandomMovement(z_position)
    let movable_height = PLANET_TO_SPACE_CLOUD_DISTANCE * Math.tan((180 - camera.fov) / 2 * (Math.PI / 180)) * SHAPE_SPAWN_MARGIN
    let movable_width = (document.documentElement.clientWidth / document.documentElement.clientHeight) * movable_height
    
    return ( // Shapes should be spcaed such that checkpoint (plant) -- 250 units -- shapes -- 250 units -- planet
        <>
        <SHAPES.Box onFrame = {onFrameBox} color = {secondary_bg_c} position={[(2 * Math.random() - 1) * movable_width, (2 * Math.random() - 1) * movable_height, z_position]} shapeArgs={[100, 100, 100]}></SHAPES.Box>
        <SHAPES.Box onFrame = {onFrameBox} color = {secondary_bg_c} position={[(2 * Math.random() - 1) * movable_width, (2 * Math.random() - 1) * movable_height, z_position]} shapeArgs={[100, 100, 1]}></SHAPES.Box>
        <SHAPES.Ring onFrame = {onFrameRing} color = {secondary_bg_c} shapeArgs={[50, 33, 16, 100]}  position={[(2 * Math.random() - 1) * movable_width, (2 * Math.random() - 1) * movable_height, z_position]} ></SHAPES.Ring>
        <SHAPES.Sphere onFrame = {onFrameSpere} color = {secondary_bg_c} shapeArgs={[25, 1, 6]}   position={[(2 * Math.random() - 1) * movable_width, (2 * Math.random() - 1) * movable_height, z_position]} ></SHAPES.Sphere>
        <SHAPES.Ring onFrame = {onFrameRing} color = {secondary_bg_c} shapeArgs={[10, 33, 16, 100]}  position={[(2 * Math.random() - 1) * movable_width, (2 * Math.random() - 1) * movable_height, z_position]} ></SHAPES.Ring>
        <SHAPES.Sphere onFrame = {onFrameSpere} color = {primary_star_colour} shapeArgs={[15, 5, 30]}   position={[(2 * Math.random() - 1) * movable_width, (2 * Math.random() - 1) * movable_height, z_position]} ></SHAPES.Sphere>\
        <SHAPES.Box onFrame = {onFrameBox} color = {primary_star_colour} position={[(2 * Math.random() - 1) * movable_width, (2 * Math.random() - 1) * movable_height, z_position]} shapeArgs={[10, 10, 10]}></SHAPES.Box>
        <SHAPES.Box onFrame = {onFrameBox} color = {secondary_bg_c} position={[(2 * Math.random() - 1) * movable_width, (2 * Math.random() - 1) * movable_height, z_position]} shapeArgs={[100, 100, 100]}></SHAPES.Box>
        <SHAPES.Box onFrame = {onFrameBox} color = {secondary_bg_c} position={[(2 * Math.random() - 1) * movable_width, (2 * Math.random() - 1) * movable_height, z_position]} shapeArgs={[100, 100, 1]}></SHAPES.Box>
        <SHAPES.Ring onFrame = {onFrameRing} color = {secondary_bg_c} shapeArgs={[50, 33, 16, 100]}  position={[(2 * Math.random() - 1) * movable_width, (2 * Math.random() - 1) * movable_height, z_position]} ></SHAPES.Ring>
        <SHAPES.Sphere onFrame = {onFrameSpere} color = {secondary_bg_c} shapeArgs={[25, 1, 6]}   position={[(2 * Math.random() - 1) * movable_width, (2 * Math.random() - 1) * movable_height, z_position]} ></SHAPES.Sphere>
        <SHAPES.Ring onFrame = {onFrameRing} color = {secondary_bg_c} shapeArgs={[10, 33, 16, 100]}  position={[(2 * Math.random() - 1) * movable_width, (2 * Math.random() - 1) * movable_height, z_position]} ></SHAPES.Ring>
        <SHAPES.Sphere onFrame = {onFrameSpere} color = {primary_star_colour} shapeArgs={[15, 5, 30]}   position={[(2 * Math.random() - 1) * movable_width, (2 * Math.random() - 1) * movable_height, z_position]} ></SHAPES.Sphere>\
        <SHAPES.Box onFrame = {onFrameBox} color = {primary_star_colour} position={[(2 * Math.random() - 1) * movable_width, (2 * Math.random() - 1) * movable_height, z_position]} shapeArgs={[10, 10, 10]}></SHAPES.Box>
        <SHAPES.Box onFrame = {onFrameBox} color = {secondary_bg_c} position={[(2 * Math.random() - 1) * movable_width, (2 * Math.random() - 1) * movable_height, z_position]} shapeArgs={[100, 100, 100]}></SHAPES.Box>
        <SHAPES.Box onFrame = {onFrameBox} color = {secondary_bg_c} position={[(2 * Math.random() - 1) * movable_width, (2 * Math.random() - 1) * movable_height, z_position]} shapeArgs={[100, 100, 1]}></SHAPES.Box>
        <SHAPES.Ring onFrame = {onFrameRing} color = {secondary_bg_c} shapeArgs={[50, 33, 16, 100]}  position={[(2 * Math.random() - 1) * movable_width, (2 * Math.random() - 1) * movable_height, z_position]} ></SHAPES.Ring>
        <SHAPES.Sphere onFrame = {onFrameSpere} color = {secondary_bg_c} shapeArgs={[25, 1, 6]}   position={[(2 * Math.random() - 1) * movable_width, (2 * Math.random() - 1) * movable_height, z_position]} ></SHAPES.Sphere>
        <SHAPES.Ring onFrame = {onFrameRing} color = {secondary_bg_c} shapeArgs={[10, 33, 16, 100]}  position={[(2 * Math.random() - 1) * movable_width, (2 * Math.random() - 1) * movable_height, z_position]} ></SHAPES.Ring>
        <SHAPES.Sphere onFrame = {onFrameSpere} color = {primary_star_colour} shapeArgs={[15, 5, 30]}   position={[(2 * Math.random() - 1) * movable_width, (2 * Math.random() - 1) * movable_height, z_position]} ></SHAPES.Sphere>\
        <SHAPES.Box onFrame = {onFrameBox} color = {primary_star_colour} position={[(2 * Math.random() - 1) * movable_width, (2 * Math.random() - 1) * movable_height, z_position]} shapeArgs={[10, 10, 10]}></SHAPES.Box>
        </>
    )
}

export default function SpaceBackground() {
    return (
        <>
        <ShapeCollection z_position = {PLANET_TO_SPACE_CLOUD_DISTANCE}></ShapeCollection>

        </>

    )
}