import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
import SoundToggler from '../components/SoundToggler';
import { useSettingsStore } from '../states/settings';

const Home: React.FC = () => {

  const [allowSound] = useSettingsStore((state) => [
    state.allowSound,
  ])

  const audio = useRef<HTMLAudioElement>(new Audio('/sounds/entrance_kirby.mp3'))


  function playAudio() {
    if (!audio.current) return
    const handleEnded = () => {
      if (!audio.current) return
      audio.current.currentTime = 0; // Reset the audio to the start position
      audio.current.play(); // Replay the audio
    };

    audio.current.addEventListener('ended', handleEnded);
    audio.current.play();
  }

  function stopAudio() {
    if (!audio.current) return
    audio.current.pause();
    audio.current.currentTime = 0; // Reset audio to start position
  }

  useEffect(() => {
    if (allowSound) {
      playAudio()
    }
    return () => {
      stopAudio()
    };
  }, []);

  useEffect(() => {
    if (allowSound) {
      playAudio()
    }
    else {
      stopAudio()
    }
  }, [allowSound])


  return (
    <div className="relative w-screen h-screen bg-slate-900 text-slate-100">
      <div className="background-image"></div>
      <div className="foreground flex flex-col gap-8 justify-center items-center w-full h-full">
        <div>
          <div className='pacifico-bold'>Golf Game</div>
        </div>
        <div className="flex gap-5">
          {[1, 2, 3].map((level) => (
            <Link
              key={level}
              to={`/game${level}`}
              className="level-block">
              <img src="/flag.png" className="w-9 h-9" alt="flag" />
              <div className='level-text'>LEVEL {level}</div>
            </Link>
          ))}
        </div>
        <div className="absolute top-2 right-2">
          <SoundToggler />
        </div>
      </div>
    </div>
  );
};

export default Home;
