export type Circle = {
	x: number
	y: number
	radius: number
	vel_x_dir?: number
	vel_y_dir?: number
	vel_mag?: number
	startAngle?: number
	endAngle?: number
	fillStyle?: string
}

export type Rectangle = {
	x: number
	y: number
	vel_x_dir?: number
	vel_y_dir?: number
	vel_mag?: number
	width: number
	height: number
	fillStyle?: string
}

export type ShapesMemo = {
	CIRCLE: Circle[],
	RECTANGLE: Rectangle[]
}