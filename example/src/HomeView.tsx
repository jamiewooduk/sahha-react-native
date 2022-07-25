import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { PageTitle } from './App';

export default function HomeView({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.logo} source={require('../assets/sahha-logo.png')} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(PageTitle.AUTHENTICATION);
        }}
        style={styles.touchable}
      >
        <Text style={styles.touchableText}>{PageTitle.AUTHENTICATION}</Text>
      </TouchableOpacity>
      {/* <View style={styles.divider} /> */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(PageTitle.PROFILE);
        }}
        style={styles.touchable}
      >
        <Text style={styles.touchableText}>{PageTitle.PROFILE}</Text>
      </TouchableOpacity>
      {/* <View style={styles.divider} /> */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(PageTitle.SLEEP);
        }}
        style={styles.touchable}
      >
        <Text style={styles.touchableText}>{PageTitle.SLEEP}</Text>
      </TouchableOpacity>
      {/* <View style={styles.divider} /> */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(PageTitle.PEDOMETER);
        }}
        style={styles.touchable}
      >
        <Text style={styles.touchableText}>{PageTitle.PEDOMETER}</Text>
      </TouchableOpacity>
      {/* <View style={styles.divider} /> */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(PageTitle.ANALYZATION);
        }}
        style={styles.touchable}
      >
        <Text style={styles.touchableText}>{PageTitle.ANALYZATION}</Text>
      </TouchableOpacity>
      {/* <View style={styles.divider} /> */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(PageTitle.SENSOR_DATA);
        }}
        style={styles.touchable}
      >
        <Text style={styles.touchableText}>{PageTitle.SENSOR_DATA}</Text>
      </TouchableOpacity>
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
  touchable: {
    backgroundColor: '#333242',
    padding: 8,
    borderRadius: 5,
    marginVertical: 12,
  },
  touchableText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
  },
});
