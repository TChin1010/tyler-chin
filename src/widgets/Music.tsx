/**
 * @fileoverview Contains parts of the music containers
 */
import React from 'react';
import Div from '../components/html/Div';
import './Music.css'

type MusicProps = {
  children: string;
  src?: string;

};

export function Music({src, children,}: MusicProps) {
    return (
        <Div className='backgrond-color-container' id='music-project'>
            <img id='album-cover' src={src} alt="Image loading error"></img>
                <h3 style={{ textAlign: 'left', width: "100%", paddingLeft: "var(--default-margins)" }}>
                    {children}
                </h3>
        </Div>

    );
}

export default Music;
