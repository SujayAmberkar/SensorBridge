import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { Gyroscope,Accelerometer,Magnetometer } from 'expo-sensors';
import WS from 'react-native-websocket'


function Sensor() {
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
  const [accData, setAccData] = useState({ x: 0, y: 0, z: 0 })
  const [magData, setMagData] = useState({ x: 0, y: 0, z: 0 })
  const [serverMsg, setServerMsg] = useState('not connected')

  useEffect(() => {
    const subscription = Gyroscope.addListener(data => {
      setGyroscopeData(data);
      this.ws.send(JSON.stringify(data));
    });

    const accSubs = Accelerometer.addListener(data=>{
      setAccData(data);
      // this.ws.send(JSON.stringify(data));
    });

    const magSubs = Magnetometer.addListener(data=>{
      setMagData(data)
    })

    return () => {
      accSubs.remove()
      subscription.remove();
    };
  }, []);

  return (
    <>
      <WS
          ref={ref => {this.ws = ref}}
          url="ws://192.168.0.104:8080/"
          onOpen={() => {
            console.log('Open!')
            // this.ws.send(JSON.stringify(gyroscopeData))
            // console.log(JSON.stringify(gyroscopeData));
          }}
          // onMessage={console.log}
          onError={console.log}
          onClose={console.log}
          reconnect // Will try to reconnect onClose
        />
      <Text>Gyroscope Data:</Text>
      <Text>X: {gyroscopeData.x}</Text>
      <Text>Y: {gyroscopeData.y}</Text>
      <Text>Z: {gyroscopeData.z}</Text>

      <Text>Accelerometer Data:</Text>
      <Text>X: {accData.x}</Text>
      <Text>Y: {accData.y}</Text>
      <Text>Z: {accData.z}</Text>

      <Text>Magnetometer Data:</Text>
      <Text>X: {magData.x}</Text>
      <Text>Y: {magData.y}</Text>
      <Text>Z: {magData.z}</Text>
    </>
  );
}

export default Sensor