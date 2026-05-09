/**
 * @fileoverview Contains parts of the playlist header
 */
import React from 'react';
import Div from '../components/html/Div';
import './PlaylistHeader.css';


type PlaylistHeaderProps = {
    title?: String,
    playlistCover?: string,
    children?: string,
}

export function PlaylistHeader({title, playlistCover, children}: PlaylistHeaderProps) {
    return (
        <>
            <Div style={{display:'flex', justifyContent: 'start', margin: 'var(--default-margins'}}>
                <img src={playlistCover} alt='Image loading error' id='playlist-main-cover'></img>
                <Div style={{display: "flex", flexDirection: "column", alignContent: "center", }}>
                    <h1 style ={{ margin: "0", padding:'var(--default-margins'}}>{title}</h1>
                    <p style = {{ margin: "0", paddingLeft: "var(--default-margins)"}}> {children} </p>
                </Div>
            </Div>
            <hr></hr>
        </>


    );
}

export default PlaylistHeader;
