/**
 * @fileoverview Contains parts of the footer
 */
import React, { useEffect } from 'react';
import { useMusic } from '../utils/contexts/MusicContext';
import { add, addList, peek, next, previous } from '../utils/MusicController/Playlist';
import { useAudioPlayerContext } from 'react-use-audio-player';
import { DEFAULT_VOLUME } from '../utils/MusicController/MusicConstants';
import Button from '../components/html/Button';
import Div from '../components/html/Div';


export function MusicController() {
    const musicFolder = '/public/Music';
    const { load, isLooping, isPlaying, pause, play, setVolume, volume } = useAudioPlayerContext();
    const { setCurrentSong } = useMusic();
    
    async function playCurrent() {
        const savedVolume = localStorage.getItem('volume');
        load(peek(), {
            autoplay: true,
            initialVolume: savedVolume !== null ? parseFloat(savedVolume) : DEFAULT_VOLUME,
            onend: () => {
                if(isLooping) { return }
                const current = peek();

                add(current);
                next();

                playCurrent();
            }
        })
        setCurrentSong(peek());
    };

    function goPrevious() {
        previous();
        playCurrent();
    }

    function goNext() {
        next();
        playCurrent();
    }


    useEffect(() => {
        const filesMetaData = import.meta.glob('/src/assets/music/*');
        addList(Object.keys(filesMetaData));
        const saved = localStorage.getItem("volume");
        if (saved !== null) {
            setVolume(Number(saved));
        }
        playCurrent();
        setCurrentSong(peek());
    }, []);
    return (
        <Div style={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
            <Button onClick={goPrevious}>Previous</Button>
            <Button onClick={() => {isPlaying ? pause() : play()}}>Pause</Button>
            <Button onClick={goNext}>Next</Button>
        </Div>
    );
}

export default MusicController;
