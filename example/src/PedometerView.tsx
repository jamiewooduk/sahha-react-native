import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Sahha, { SahhaSensor, SahhaSensorStatus } from 'sahha-react-native';

export default function PedometerView() {
  const [sensorStatus, setSensorStatus] = useState<SahhaSensorStatus>(
    SahhaSensorStatus.pending
  );

  var isDisabled =
    sensorStatus === SahhaSensorStatus.unavailable ||
    sensorStatus === SahhaSensorStatus.enabled;

  useEffect(() => {
    console.log('pedometer');
    Sahha.getSensorStatus(
      SahhaSensor.pedometer,
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
      <Text
        style={{
          fontSize: 18,
          alignSelf: 'center',
          fontFamily: 'Rubik-Regular',
        }}
      >
        Sensor Status
      </Text>
      <Picker enabled={false} selectedValue={sensorStatus}>
        <Picker.Item label="Pending" value={0} />
        <Picker.Item label="Unavailable" value={1} />
        <Picker.Item label="Disabled" value={2} />
        <Picker.Item label="Enabled" value={3} />
      </Picker>
      <View style={styles.divider} />
      <TouchableOpacity
        style={isDisabled ? styles.touchableDisabled : styles.touchable}
        disabled={isDisabled}
        onPress={() => {
          console.log('press');
          if (sensorStatus === SahhaSensorStatus.disabled) {
            Sahha.openAppSettings();
          } else {
            Sahha.enableSensor(
              SahhaSensor.pedometer,
              (error: string, value: SahhaSensorStatus) => {
                if (error) {
                  console.error(`Error: ${error}`);
                } else if (value) {
                  console.log(`Sensor Status: ${value}`);
                  setSensorStatus(value);
                }
              }
            );
          }
        }}
      >
        <Text
          style={
            isDisabled ? styles.touchableTextDisabled : styles.touchableText
          }
        >
          Enable
        </Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => {
          Sahha.openAppSettings();
        }}
      >
        <Text style={styles.touchableText}>Open App Settings</Text>
      </TouchableOpacity>
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
  touchable: {
    backgroundColor: '#333242',
    padding: 8,
    borderRadius: 5,
  },
  touchableDisabled: {
    backgroundColor: 'lightgray',
    padding: 8,
    borderRadius: 5,
  },
  touchableText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
  },
  touchableTextDisabled: {
    color: 'gray',
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
  },
});
