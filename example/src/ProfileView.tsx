import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sahha from 'sahha-react-native';

export default function ProfileView() {
  const [age, setAge] = useState<string>('');
  const [ageNumber, setAgeNumber] = useState<number>();
  const [gender, setGender] = useState<string>('Male');
  const [country, setCountry] = useState<string>('');
  const [birthCountry, setBirthCountry] = useState<string>('');
  const [ethnicity, setEthnicity] = useState<string>('');
  const [occupation, setOccupation] = useState<string>('');
  const [industry, setIndustry] = useState<string>('');
  const [income, setIncome] = useState<string>('');
  const [education, setEducation] = useState<string>('');
  const [relationship, setRelationship] = useState<string>('');
  const [locale, setLocale] = useState<string>('');
  const [livingArrangement, setLivingArrangement] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');

  useEffect(() => {
    console.log('profile');
    getPrefs();
  }, []);

  const getPrefs = async () => {
    try {
      const _age = await AsyncStorage.getItem('@age');
      if (_age !== null) {
        setAge(_age);
        let ageInt = parseInt(_age);
        if (ageInt) {
          setAgeNumber(ageInt);
        }
      }
      const _gender = await AsyncStorage.getItem('@gender');
      if (_gender !== null) {
        setGender(_gender);
      }
      const _country = await AsyncStorage.getItem('@country');
      if (_country !== null) {
        setCountry(_country);
      }
      const _birthCountry = await AsyncStorage.getItem('@birthCountry');
      if (_birthCountry !== null) {
        setBirthCountry(_birthCountry);
      }
      const _ethnicity = await AsyncStorage.getItem('@ethnicity');
      if (_ethnicity !== null) {
        setEthnicity(_ethnicity);
      }
      const _occupation = await AsyncStorage.getItem('@occupation');
      if (_occupation !== null) {
        setOccupation(_occupation);
      }
      const _industry = await AsyncStorage.getItem('@industry');
      if (_industry !== null) {
        setIndustry(_industry);
      }
      const _income = await AsyncStorage.getItem('@income');
      if (_income !== null) {
        setIncome(_income);
      }
      const _education = await AsyncStorage.getItem('@education');
      if (_education !== null) {
        setEducation(_education);
      }
      const _relationship = await AsyncStorage.getItem('@relationship');
      if (_relationship !== null) {
        setRelationship(_relationship);
      }
      const _locale = await AsyncStorage.getItem('@locale');
      if (_locale !== null) {
        setLocale(_locale);
      }
      const _livingArrangement = await AsyncStorage.getItem(
        '@livingArrangement'
      );
      if (_livingArrangement !== null) {
        setLivingArrangement(_livingArrangement);
      }
      const _birthDate = await AsyncStorage.getItem('@birthDate');
      if (_birthDate !== null) {
        setBirthDate(_birthDate);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setPrefs = async () => {
    try {
      await AsyncStorage.setItem('@age', age);
      await AsyncStorage.setItem('@gender', gender);
      await AsyncStorage.setItem('@country', country);
      await AsyncStorage.setItem('@birthCountry', birthCountry);
      await AsyncStorage.setItem('@ethnicity', ethnicity);
      await AsyncStorage.setItem('@occupation', occupation);
      await AsyncStorage.setItem('@industry', industry);
      await AsyncStorage.setItem('@income', income);
      await AsyncStorage.setItem('@education', education);
      await AsyncStorage.setItem('@relationship', relationship);
      await AsyncStorage.setItem('@locale', locale);
      await AsyncStorage.setItem('@livingArrangement', livingArrangement);
      await AsyncStorage.setItem('@birthDate', birthDate);
    } catch (error) {
      console.error(error);
    }
  };

  const savePrefs = () => {
    setPrefs();

    const demographic = {
      age: checkAndSetNull(ageNumber), // number
      gender: checkAndSetNull(gender), // string
      country: checkAndSetNull(country),
      birthCountry: checkAndSetNull(birthCountry),
      ethnicity: checkAndSetNull(ethnicity),
      occupation: checkAndSetNull(occupation),
      industry: checkAndSetNull(industry),
      income: checkAndSetNull(income),
      education: checkAndSetNull(education),
      relationship: checkAndSetNull(relationship),
      locale: checkAndSetNull(locale),
      livingArrangement: checkAndSetNull(livingArrangement),
      birthDate: checkAndSetNull(birthDate),
    };

    console.log('age num: ', ageNumber);
    console.log('demo: ', demographic);

    Sahha.postDemographic(demographic, (error: string, success: boolean) => {
      if (error) {
        console.error(`Error: ${error}`);
      } else if (success) {
        console.log(`Success: ${success}`);
      }
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>AGE</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          maxLength={3}
          onChangeText={(value) => {
            let ageInt = parseInt(value);
            if (ageInt) {
              console.log(ageInt.toString());
              setAge(ageInt.toString());
              setAgeNumber(ageInt);
            } else {
              console.log('bad int');
              setAge('');
              setAgeNumber(undefined);
            }
          }}
          value={age}
          placeholder="1 - 100"
        />
        <View style={styles.divider} />
        <Text>GENDER</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => {
            setGender(itemValue);
          }}
        >
          <Picker.Item label="Male" value={'Male'} />
          <Picker.Item label="Female" value={'Female'} />
          <Picker.Item label="Gender Diverse" value={'Gender Diverse'} />
        </Picker>
        <View style={styles.divider} />
        <Text>COUNTRY</Text>
        <TextInput
          style={styles.input}
          keyboardType="numbers-and-punctuation"
          maxLength={2}
          onChangeText={(value) => {
            console.log(country);
            setCountry(value.toUpperCase());
          }}
          value={country}
          placeholder="2 letter Country code e.g. US"
        />
        <View style={styles.divider} />
        <Text>COUNTRY OF BIRTH</Text>
        <TextInput
          style={styles.input}
          keyboardType="numbers-and-punctuation"
          maxLength={2}
          onChangeText={(value) => {
            console.log(value);
            setBirthCountry(value.toUpperCase());
          }}
          value={birthCountry}
          placeholder="2 letter Country code e.g. US"
        />
        <View style={styles.divider} />
        <Text>ETHNICITY</Text>
        <TextInput
          style={styles.input}
          keyboardType="numbers-and-punctuation"
          maxLength={50}
          onChangeText={(value) => {
            console.log(value);
            setEthnicity(value);
          }}
          value={ethnicity}
          placeholder="E.g. European"
        />
        <View style={styles.divider} />
        <Text>OCCUPATION</Text>
        <TextInput
          style={styles.input}
          keyboardType="numbers-and-punctuation"
          maxLength={50}
          onChangeText={(value) => {
            console.log(value);
            setOccupation(value);
          }}
          value={occupation}
          placeholder="E.g. Project Manager"
        />
        <View style={styles.divider} />
        <Text>INDUSTRY</Text>
        <TextInput
          style={styles.input}
          keyboardType="numbers-and-punctuation"
          maxLength={50}
          onChangeText={(value) => {
            console.log(value);
            setIndustry(value);
          }}
          value={industry}
          placeholder="E.g. Information Technology"
        />
        <View style={styles.divider} />
        <Text>INCOME</Text>
        <TextInput
          style={styles.input}
          keyboardType="numbers-and-punctuation"
          maxLength={50}
          onChangeText={(value) => {
            console.log(value);
            setIncome(value);
          }}
          value={income}
          placeholder="E.g. Up to 100K"
        />
        <View style={styles.divider} />
        <Text>EDUCATION</Text>
        <TextInput
          style={styles.input}
          keyboardType="numbers-and-punctuation"
          maxLength={50}
          onChangeText={(value) => {
            console.log(value);
            setEducation(value);
          }}
          value={education}
          placeholder="E.g. Tertiary"
        />
        <View style={styles.divider} />
        <Text>RELATIONSHIP</Text>
        <TextInput
          style={styles.input}
          keyboardType="numbers-and-punctuation"
          maxLength={50}
          onChangeText={(value) => {
            console.log(value);
            setRelationship(value);
          }}
          value={relationship}
          placeholder="E.g. Single"
        />
        <View style={styles.divider} />
        <Text>LOCALE</Text>
        <TextInput
          style={styles.input}
          keyboardType="numbers-and-punctuation"
          maxLength={50}
          onChangeText={(value) => {
            console.log(value);
            setLocale(value);
          }}
          value={locale}
          placeholder="E.g. Urban"
        />
        <View style={styles.divider} />
        <Text>LIVING ARRANGEMENT</Text>
        <TextInput
          style={styles.input}
          keyboardType="numbers-and-punctuation"
          maxLength={50}
          onChangeText={(value) => {
            console.log(value);
            setLivingArrangement(value);
          }}
          value={livingArrangement}
          placeholder="E.g. Renting"
        />
        <View style={styles.divider} />
        <Text>BIRTH DATE</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={10}
          onChangeText={(value) => {
            console.log(value);
            setBirthDate(value);
          }}
          value={birthDate}
          placeholder="yyyy-mm-dd"
        />
        <View style={styles.divider} />
        <Button title="SAVE" onPress={savePrefs} />
      </View>
    </ScrollView>
  );
}

function checkAndSetNull(value: any): any {
  console.log(value);
  if (!value) return null;
  if (typeof value == 'number') {
    return value as number;
  }

  if (typeof value == 'string') {
    if (value == '') return null;
    return value as string;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 16,
  },
  scrollview: {
    flex: 1,
  },
  divider: {
    height: 1,
    margin: 20,
    // width: '80%',
    backgroundColor: '#cccccc',
  },
  input: {
    height: 40,
    margin: 12,
    // width: '80%',
    borderWidth: 1,
    padding: 10,
  },
});
