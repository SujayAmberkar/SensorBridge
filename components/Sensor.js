import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { Gyroscope } from 'expo-sensors';

function Sensor() {
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const subscription = Gyroscope.addListener(data => {
      setGyroscopeData(data);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <>
      <Text>Gyroscope Data:</Text>
      <Text>X: {gyroscopeData.x}</Text>
      <Text>Y: {gyroscopeData.y}</Text>
      <Text>Z: {gyroscopeData.z}</Text>
    </>
  );
}

export default Sensor