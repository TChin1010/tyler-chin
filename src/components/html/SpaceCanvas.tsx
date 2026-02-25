import React, { useEffect, useRef } from 'react'
import {
	ShapesMemo,
	type Circle as Circle,
	type Rectangle as Rectangle,
} from '../types/CanvasShapes'

import './SpaceCanvas.css'

// parameters for shape movement
const MAX_SPEED = [0.1, 0.15]

function randRange(min: number, max: number) {
	return Math.random() * (max - min) + min
}

/**
 * Initializes all shapes used in the background
 *
 * @returns returns a memo of all shapes and their args
 */
const initialize = () => {
	const macros = getComputedStyle(document.documentElement)
	const maxWidth = document.documentElement.clientWidth
	const maxHeight = document.documentElement.clientHeight

	let memo: ShapesMemo = {
		CIRCLE: [],
		RECTANGLE: [],
	}

	// create 3 light pink circles
	for (let i: number = 0; i < 5; i++) {
		memo.CIRCLE.push({
			x: randRange(0, maxWidth),
			y: randRange(0, maxHeight),
			radius: randRange(30, 400),
			vel_x_dir: Math.sin(randRange(0, Math.PI * 2)),
			vel_y_dir: Math.cos(randRange(0, Math.PI * 2)),
			vel_mag: randRange(MAX_SPEED[0], MAX_SPEED[1]),
			fillStyle: 'rgba(77, 32, 56, 0.4)' as string,
		})
	}

	// create 3 pinkish circles
	for (let i: number = 0; i < 5; i++) {
		memo.CIRCLE.push({
			x: randRange(0, maxWidth),
			y: randRange(0, maxHeight),
			radius: randRange(30, 50),
			vel_x_dir: Math.sin(randRange(0, Math.PI * 2)),
			vel_y_dir: Math.cos(randRange(0, Math.PI * 2)),
			vel_mag: randRange(MAX_SPEED[0], MAX_SPEED[1]),
			fillStyle: 'rgba(59, 21, 97, 0.4)' as string,
		})
	}

	// create 1 light circles
	for (let i: number = 0; i < 2; i++) {
		memo.CIRCLE.push({
			x: randRange(0, maxWidth),
			y: randRange(0, maxHeight),
			radius: randRange(30, 100),
			vel_x_dir: Math.sin(randRange(0, Math.PI * 2)),
			vel_y_dir: Math.cos(randRange(0, Math.PI * 2)),
			vel_mag: randRange(MAX_SPEED[0], MAX_SPEED[1]),
			fillStyle: 'rgb(105, 94, 110, 0.8)',
		})
	}

	// create 3 rectangle circles
	for (let i: number = 0; i < 5; i++) {
		memo.RECTANGLE.push({
			x: randRange(0, maxWidth),
			y: randRange(0, maxHeight),
			height: randRange(30, 400),
			width: randRange(30, 400),
			vel_x_dir: Math.sin(randRange(0, Math.PI * 2)),
			vel_y_dir: Math.cos(randRange(0, Math.PI * 2)),
			vel_mag: randRange(MAX_SPEED[0], MAX_SPEED[1]),
			fillStyle: (macros.getPropertyValue(
				'--secondary-background-color',
			) || '#000000') as string,
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
const render = (
	ctx: CanvasRenderingContext2D,
	delta: number,
	shapes: ShapesMemo,
) => {
	const macros = getComputedStyle(document.documentElement)
	const maxWidth = document.documentElement.clientWidth
	const maxHeight = document.documentElement.clientHeight

	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
	shapes.CIRCLE.forEach((item) => {
		ctx.beginPath()
		ctx.fillStyle = item.fillStyle as string
		if (!item.vel_mag || !item.vel_x_dir || !item.vel_y_dir) return null
		;((item.x += item.vel_mag * delta * item.vel_x_dir),
			(item.y += item.vel_mag * delta * item.vel_y_dir),
			ctx.arc(item.x, item.y, item.radius, 0, 2 * Math.PI))

		if (item.x < 0 && item.vel_x_dir < 0) {
			item.vel_x_dir *= -1
		}
		if (item.y < 0 && item.vel_y_dir < 0) {
			item.vel_y_dir *= -1
		}

		if (item.x > window.innerWidth && item.vel_x_dir > 0) {
			item.vel_x_dir *= -1
		}

		if (item.y > window.innerHeight && item.vel_y_dir > 0) {
			item.vel_y_dir *= -1
		}

		ctx.fill()
	})

	shapes.RECTANGLE.forEach((item) => {
		ctx.beginPath()
		ctx.fillStyle = item.fillStyle as string
		if (!item.vel_mag || !item.vel_x_dir || !item.vel_y_dir) return null
		;((item.x += item.vel_mag * delta * item.vel_x_dir),
			(item.y += item.vel_mag * delta * item.vel_y_dir),
			ctx.fillRect(item.x, item.y, item.width, item.height))

		if (item.x < 0 && item.vel_x_dir < 0) {
			item.vel_x_dir *= -1
		}
		if (item.y < 0 && item.vel_y_dir < 0) {
			item.vel_y_dir *= -1
		}

		if (item.x > window.innerWidth && item.vel_x_dir > 0) {
			item.vel_x_dir *= -1
		}

		if (item.y > window.innerHeight && item.vel_y_dir > 0) {
			item.vel_y_dir *= -1
		}

		ctx.fill()
	})
}

/**
 * Sets up the spacebackground canvas
 *
 * @returns A canvas that represents space
 */
export default function SpaceCanvas() {
	const ref = useRef<HTMLCanvasElement>(null!)

	useEffect(() => {
		let animationFrameId: number = null!
		let time_last = performance.now()
		if (!ref) return
		const canvas = ref.current

		if (!canvas) return
		const context = canvas.getContext('2d')

		if (!context) return

		const shapeMemo = initialize()

		canvas.width = window.innerWidth
		canvas.height = window.innerHeight

		const animator = () => {
			render(context, performance.now() - time_last, shapeMemo)
			time_last = performance.now()
			animationFrameId = window.requestAnimationFrame(animator)
		}

		animator()

		return () => {
			window.cancelAnimationFrame(animationFrameId)
		}
	}, [])

	return <canvas ref={ref} className="Space-Background"></canvas>
}
