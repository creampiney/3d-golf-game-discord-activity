import React, {useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import SoundToggler from '../components/SoundToggler';
import { useSettingsStore } from '../states/settings';
import './Reset.css'
const Reset: React.FC = () => {

  const stroke = localStorage.getItem("stroke") ? localStorage.getItem("stroke") : "0"


  const [allowSound] = useSettingsStore((state) => [
    state.allowSound,
])

  const audio = useRef<HTMLAudioElement>(new Audio('/sounds/congrutulation.mp3'))


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
    <div className="relative w-screen h-screen flex flex-col gap-5 justify-center items-center bg-slate-900 text-slate-100">
        <div className="background-congra-image"></div>
        <div className="foreground flex flex-col gap-8 justify-center items-center w-full h-full">
          <div className='pacifico-regular'>
              🎉Congratulation
          </div>
          <div>
            <span className="kanit-semibold">Stroke: {stroke}</span>
          </div>
          <Link to="/" className='level-block'>
          <div className="level-text">Go back to Home</div>
          </Link>
          <div className="absolute top-2 right-2">
            <SoundToggler />
          </div>
        </div>
    </div>
  );
};

export default Reset;