/**
 * @fileoverview Contains parts of the PlaylistBar
 */
import React from 'react';
import Div from '../components/html/Div';
import './PlaylistBar.css';
import Playlist from './Playlist';
import { useTranslation } from 'react-i18next';

export function PlaylistBar() {
    const { t } = useTranslation("Playlist"); 
    return (
        <Div id='playlist-bar'>
            <h2 id='playlist-bar-h2'>My Playlists</h2>
            <hr/>
            <Playlist src={'public/assets/black.png'} title={t('projectsTitle')} desc={t('projectsDesc')}/>
            <Playlist src={'public/assets/black.png'} title={t('aboutMeTitle')} desc={t('aboutMeDesc')}/>
            <Playlist src={'public/assets/black.png'} title={t('contactMeTitle')} desc={t('contactMeDesc')}/>
            <Playlist src={'public/assets/black.png'} title={t('tylersFoodReviewTitle')} desc={t('tylersFoodReviewDesc')}/>
            <Playlist src={'public/assets/black.png'} title={t('myFavouriteMusicTitle')} desc={t('myFavouriteMusicDesc')}/>

        </Div>

    );
}

export default PlaylistBar;
