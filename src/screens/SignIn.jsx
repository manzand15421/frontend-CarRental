import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  useWindowDimensions,
  Alert,
} from 'react-native';
import Button from '../components/Button';
import {Link, useNavigation} from '@react-navigation/native';
import axios from 'axios';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        'https://pregnant-tiff-neslite-e2cb15a7.koyeb.app/api/v1//auth/signin',
        data,
      );
      console.log('data nya', response.data);
      navigation.navigate('Home')
      Alert.alert(
        'Login Berhasil', 
        'Akun Anda berhasil login!', 
        [
          {
            text: 'OK', 
            onPress: () => navigation.navigate('homeTabs') 
          }
        ]
      );
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Terjadi kesalahan, coba lagi nanti.';
      Alert.alert('Login Gagal', errorMessage);
      console.error(
        'Error Login',
        error.response ? error.response.data : error.message,
      );
    }
  };
  return (
    <View>
      <View style={styles.titleWrapper}>
        <Image
          source={require('../../assets/logo_toyota.png')}
          style={styles.Logo}
        />
        <Text style={styles.title}>Sign In</Text>
      </View>
      <View style={styles.formContainer}>
        <View>
          <Text style={styles.formText}>Email*</Text>
          <TextInput
            placeholder="Contoh : john_doe123@gmail.com"
            placeholderTextColor={'#A5A5A5'}
            style={styles.formInput}
            value={email}
            onChange={event => {
              const text = event.nativeEvent.text;
              setEmail(text);
            }}
          />
        </View>

        <View>
          <Text style={styles.formText}>Create Password*</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="min.8,!@,123,Aa"
            placeholderTextColor={'#A5A5A5'}
            style={styles.formInput}
            value={password}
            onChange={event => {
              const text = event.nativeEvent.text;
              setPassword(text);
              
            }}
          />
        </View>
      </View>

      <Button
        onPress={handleLogin}
        style={styles.ButtonContainer}
        color="#3D7B3F"
        title="Sign In"
      />

      <View>
        <Text style={styles.message}>
          Dont have any account?{' '}
          <Link style={styles.link} screen={'SignUp'}>
            Sign Up
          </Link>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 600,
    textAlign: 'center',
    marginTop: '10%',
  },
  Logo: {
    resizeMode: 'auto',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  titleWrapper: {
    padding: 15,
  },

  formContainer: {
    padding: 15,
  },
  formText: {
    fontSize: 20,
    fontWeight: 900,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },

  message: {
    padding: 30,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 500,
  },
  link: {
    textDecorationLine: 'underline',
    fontWeight: 700,
  },
  ButtonContainer: {
    width: '30%',
    alignSelf: 'center',
  },
});

export default SignUp;
