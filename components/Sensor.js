import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { Gyroscope } from 'expo-sensors';
import WS from 'react-native-websocket'


function Sensor() {
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
  const [serverMsg, setServerMsg] = useState('not connected')

  useEffect(() => {
    const subscription = Gyroscope.addListener(data => {
      setGyroscopeData(data);
      this.ws.send(JSON.stringify(data));
    });

    return () => {
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
            this.ws.send(JSON.stringify(gyroscopeData))
            console.log(JSON.stringify(gyroscopeData));
          }}
          onMessage={console.log}
          onError={console.log}
          onClose={console.log}
          reconnect // Will try to reconnect onClose
        />
      <Text>Gyroscope Data:</Text>
      <Text>X: {gyroscopeData.x}</Text>
      <Text>Y: {gyroscopeData.y}</Text>
      <Text>Z: {gyroscopeData.z}</Text>
    </>
  );
}

export default Sensor