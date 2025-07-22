import React from 'react';
import { useAudio } from '@wjjhhh/jhooks';

const AudioPlayer: React.FC = () => {
    const { isPlaying, volume, play, pause, togglePlay, setNewVolume } = useAudio({
        src: 'https://www.w3schools.com/html/horse.mp3',
        initialVolume: 1,
        loop: true,
        muted: true
    });
    return (
        <div>
            <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setNewVolume(Number(e.target.value))}
            />
        </div>
    );
};

export default AudioPlayer;