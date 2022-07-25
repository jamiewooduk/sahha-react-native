import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import Sahha from 'sahha-react-native';

export default function ProfileView() {
  const [jsonString, setJsonString] = useState('');
  const [isSwitchEnabled, setIsSwitchEnabled] = useState<boolean>(false);
  const toggleSwitch = () =>
    setIsSwitchEnabled((previousState) => !previousState);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ textAlign: 'center', fontFamily: 'Rubik-Regular' }}>
        A new analysis will be available every 24 hours
      </Text>
      <View style={styles.divider} />
      <Text
        style={{
          textAlign: 'center',
          paddingBottom: 20,
          fontFamily: 'Rubik-Regular',
        }}
      >
        Include source data in analysis
      </Text>
      <Switch
        onValueChange={toggleSwitch}
        value={isSwitchEnabled}
        style={{ alignSelf: 'center' }}
      />
      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => {
          let endDate: Date = new Date();
          let days = endDate.getDate() - 7;
          var startDate = new Date();
          startDate.setDate(days);
          const settings = {
            startDate: startDate.getTime(),
            endDate: endDate.getTime(),
            includeSourceData: isSwitchEnabled,
          };
          Sahha.analyze(settings, (error: string, value: string) => {
            if (error) {
              console.error(`Error: ${error}`);
            } else if (value) {
              console.log(`Value: ${value}`);
              setJsonString(value);
            }
          });
        }}
      >
        <Text style={styles.touchableText}>Analyze Previous Week</Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => {
          const settings = {
            includeSourceData: isSwitchEnabled,
          };
          Sahha.analyze({ settings }, (error: string, value: string) => {
            if (error) {
              console.error(`Error: ${error}`);
            } else if (value) {
              console.log(`Value: ${value}`);
              setJsonString(value);
            }
          });
        }}
      >
        <Text style={styles.touchableText}>Analyze Previous Day</Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <Text style={{ fontFamily: 'Rubik-Regular' }}>{jsonString}</Text>
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
  touchableText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
  },
});
