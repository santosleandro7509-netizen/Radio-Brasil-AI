
import React, { useState, useRef, useEffect } from 'react';
import { Station } from '../types';
import { ICONS } from '../constants';
import Visualizer from './Visualizer';

interface RadioPlayerProps {
  currentStation: Station | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onVolumeChange: (volume: number) => void;
}

const RadioPlayer: React.FC<RadioPlayerProps> = ({ 
  currentStation, 
  isPlaying, 
  onTogglePlay,
  onVolumeChange
}) => {
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current || !currentStation) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Playback error", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentStation]);

  if (!currentStation) return null;

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    onVolumeChange(val);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 shadow-2xl">
        {/* Hidden Audio Element */}
        <audio 
          ref={audioRef} 
          src={currentStation.url} 
          crossOrigin="anonymous" 
        />

        <div className="flex items-center gap-4 w-full md:w-auto">
          <img src={currentStation.logo} alt={currentStation.name} className="w-16 h-16 rounded-xl object-cover shadow-lg border border-white/10" />
          <div className="flex-1">
            <h4 className="font-outfit font-bold text-lg leading-tight">{currentStation.name}</h4>
            <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider">{currentStation.genre}</p>
            <p className="text-blue-400 text-[10px] font-bold mt-1 uppercase tracking-widest flex items-center gap-1">
               <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span> AO VIVO
            </p>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-2 w-full md:w-auto">
          <div className="flex items-center justify-center gap-6">
            <button className="text-zinc-500 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
              </svg>
            </button>
            <button 
              onClick={onTogglePlay}
              className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform active:scale-95 shadow-xl"
            >
              {isPlaying ? <ICONS.Pause /> : <ICONS.Play />}
            </button>
            <button className="text-zinc-500 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
              </svg>
            </button>
          </div>
          <Visualizer audioElement={audioRef.current} isPlaying={isPlaying} />
        </div>

        <div className="hidden lg:flex items-center gap-4 w-48">
          <ICONS.VolumeUp />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume}
            onChange={handleVolume}
            className="flex-1 accent-white bg-zinc-800 h-1 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default RadioPlayer;
