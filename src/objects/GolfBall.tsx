import { SphereProps, useSphere} from "@react-three/cannon"
import { CameraControls, Line, useKeyboardControls, useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { forwardRef, useImperativeHandle, useEffect, useRef, useState } from "react"
import { Mesh, Vector3 } from "three"
import { useGlobalStatusStore } from "../states/globalStatus"

export interface GolfBallRef {
  onFall: () => void;
  getPosition: () => [number, number, number];
  applyWind: (windForce: Vector3) => void,
}


const GolfBall = forwardRef((props: SphereProps, ref) => {

    const cameraControlRef = useRef<CameraControls>(null)

    const [setGlobalStationary, stroke, setStroke] = useGlobalStatusStore((state) => [
      state.setStationary,
      state.stroke,
      state.setStroke,
    ])
    
    const [setGlobalPower, setGlobalPolar, setGlobalAzimuth] = useGlobalStatusStore((state) => [
      state.setPower,
      state.setPolar,
      state.setAzimuth,
    ])

    const initialGolfPosition = props.position ? props.position : [0, 0.2, 0]

    const golfMap = useTexture('/textures/golf-texture.png')

    // Ref and API for golf ball
      const [sphereRef, api] = useSphere<Mesh>(() => ({
        mass: 1,
        position: [0, 0.2, 0],               // Default position
        args: [0.2],                // Radius
        linearDamping: 0.6,         // Linear damping coefficient
        onCollideBegin: (e) => {
          if (e.body.name == "jumper") {
            jump()
          }
        },
        ...props
      }))
  
    // Status of golf ball
    const previousGolfPosition = useRef<Vector3>(new Vector3(initialGolfPosition[0], initialGolfPosition[1], initialGolfPosition[2]))
    const [currentGolfPosition, setCurrentGolfPosition] = useState<Vector3>(new Vector3(initialGolfPosition[0], initialGolfPosition[1], initialGolfPosition[2]))
    const previousGolfVelocity = useRef<Vector3>(new Vector3(0, 0, 0))
    const [currentGolfVelocity, setCurrentGolfVelocity] = useState<Vector3>(new Vector3(0, 0, 0))
    
    const stationaryCounter = useRef<number>(0)
    const [isStationary, setStationary] = useState<boolean>(false)


    // Keyboard Status
    const upPolarPressed = useKeyboardControls((state) => state['upPolar'])
    const downPolarPressed = useKeyboardControls((state) => state['downPolar'])
    const leftAzimuthPressed = useKeyboardControls((state) => state['leftAzimuth'])
    const rightAzimuthPressed = useKeyboardControls((state) => state['rightAzimuth'])
    const increasePowerPressed = useKeyboardControls((state) => state['increasePower'])
    const decreasePowerPressed = useKeyboardControls((state) => state['decreasePower'])
    const shootPressed = useKeyboardControls((state) => state['shoot'])

    // Shooting Status
    const [polar, setPolar] = useState<number>(90)
    const [azimuth, setAzimuth] = useState<number>(180)
    const [power, setPower] = useState<number>(50)

    // Old shooting position
    const [shootingPosition, setShootingPosition] = useState<Vector3>(new Vector3(...initialGolfPosition))

    useImperativeHandle(ref, () => ({
      onFall,
      getPosition,
      applyWind: (windForce: Vector3) => applyWind(windForce),
    }));

    // Shooting Timestamp
    const shootingTimestamp = useRef<number>(new Date().getTime())

    // Shooting Function
    function shoot() {
      
      if (power == 0) return
      // Play the hit sound
      if (new Date().getTime() - shootingTimestamp.current >= 300) {
        shootingTimestamp.current = new Date().getTime()
        
        const hitSound = new Audio("/sounds/hit.mp3")
        hitSound.play();
        
        setShootingPosition(new Vector3(...currentGolfPosition))
        const azimuthRadian = azimuth * Math.PI / 180
        const polarRadian = polar * Math.PI / 180
        const weightedPower = power / 2
        api.velocity.set(
          weightedPower * Math.sin(polarRadian) * Math.sin(azimuthRadian), 
          weightedPower * Math.cos(polarRadian), 
          weightedPower * Math.sin(polarRadian) * Math.cos(azimuthRadian)
        )
      
        setStroke(stroke + 1)
      }
      
    }

    // Fall from the field
    function onFall() {
      api.velocity.set(0, 0, 0)
      api.position.set(shootingPosition.x, shootingPosition.y, shootingPosition.z)
      api.angularVelocity.set(0, 0, 0)
    }

    function getPosition(){
      return currentGolfPosition
    }

    function applyWind (windForce: Vector3) {
      api.applyForce(windForce.toArray(), currentGolfPosition.toArray());
    }

    // Jump
    function jump() {
      let unitVectorPlane = (new Vector3(...currentGolfVelocity))
      unitVectorPlane.y = 0
      unitVectorPlane = unitVectorPlane.normalize()
      api.applyImpulse([unitVectorPlane.x * 2, 10, unitVectorPlane.z * 2], [0, 0, 0])
    }

    function followPlayer() {
      if (!cameraControlRef.current) return

      const r = 50

      cameraControlRef.current.setLookAt(
        currentGolfPosition.x + r * Math.sin(cameraControlRef.current.polarAngle) * Math.sin(cameraControlRef.current.azimuthAngle), 
        currentGolfPosition.y + r * Math.cos(cameraControlRef.current.polarAngle), 
        currentGolfPosition.z + r * Math.sin(cameraControlRef.current.polarAngle) * Math.cos(cameraControlRef.current.azimuthAngle),
        currentGolfPosition.x,
        currentGolfPosition.y,
        currentGolfPosition.z,
        true
      )
    }


    // Subscribing API of golf ball
    useEffect(() => {
        // Reset stroke
        setStroke(0)

        const unsubscribePosition = api.position.subscribe((v) => {
          setCurrentGolfPosition(new Vector3(...v))
        })
        const unsubscribeVelocity = api.velocity.subscribe((v) => {
          setCurrentGolfVelocity(new Vector3(...v))
        })
        return () => {
          unsubscribePosition()
          unsubscribeVelocity()
        }
    }, [])


    // Check if golf ball is stationary
    useEffect(() => {
      const dr = currentGolfPosition.distanceTo(previousGolfPosition.current)
      // const opp_v = previousGolfVelocity.current.clone().multiplyScalar(-1)
      // const dv = currentGolfVelocity.distanceTo(previousGolfVelocity.current)
      // const dv_opp = currentGolfVelocity.distanceTo(opp_v)
      // Golf will be stationary if dr -> 0 and dv -> 0
      // setStationary(dr <= 0.01 && (dv <= 0.5 || dv_opp <= 0.5))
      if (dr <= 0.005) {
        stationaryCounter.current++
      }
      else {
        stationaryCounter.current = 0
      }
      setStationary(stationaryCounter.current >= 20)
      
      // console.log(`dv: ${dv}\ndv_opp: ${dv_opp}`)

      previousGolfPosition.current = new Vector3(...currentGolfPosition)
      previousGolfVelocity.current = new Vector3(...currentGolfVelocity)

      if (currentGolfPosition.y <= -10) {
        onFall()
      }

    }, [currentGolfPosition])

    // Reset shooting status if ball is stationary
    useEffect(() => {
      console.log(isStationary)
      if (isStationary) {
        api.angularVelocity.set(0, 0, 0)
        api.velocity.set(0, 0, 0)
      }
      setGlobalStationary(isStationary)
    }, [isStationary])


    // Global power hook
    useEffect(() => {
      setGlobalPower(power)
    }, [power])

    // Global polar hook
    useEffect(() => {
      setGlobalPolar(polar)
    }, [polar])

    // Global azimuth hook
    useEffect(() => {
      setGlobalAzimuth(azimuth)
    }, [azimuth])


    // Update frame
    useFrame((state, delta) => {
      const deltaChange = delta * 58
      if (isStationary) {
        if (shootPressed) {
          shoot()
        }
        else if (upPolarPressed) {
          setPolar((e) => Math.max(e - deltaChange, 10))
        }
        else if (downPolarPressed) {
          setPolar((e) => Math.min(e + deltaChange, 90))
        }
        else if (leftAzimuthPressed) {
          setAzimuth((e) => e + deltaChange)
        }
        else if (rightAzimuthPressed) {
          setAzimuth((e) => e - deltaChange)
        }
        else if (increasePowerPressed) {
          setPower((e) => Math.min(e + deltaChange, 100))
        }
        else if (decreasePowerPressed) {
          setPower((e) => Math.max(e - deltaChange, 0))
        }
        
      }
      else {
        followPlayer()
      }
    })
    const lineLength = power==0 ? 0 : (power/100 * 7) + 1

  return (
    <>
      <CameraControls 
        ref={cameraControlRef}
        maxPolarAngle={Math.PI/2} 
        
      />
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.2]}/>
        <meshStandardMaterial map={golfMap} color="white" />
      </mesh>
      {
        isStationary && (
          <Line
            points={[
                currentGolfPosition,
                [
                  currentGolfPosition.x + lineLength * Math.sin(polar * Math.PI / 180) * Math.sin(azimuth * Math.PI / 180),
                  currentGolfPosition.y + lineLength * Math.cos(polar * Math.PI / 180),
                  currentGolfPosition.z + lineLength * Math.sin(polar * Math.PI / 180) * Math.cos(azimuth * Math.PI / 180),
                ]
            ]}
            color={"#23aaff"}
            lineWidth={5}           // In pixels (default)
            // segments             // If true, renders a THREE.LineSegments2. Otherwise, renders a THREE.Line2
          />
        )
      }
      
    </>
    
  )
})

export default GolfBall