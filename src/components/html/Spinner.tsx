import React from 'react';
import Div from './Div';
import './Spinner.css'

interface LoadingSpinnerProps {
    color?: string;
}

/**
 * Creates a loading spinner
 * @param param0 Color is the color of the spinner and size is the thhickness in px.
 * @returns HTML DOM for a loading spinner
 */
export default function Spinner({color = 'blue'}: LoadingSpinnerProps) {
    return (
        <div className='loading-spinner' style={{borderTopColor:color}}></div>
    )
}