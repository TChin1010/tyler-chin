/**
 * @fileoverview A button componentized
 */
import React from 'react';
import './Button.css'

type divProps = React.HTMLAttributes<HTMLButtonElement>

export function Button({children, className, id, ...props} : divProps) {
    return (
        <button 
        {...props}
        className={`${className ? ` ${className}` : 'default-button'}`} 
        id={`${id ? `${id}` : ''}`}>
            {children}
        </button>

    );
}

export default Button;
