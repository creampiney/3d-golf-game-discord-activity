import { create } from 'zustand'

interface GlobalStatusState {
    isStationary: boolean,
    setStationary: (isStationary: boolean) => void,
    power: number,
    setPower: (power: number) => void,
    polar: number,
    setPolar: (polar: number) => void,
    azimuth: number,
    setAzimuth: (azimuth: number) => void,
    stroke: number,
    setStroke: (stroke: number) => void,
}

export const useGlobalStatusStore = create<GlobalStatusState>((set, get) => {
    return {
        isStationary: false,
        setStationary: (isStationary) => set({ isStationary }),
        power: 50,
        setPower: (power) => set({ power }),
        polar: 90,
        setPolar: (polar) => set({ polar }),
        azimuth: 180,
        setAzimuth: (azimuth) => set({ azimuth }),
        stroke: 0,
        setStroke: (stroke) => {
            localStorage.setItem("stroke", stroke.toFixed(0))
            set({ stroke })
        },
    }
})