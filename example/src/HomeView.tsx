import React from 'react';
import { View, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { PageTitle } from './App';
import Sahha, { SahhaEnvironment, SahhaSensor } from 'sahha-react-native';

export default function HomeView({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.logo} source={require('../assets/sahha-logo.png')} />
      <Button
        title={PageTitle.AUTHENTICATION.toString()}
        onPress={() => {
          navigation.navigate(PageTitle.AUTHENTICATION.toString());
        }}
      />
      <View style={styles.divider} />
      <Button
        title={PageTitle.PROFILE.toString()}
        onPress={() => {
          navigation.navigate(PageTitle.PROFILE.toString());
        }}
      />
      <View style={styles.divider} />
      <Button
        title={PageTitle.SLEEP.toString()}
        onPress={() => {
          navigation.navigate(PageTitle.SLEEP.toString());
        }}
      />
      <View style={styles.divider} />
      <Button
        title={PageTitle.PEDOMETER.toString()}
        onPress={() => {
          navigation.navigate(PageTitle.PEDOMETER.toString());
        }}
      />
      <View style={styles.divider} />
      <Button
        title={PageTitle.ANALYZATION.toString()}
        onPress={() => {
          navigation.navigate(PageTitle.ANALYZATION.toString());
        }}
      />
      <View style={styles.divider} />
      <Button
        title={PageTitle.SENSOR_DATA.toString()}
        onPress={() => {
          navigation.navigate(PageTitle.SENSOR_DATA.toString());
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    margin: 20,
    backgroundColor: '#cccccc',
  },
  logo: {
    scaleX: 0.7,
    scaleY: 0.7,
    alignSelf: 'center',
    marginBottom: 40,
  },
});
