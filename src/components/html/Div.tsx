/**
 * @fileoverview A div componentized
 */
import React from 'react';
import './Div.css'

type divProps = React.HTMLAttributes<HTMLDivElement>

export function Div({children, className, id, ...props} : divProps) {
    return (
        <div 
        className={`default-div${className ? ` ${className}` : ''}`} 
        id={`${id ? `${id}` : ''}`}>
            {children}
        </div>

    );
}

export default Div;
