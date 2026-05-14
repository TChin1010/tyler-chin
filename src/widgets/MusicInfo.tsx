/**
 * @fileoverview Contains parts of the display that displays
 * info about the music such as title and author
 */
import React, { useEffect, useState } from 'react';
import Div from '../components/html/Div';
import { peek } from '../utils/MusicController/Playlist';
import { parseBlob } from 'music-metadata';
import { useMusic } from '../utils/contexts/MusicContext'
import './MusicInfo.css';

export function MusicInfo() {
    const [title, setTitle] = useState<string | undefined>('');
    const [author, setAuthor] = useState<string | undefined>('');
    const { currentSong } = useMusic();

    useEffect(() => {
        async function readMetaData() {

            const audioUrl = new URL('../assets/music/mondamusic-lofi-lofi-girl-lofi-chill-512853.mp3', import.meta.url).href;

            const response = await fetch(audioUrl);
            const blob = await response.blob();

            const metadata = await parseBlob(blob);
            setTitle(metadata.common.title);
            setAuthor(metadata.common.artist);


        }
        readMetaData();
        console.log(currentSong);

    }, [currentSong]);
    return (
        <Div style={{display: 'flex', flexDirection: 'row', height: '100%'}}>
            <Div id={'songTitle'}>
                <h3> {title} </h3>
                <p> {author} </p>
            </Div>
            <img id='album-cover' src={'public/assets/black.png'} alt="Image loading error"></img>
        </Div>
    );
}

export default MusicInfo;
