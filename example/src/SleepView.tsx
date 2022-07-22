import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Sahha, { SahhaSensor, SahhaSensorStatus } from 'sahha-react-native';

export default function SleepView() {
  const [sensorStatus, setSensorStatus] = useState<SahhaSensorStatus>(
    SahhaSensorStatus.pending
  );

  var isDisabled =
    sensorStatus === SahhaSensorStatus.unavailable ||
    sensorStatus === SahhaSensorStatus.enabled;

  useEffect(() => {
    console.log('sleep');
    Sahha.getSensorStatus(
      SahhaSensor.sleep,
      (error: string, value: SahhaSensorStatus) => {
        if (error) {
          console.error(`Error: ${error}`);
        } else if (value) {
          console.log(`Sensor Status: ${value}`);
          setSensorStatus(value);
        }
      }
    );
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>
        SENSOR STATUS
      </Text>
      <Picker enabled={false} selectedValue={sensorStatus}>
        <Picker.Item label="Pending" value={0} />
        <Picker.Item label="Unavailable" value={1} />
        <Picker.Item label="Disabled" value={2} />
        <Picker.Item label="Enabled" value={3} />
      </Picker>
      <View style={styles.divider} />
      <Button
        title="ENABLE"
        disabled={isDisabled}
        onPress={() => {
          console.log('press');
          Sahha.enableSensor(
            SahhaSensor.sleep,
            (error: string, value: SahhaSensorStatus) => {
              if (error) {
                console.error(`Error: ${error}`);
              } else if (value) {
                console.log(`Sensor Status: ${value}`);
                setSensorStatus(value);
              }
            }
          );
        }}
      />
      <View style={styles.divider} />
      <Button
        title={'OPEN APP SETTINGS'}
        onPress={() => {
          Sahha.openAppSettings();
        }}
      />
    </ScrollView>
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
