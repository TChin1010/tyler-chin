/**
 * @fileoverview Contains parts of the footer
 */
import React from 'react';
import './Footer.css';
import Div from '../components/html/Div';
import Music from './Music';

export function MyProjectContentContainer() {
    return (
        <Div className='main-content'>
            <h1>My Projects</h1>
            <hr></hr>
            <Div id='music-project-container'>
                <Music></Music>
                <Music></Music>
                <Music></Music>
                <Music></Music>
                <Music></Music>
                <Music></Music>
                <Music></Music>
            </Div>
        </Div>

    );
}

export default MyProjectContentContainer;
