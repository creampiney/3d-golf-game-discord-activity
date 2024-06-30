import React from 'react'
import { GiSoundOff, GiSoundOn } from 'react-icons/gi'
import { useSettingsStore } from '../states/settings'

const SoundToggler = () => {

    const [allowSound, setAllowSound] = useSettingsStore((state) => [
        state.allowSound,
        state.setAllowSound
    ])

    return (
        <button className="w-fit h-fit">
            {
                allowSound 
                ? <GiSoundOn onClick={() => setAllowSound(false)} className="w-6 h-6"/> 
                : <GiSoundOff onClick={() => setAllowSound(true)} className="w-6 h-6"/>
            }
        </button>
    )
}

export default SoundToggler