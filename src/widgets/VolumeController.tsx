/**
 * @fileoverview  This widget controls the volume of the music playerr
 */
import React, {useEffect, useState} from 'react';
import { useAudioPlayerContext } from 'react-use-audio-player';
import { DEFAULT_VOLUME } from '../utils/MusicController/MusicConstants';
import './VolumeController.css';

export function VolumeController() {
    const { setVolume } = useAudioPlayerContext();

    const [volume, setLocalVolume] = useState(() => {
        const saved = localStorage.getItem('volume');
        return saved !== null ? Number(saved) : DEFAULT_VOLUME;
    });

    // Sync to audio player once on mount + whenever changed
    useEffect(() => {
        setVolume(volume);
    }, [volume]);

    return (
        <>
            <input
            id="volume-slider"
            type="range" 
            min={0} 
            max={0.5}
            step={0.01}
            value={volume}
            onChange={(e) => {
                setLocalVolume(Number(e.target.value));
                setVolume(Number(e.target.value)); 
                localStorage.setItem('volume', String(e.target.value));
            }}
            style={{
                background: `linear-gradient(
                    to right,
                    var(--primary-accent) 0%,
                    color-mix(in srgb, var(--primary-accent), transparent 30%) ${volume * 200}%,
                    var(--scrollbar-color) ${volume * 200}%,
                    var(--scrollbar-color) 100%
                )`
            }}
            />
        </>
    );
}

export default VolumeController;
