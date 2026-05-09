/**
 * @fileoverview Contains parts of the footer
 */
import React from 'react';
import './Footer.css';
import Div from '../components/html/Div';
import Music from './Music';
import PlaylistHeader from './PlaylistHeader';

export function MyProjectContentContainer() {
    return (
        <Div className='main-content'>
            <PlaylistHeader title={'My Projects'} playlistCover={'public/assets/black.png'}>4 projects saved</PlaylistHeader>
            <Div id='music-project-container'>
                <Music src={'public/assets/black.png'}>This Website</Music>
                <Music src={'public/assets/black.png'}>Pantry Pal</Music>
                <Music src={'public/assets/black.png'}>Stock Predictor</Music>
                <Music src={'public/assets/black.png'}>Assembly Tetris</Music>
            </Div>
        </Div>

    );
}

export default MyProjectContentContainer;
