import React, {useContext, useState} from 'react';
import {SafeAreaView, Text, Pressable, Keyboard} from 'react-native';
import Otp from '../components/otp';
import Button from '../ui/Button';
import {AuthContext} from '../store/AuthContext';
// import axios from 'axios';

export default function Code({navigation}) {
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const baseUrl = '';
  const {user} = useContext(AuthContext);

  const handleSubmitOTP = async () => {
    Alert.alert('okay')
    // const config = {
    //     headers: { Authorization: `Bearer ${user}` }
    // };
    // try {
    //     const res = await axios.post(`${baseUrl}/otp`,
    //         { otp: otpCode },
    //         config
    //     )
    //     console.log(res.data)
    // } catch (e) {
    //     Alert(e)
    // }
  };

  const maximumCodeLength = 6;

  return (
    <SafeAreaView style={{height: '100%', padding: 15}}>
      <Text
        style={{fontFamily: 'Montserrat-Medium', fontSize: 16, color: 'black'}}>
        Enter Code{' '}
      </Text>
      <Pressable style={{height: '80%'}} onPress={Keyboard.dismiss}>
        <Otp
          code={otpCode}
          setCode={setOTPCode}
          maximumLength={maximumCodeLength}
          setIsPinReady={setIsPinReady}
        />
      </Pressable>
      <Button
        text={'confirm'}
        colors={'#481DC2'}
        textColor={'white'}
        disabled={!isPinReady}
        onPress={handleSubmitOTP}
      />
    </SafeAreaView>
  );
}
