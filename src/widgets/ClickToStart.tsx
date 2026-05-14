/**
 * @fileoverview Contains parts of the footer
 */
import React, { useState } from 'react';
import Div from '../components/html/Div';
import './ClickToStart.css';

export function ClickToStart() {
    const [started, setStarted] = useState(false);

    return (
        <Div className={started ? 'started' : ''} id='click-to-start-container' onClick={() => {setStarted(true)}}>
            <h1> Welcome to my website </h1>
            <p> Click anywhere to begin </p>
        </Div>

    );
}

export default ClickToStart;
