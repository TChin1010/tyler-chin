/**
 * @fileoverview Contains parts of the Playlist
 */
import React from 'react';
import Div from '../components/html/Div';
import './Playlist.css';

type PlaylistProps = {
  title?: string;
  desc?: string;
  src?: string;
  onClick?: () => void;

};

/**
 * Creates an HTML dom element of a playlist
 * that spans 100% of the width of the parent
 * 
 * @param src The locaiton of the image (located in public folder)
 * @param title The title of the playlist
 * @param desc The description of the playlist
 * @returns An HTMl dom element that represents a playlist
 */
export function Playlist({src, title, desc, onClick} : PlaylistProps) {
    return (
        <Div id='playlist' onClick={onClick}>
            <img src={src} alt="Image loading error"></img>
            <div id='playlist-title-desc'>
                <h3> {title} </h3>
                <p> {desc} </p>
            </div>
        </Div>

    );
}

export default Playlist;
