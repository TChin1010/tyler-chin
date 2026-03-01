import React, { useEffect, useRef } from 'react'
import './div.css'

interface DivGridProps {
    style?: React.CSSProperties,
    className?: string,
    children?: React.ReactNode,
    id?: string
}


/**
 * This function creates a regular div
 * 
 * Default style is provided in div.css but NOT # of columns or rows.
 * 
 * @param props stores the attributes for a div HTML attribute
 * 
 * @returns a grid div 
 */
export default function Div(props: DivGridProps) {
    const {children, className, id, style} = props
    return <div className={className} id={id} style={{...style}}>
                {children}
            </div>
}