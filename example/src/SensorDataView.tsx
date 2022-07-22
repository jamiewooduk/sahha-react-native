import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Sahha, { SahhaSensor } from 'sahha-react-native';

export default function SensorDataView() {
  const [sahhaSensor, setSensor] = useState<string>(SahhaSensor.sleep);
  const [sensorData, setData] = useState<string>('Results shown here');

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>SENSOR DATA</Text>
      <Picker
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
      <ScrollView style={{ marginVertical: 16 }}>
        <Text>{sensorData}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: `white`,
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  divider: {
    height: 1,
    margin: 20,
    backgroundColor: '#cccccc',
  },
});
