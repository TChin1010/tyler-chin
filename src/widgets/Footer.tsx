/**
 * @fileoverview Contains parts of the footer
 */
import React from 'react';
import VolumeController from './VolumeController';
import MusicController from './MusicController';
import MusicInfo from './MusicInfo';
import './Footer.css';

export function Footer() {
    return (
        <footer className={'footer'}>
            <VolumeController></VolumeController>
            <MusicController></MusicController>
            <MusicInfo></MusicInfo>
        </footer>
    );
}

export default Footer;
