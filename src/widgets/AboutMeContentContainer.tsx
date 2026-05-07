/**
 * @fileoverview Contains parts of the footer
 */
import React from 'react';
import './Footer.css';
import Div from '../components/html/Div';

export function AboutMeContentContainer() {
    return (
               <Div className='main-content'>
                   <h1>All about me!</h1>
                   <hr></hr>
               </Div>

    );
}

export default AboutMeContentContainer;
