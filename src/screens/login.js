import React, {useState, useContext} from 'react';
import {SafeAreaView, View, StyleSheet, Image, Text, Alert} from 'react-native';
import Button from '../ui/Button';
import {HelperText, TextInput} from 'react-native-paper';
import {AuthContext} from '../store/AuthContext';

export default function Login({navigation}) {
  const [newNumber, setNewNumber] = useState('');
  const {login, user} = useContext(AuthContext);

  const hasErrors = () => {
    const regex = /^09[0-9]{9}$/gi;
    return !regex.test(newNumber);
  };

  const handleSubmit = async () => {
    navigation.navigate('Code');
    let payload = {
      phone: newNumber,
    };

    await login(payload);
    console.log(user);
  };

  <script src="http://localhost:8097"></script>;

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          fontSize: 18,
          marginBottom: 10,
        }}>
        Login with phone number
      </Text>
      <Image
        style={{width: 250, height: 180}}
        source={require('../../assets/login1.png')}
      />
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          fontSize: 14,
          margin: 10,
          marginTop: 10,
        }}>
        6 digits code sent to your phone
      </Text>
            <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          fontSize: 12,
          margin: 10,
          marginTop: 10,
        }}>
        Ex: 09197410117
      </Text>
      <View style={styles.inner}>
        <View style={{width: '60%', marginRight: 10}}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your phone"
            defaultValue={newNumber}
            onChangeText={newText => {
              setNewNumber(newText);
            }}
            keyboardType="number-pad"
            maxLength={11}
          />
        </View>
        <Button
          text={'send'}
          colors={'#481DC2'}
          textColor={'white'}
          disabled={hasErrors()}
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    padding: 20,
  },

  form: {
    flex: 1,
    width: '100%',
  },
  button: {
    backgroundColor: '#FFDC3D',
    width: '30%',
    height: 60,
    color: 'black',
    borderRadius: 15,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  textInput: {
    height: 60,
    borderColor: '#000000',
  },
});
