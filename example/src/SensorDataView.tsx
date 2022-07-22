import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Sahha, { SahhaSensor } from 'sahha-react-native';

export default function SensorDataView() {
  const [sahhaSensor, setSensor] = useState<string>(SahhaSensor.sleep);
  const [sensorData, setData] = useState<string>('');

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>SENSOR DATA</Text>
      <Picker
        style={{ height: 200, width: '80%' }}
        selectedValue={sahhaSensor}
        onValueChange={(sensor) => {
          setSensor(sensor);
          console.log(sensor);
        }}
      >
        {Object.values(SahhaSensor).map((sensor, index) => (
          <Picker.Item
            label={sensor.toUpperCase()}
            value={sensor}
            key={index}
          />
        ))}
      </Picker>
      <View style={styles.divider} />
      <Button
        title="GET DATA"
        onPress={() => {
          Sahha.getSensorData(sahhaSensor, (error: string, success: string) => {
            setData('');
            if (error) setData(error);
            if (success) setData(success);
          });
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text>{sensorData}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: `white`,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    margin: 20,
    width: '80%',
    backgroundColor: '#cccccc',
  },
});
