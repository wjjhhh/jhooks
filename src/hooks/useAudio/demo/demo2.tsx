import React from 'react';
import { useAudio } from '@wjjhhh/jhooks';

const AudioPlayer: React.FC = () => {
    const [src, setSrc] = React.useState<string>();
    const { isPlaying, volume, togglePlay, setVolume, isLoading } = useAudio({
        src,
        initialVolume: 1,
        loop: true,
        muted: true
    });
    return (
        <div>
            {
                !isLoading && <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
            }
            
            {
                src ? <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                /> : <button onClick={() => {
                setSrc('https://www.w3schools.com/html/horse.mp3');
            }}>load</button>
            }

        </div>
    );
};

export default AudioPlayer;