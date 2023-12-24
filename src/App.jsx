import { useState, useEffect } from 'react';
import arrowDown from './assets/arrow-down-339-svgrepo-com.svg';
import arrowUp from './assets/arrow-up-340-svgrepo-com.svg';
import clapSound from './sounds/clap.wav';
import './App.css';

function App() {
  const [seconds, setSeconds] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    let timeoutId;

    const playSound = () => {
      const audio = document.querySelector('audio');
      audio.currentTime = 0;
      audio.play();
      console.log('clap');
    };

    const setNewTimeout = () => {
      timeoutId = setTimeout(() => {
        playSound();
        setNewTimeout();
      }, Math.max(Math.floor(Math.random() * seconds * 1000), 2000));
    };

    setNewTimeout();

    return () => {
      clearTimeout(timeoutId);
    };
  });

  return (
    <div className='main-container'>
      <h1>Clap generator</h1>
      <div className='input-container'>
        <h1>{seconds}s</h1>
        <div className='button-container'>
          <button onClick={() => setSeconds((prevSeconds) => prevSeconds + 1)}>
            <img className='arrow-button' src={arrowUp} alt='Arrow Up' />
          </button>
          <button onClick={() => setSeconds((prevSeconds) => (prevSeconds > 2 ? prevSeconds - 1 : prevSeconds))}>
            <img className='arrow-button' src={arrowDown} alt='Arrow Down' />
          </button>
        </div>
      </div>
      <button onClick={() => setIsPlaying(true)}>
        <h1>Set</h1>
      </button>
      <audio src={clapSound}></audio>
    </div>
  );
}

export default App;
