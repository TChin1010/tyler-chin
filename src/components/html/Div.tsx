/**
 * @fileoverview A div componentized
 */
import React from 'react';
import './Div.css'

type divProps = React.HTMLAttributes<HTMLDivElement>

export function Div({children, className, id, ...props} : divProps) {
    return (
        <div 
        {...props}
        className={`${className ? ` ${className}` : 'default-div'}`} 
        id={`${id ? `${id}` : ''}`}>
            {children}
        </div>

    );
}

export default Div;
