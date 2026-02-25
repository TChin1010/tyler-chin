import React, { useEffect, useRef } from 'react'
import { ShapesMemo, type Circle as Circle, type Rectangle as Rectangle } from '../types/CanvasShapes'

import './StarCanvas.css'
// parameters for star generation
const SIZE_RANGE = [1, 1]
const STAR_COLOUR = ['#c2b193', '#b5e4ff', '#e6913b', '#f52f2f', '#c9c8ba', '#f52f2f']

function randRange(min: number, max: number) {
	return Math.random() * (max - min) + min
}

/**
 * Initializes all shapes used in the background
 * 
 * @returns returns a memo of all shapes and their args
 */
const initialize = () => {
	const maxWidth = document.documentElement.clientWidth
	const maxHeight = document.documentElement.clientHeight

	let memo : ShapesMemo = {
		CIRCLE: [],
		RECTANGLE: []
	}

    // Generate the stars
    for (let i: number = 0; i < 250; i++) {
		memo.CIRCLE.push({
			x: randRange(0, maxWidth),
			y: randRange(0, maxHeight),
			radius: randRange(SIZE_RANGE[0], SIZE_RANGE[1]),
			fillStyle: STAR_COLOUR[Math.floor(STAR_COLOUR.length * Math.random())]
		})
	}

    return memo
}

/**
 * Renders a canvas by drawing on its context
 * 
 * @param ctx is the context that we want to render
 * @param delta is the time elapsed between the last frame and the current
 * 				given in ms
 */
const render = (ctx: CanvasRenderingContext2D, shapes: ShapesMemo) => {

    // Draws the stars
	shapes.CIRCLE.forEach( item => {
		ctx.beginPath()
		ctx.fillStyle = item.fillStyle as string
		ctx.arc(item.x, item.y, item.radius, 0, 2*Math.PI)
    	ctx.fill()
	})

}

/**
 * Sets up the spacebackground canvas
 * 
 * @returns A canvas that represents the space background
 */
export default function StarCanvas() {
   const ref = useRef<HTMLCanvasElement>(null!)
   
    useEffect(() => {
        let animationFrameId: number = null!
        if (!ref) return
        const canvas = ref.current
   
        if (!canvas) return
        const context = canvas.getContext('2d')
   
        if (!context) return
   

        const handleResize = () => {
            const shapeMemo = initialize()
   
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            render(context, shapeMemo)

        }
        
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return <canvas ref={ref} className="Star-Canvas"></canvas>
}
