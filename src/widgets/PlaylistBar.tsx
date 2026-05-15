/**
 * @fileoverview Contains parts of the PlaylistBar
 */
import React from 'react';
import Div from '../components/html/Div';
import Playlist from './Playlist';
import { useTranslation } from 'react-i18next';
import { View } from '../pages/Home';
import './PlaylistBar.css';

type PlaylistBarProps = {
    onSelect: (view: View) => void;
};

export function PlaylistBar({ onSelect }: PlaylistBarProps) {
    const { t } = useTranslation("Playlist"); 
    return (
        <Div id='playlist-bar'>
            <h2 id='playlist-bar-h2'>My Playlists</h2>
            <hr/>
            <Playlist onClick={() => onSelect('projects')} src={'/assets/black.png'} title={t('projectsTitle')} desc={t('projectsDesc')}/>
            <Playlist onClick={() => onSelect('about')} src={'/assets/black.png'} title={t('aboutMeTitle')} desc={t('aboutMeDesc')}/>
            <Playlist onClick={() => onSelect('contact')} src={'/assets/black.png'} title={t('contactMeTitle')} desc={t('contactMeDesc')}/>
            <Playlist onClick={() => onSelect('music')} src={'/assets/black.png'} title={t('tylersFoodReviewTitle')} desc={t('tylersFoodReviewDesc')}/>
            <Playlist onClick={() => onSelect('food')} src={'/assets/black.png'} title={t('myFavouriteMusicTitle')} desc={t('myFavouriteMusicDesc')}/>

        </Div>

    );
}

export default PlaylistBar;
