import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Sahha from 'sahha-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthenticationView() {
  const [profileToken, setProfileToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    console.log('auth');
    getPrefs();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const setPrefs = async () => {
      try {
        await AsyncStorage.setItem('@profileToken', profileToken);
        await AsyncStorage.setItem('@refreshToken', refreshToken);
        const jsonValue = JSON.stringify(isAuth);
        await AsyncStorage.setItem('@isAuth', jsonValue);
      } catch (error) {
        console.error(error);
      }
    };
    setPrefs();
  }, [isAuth]);

  const getPrefs = async () => {
    try {
      const _profileToken = await AsyncStorage.getItem('@profileToken');
      if (_profileToken !== null) {
        setProfileToken(_profileToken);
      }
      const _refreshToken = await AsyncStorage.getItem('@refreshToken');
      if (_refreshToken !== null) {
        setRefreshToken(_refreshToken);
      }
      const jsonValue = await AsyncStorage.getItem('@isAuth');
      if (jsonValue !== null) {
        const boolValue = JSON.parse(jsonValue);
        setIsAuth(boolValue);
      }
    } catch (error) {
      console.error(error);
    }
  };

  function onPressAuthenticate() {
    if (!!profileToken === false) {
      Alert.alert('Missing PROFILE TOKEN');
    } else if (!!refreshToken === false) {
      Alert.alert('Missing REFRESH TOKEN');
    } else {
      Sahha.authenticate(
        profileToken,
        refreshToken,
        (error: string, success: boolean) => {
          console.log(`Success: ${success}`);
          setIsAuth(success);
          if (error) {
            console.error(`Error: ${error}`);
          }
        }
      );
    }
  }

  function onPressDelete() {
    setProfileToken('');
    setRefreshToken('');
    setIsAuth(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.authStatus}>
        {isAuth ? 'You are authenticated' : 'You are not authenticated'}
      </Text>
      <View style={styles.divider} />
      <Text>Profile Token</Text>
      <TextInput
        style={styles.input}
        onChangeText={setProfileToken}
        value={profileToken}
        placeholder="ABC123"
      />
      <Text>Refresh Token</Text>
      <TextInput
        style={styles.input}
        onChangeText={setRefreshToken}
        value={refreshToken}
        placeholder="ABC123"
      />
      <View style={styles.divider} />
      <TouchableOpacity style={styles.touchable} onPress={onPressAuthenticate}>
        <Text style={styles.touchableText}>Authenticate</Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity style={styles.touchable} onPress={onPressDelete}>
        <Text style={styles.touchableText}>Delete</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    margin: 20,
    backgroundColor: '#cccccc',
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontFamily: 'Rubik-Regular',
  },
  authStatus: {
    alignSelf: 'center',
    fontFamily: 'Rubik-Regular',
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
