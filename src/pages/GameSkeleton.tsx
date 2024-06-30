import { Canvas } from '@react-three/fiber';
import {  KeyboardControls, Stats } from '@react-three/drei';
import { Physics, Debug } from '@react-three/cannon';
import Game1 from '../scenes/Game1';
import { useGlobalStatusStore } from '../states/globalStatus';
import PowerBar from '../components/PowerBar';
import Game2 from '../scenes/Game2';
import Game3 from '../scenes/Game3';
import SoundToggler from '../components/SoundToggler';
import GoBackButton from '../components/GoBackButton';

const GameSkeleton = ({level}: {level: number}) => {

  const [isStationary, power, polar, azimuth, stroke] = useGlobalStatusStore((state) => [
    state.isStationary,
    state.power,
    state.polar,
    state.azimuth,
    state.stroke,
  ])


  return (
    <div className="w-screen h-screen relative">
      {
        isStationary && (
          <div className="absolute bottom-0 left-0 z-10 flex justify-center align-center bg-slate-300 text-slate-700 opacity-70 gap-2 px-2 py-2">
            <div className="h-full flex flex-col gap-2">
              <div>Power: {power.toFixed(0)}</div>
              <PowerBar value={power} />
            </div>
            <div className="h-full flex flex-col gap-2 w-40">
              <div>Angle: {(90 - polar).toFixed(5)}</div>
              <div>Azimuth: {(((azimuth + 180.0) % 360) - 180.0).toFixed(5)}</div>
            </div>
          </div>
        )
      }
      {
        isStationary && (
          <div className="absolute bottom-0 right-0 z-10 flex flex-col justify-center align-center bg-slate-300 text-slate-700 opacity-70 gap-2 px-2 py-2">
            <div>Press <kbd>A</kbd> or <kbd>D</kbd> to change direction</div>
            <div>Press <kbd>W</kbd> or <kbd>S</kbd> to change angle</div>
            <div>Press <kbd>Q</kbd> or <kbd>E</kbd> to change power</div>
            <div>Press <kbd>Space</kbd> to shoot</div>
          </div>
        )
      }
      <div className="absolute top-0 right-0 z-10 w-24 flex flex-col justify-center align-center items-center bg-slate-300 text-slate-700 opacity-70 gap-2 px-2 py-2">
        <div className="flex gap-3">
          <GoBackButton />
          <SoundToggler />
        </div>
        <div>Stroke: {stroke}</div>
      </div>
    
      <KeyboardControls
        map={[
          { name: 'leftAzimuth', keys: ['ArrowLeft', 'a', 'A', 'ฟ'] },
          { name: 'rightAzimuth', keys: ['ArrowRight', 'd', 'D', 'ก'] },
          { name: 'upPolar', keys: ['ArrowUp', 'w', 'W', 'ไ'] },
          { name: 'downPolar', keys: ['ArrowDown', 's', 'S', 'ห'] },
          { name: 'increasePower', keys: ['e', 'E', 'ำ'] },
          { name: 'decreasePower', keys: ['q', 'Q', 'ๆ'] },
          { name: 'shoot', keys: ['Space'] },
        ]}
      >
        <Canvas style={{ width: '100vw', height: '100vh' }} shadows camera={{ position: [10, 10, 10], fov: 30 }}>
          {/* <OrbitControls /> */}
          {/* <axesHelper args={[5]} /> */}
          <Physics defaultContactMaterial={{ friction: 0.05, restitution: 0.9 }}>
            {/* <Debug> */}

              {
                (level == 1) && <Game1 />
              }
              {
                (level == 2) && <Game2 />
              }
              {
                (level == 3) && <Game3 />
              }
            
            {/* </Debug> */}
          </Physics>
          <Stats />
        </Canvas>
      </KeyboardControls>
    </div>
  );
};

export default GameSkeleton;
