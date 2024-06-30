import {
    Environment,
  } from "@react-three/drei";
import { useEffect, Suspense, useRef } from "react";
import Block from "../objects/Block";
import GolfBall from "../objects/GolfBall";
import Hole from "../objects/Hole";
import CylinderBlock from "../objects/CylinderBlock";
import { Flag } from "../objects/Flag";
import { COLORS } from "../constant"
import { useNavigate } from "react-router-dom";
import { useSettingsStore } from "../states/settings";
import JumpPad from "../objects/JumpPad";


const Game2 = () => {
  const navigate = useNavigate();
  const handleBallEnterHole = () => {
      const collisionSound = new Audio('/sounds/reach_hole.mp3');
      collisionSound.play();
      setTimeout(() => {
        navigate('/reset')
      }, 1000); // Delay for 2 seconds
    };


  const [allowSound] = useSettingsStore((state) => [
    state.allowSound,
  ])

  const audio = useRef<HTMLAudioElement>(new Audio('/sounds/select_link_kirby.mp3'))


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
      <Suspense fallback={null}>
        <Environment files="/textures/envmap.hdr" background={true}/>
        <fog attach="fog" args={[0xcccccc,100000]} near={1}/>
        <fogExp2 args={[0xcccccc,1000]}/>
        <spotLight
          position={[100, 100, 100]}
          angle={Math.PI / 4}
          penumbra={0.5}
          color={0xffff99}
          intensity={30000}
          castShadow
        />
        <spotLight
          position={[100, 500, -100]}
          angle={Math.PI / 4}
          penumbra={0.5}
          color={0x0000ff}
          intensity={100000}
          castShadow
        />
        <spotLight
          position={[-100, 50, -100]}
          angle={Math.PI / 4}
          penumbra={0.5}
          color={0xff0000}
          intensity={30000}
          castShadow
        />
        <GolfBall position={[3,3,3]}/>
        <Hole position={[-24, 5, -24]} onBallEnter={handleBallEnterHole} />     
        
        <CylinderBlock color={COLORS.SOLF_TURTLE} position={[-25,2.5,-25]} args={[10,5]}/>
        <CylinderBlock color={COLORS.TURTLE} position={[-20,1.5,-20]} args={[15,3]}/>
        <Block color={COLORS.SALMON} args={[5, 1, 25]} positions={[3, 2, -5]} />
        <Block color={COLORS.RED_SALMON} args={[5, 3, 27]} positions={[3, 0.5, -4]} />
        
        <Block color={COLORS.RED_SALMON} args={[5, 8, 5]} positions={[-24, 0, -16]} />
        <Block color={COLORS.SALMON} args={[28, 7, 5]} positions={[-13, 0, -15]} />
        <Block color={COLORS.RED_SALMON} args={[30, 6, 5]} positions={[-12, 0, -15]} />

        <JumpPad position={[-15,5,0]}/>
        <CylinderBlock color={COLORS.SOFT_TURTLE} position={[-15,2.5,0]} args={[2,5]}/>
        <CylinderBlock color={COLORS.SALMON} position={[-15,2.7,0]} args={[5,2]}/>
        <CylinderBlock color={COLORS.SOFT_TURTLE} position={[-15,2.7,0]} args={[7,1]}/>
        
        <JumpPad position={[-2,5.5,-20]}/>
        <CylinderBlock color={COLORS.SOFT_TURTLE} position={[-2,3,-20]} args={[2,5]}/>
  
  
        <CylinderBlock color={COLORS.TURTLE} position={[-5,2.5,-5]} args={[2,5]}/>
        <CylinderBlock color={COLORS.SOLF_TURTLE} position={[-5,2.5,-5]} args={[4,3]}/>
        <CylinderBlock color={COLORS.TURTLE} position={[-5,2.5,-5]} args={[6,2]}/>
        
        <Block color={COLORS.PLAIN_PLANE} args={[50, 3, 50]} positions={[-15, 0, -15]} />
        <Block color={COLORS.TURTLE} args={[45, 6, 45]} positions={[-15, -3, -15]} />
        <Block color={COLORS.PLAIN_PLANE} args={[50, 3, 50]} positions={[-15, -6, -15]} />
        <Flag position={[-25, 5, -25]} />
        {/* <PlainPlane position={[-50, 0, -50]} args={[200, 200]} color={COLORS.PLAIN_PLANE}/> */}
        {/* <Ground/> */}
        
      </Suspense>
    )
  }
  
  export default Game2