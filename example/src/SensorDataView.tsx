import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Sahha, { SahhaSensor } from 'sahha-react-native';

export default function SensorDataView() {
  const [sahhaSensor, setSensor] = useState<string>(SahhaSensor.sleep);
  const [sensorData, setData] = useState<string>('Results shown here');

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, fontFamily: 'Rubik-Regular' }}>
        Sensor Data
      </Text>
      <Picker
        selectedValue={sahhaSensor}
        onValueChange={(sensor) => {
          setSensor(sensor);
          console.log(sensor);
        }}
      >
        {Object.values(SahhaSensor).map((sensor, index) => (
          <Picker.Item label={sensor} value={sensor} key={index} />
        ))}
      </Picker>
      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => {
          Sahha.getSensorData(sahhaSensor, (error: string, success: string) => {
            setData('');
            if (error) setData(error);
            if (success) setData(success);
          });
        }}
      >
        <Text style={styles.touchableText}>Get Data</Text>
      </TouchableOpacity>
      <ScrollView style={{ marginVertical: 16 }}>
        <ScrollView horizontal={true}>
          <Text style={{ fontFamily: 'Rubik-Regular' }}>{sensorData}</Text>
        </ScrollView>
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
  touchable: {
    backgroundColor: '#333242',
    padding: 8,
    borderRadius: 5,
  },
  touchableText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
  },
});
