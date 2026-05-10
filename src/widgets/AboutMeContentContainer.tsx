/**
 * @fileoverview Contains parts of the footer
 */
import React from 'react';
import Div from '../components/html/Div';
import PlaylistHeader from './PlaylistHeader';

export function AboutMeContentContainer() {
    return (
               <Div className='main-content'>
                   <PlaylistHeader title={'About Me'} playlistCover={'public/assets/black.png'}> 4 projects saved</PlaylistHeader>
               </Div>

    );
}

export default AboutMeContentContainer;
