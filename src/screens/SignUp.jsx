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
  const [fullname, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Form Required !!');
      return;
    }
    try {
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        'http://192.168.1.35:3000/api/v1//auth/signup',
        data,
      );
      // console.log("data nya",response.data)
      Alert.alert('Registrasi Berhasil', 'Akun Anda berhasil dibuat!', [
        {text: 'OK'},
      ]);

      if (response.status === 200) {
        navigation.navigate('SignIn');
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Terjadi kesalahan, coba lagi nanti.';
      Alert.alert('Registrasi Gagal', errorMessage, [{text: 'OK'}]);
      console.log(errorMessage);
    }
  };
  return (
    <View>
      <View style={styles.titleWrapper}>
        <Image
          source={require('../../assets/logo_toyota.png')}
          style={styles.Logo}
        />
        <Text style={styles.title}>Sign Up</Text>
      </View>
      <View style={styles.formContainer}>
        <View>
          <Text style={styles.formText}>Name*</Text>
          <TextInput
            placeholder=" Full Name"
            placeholderTextColor={'#A5A5A5'}
            style={styles.formInput}
            value={fullname}
            onChange={event => {
              const text = event.nativeEvent.text;
              setName(text);
              console.log('Text changed:', text);
            }}
          />
        </View>
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
              console.log('Text changed:', text);
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
              console.log('Text changed:', text);
            }}
          />
        </View>
      </View>

      <Button
        onPress={handleRegister}
        style={styles.ButtonContainer}
        color="#3D7B3F"
        title="Sign Up"
      />

      <View>
        <Text style={styles.message}>
          Already have an account? {''}
          <Link style={styles.link} screen={'SignIn'}>
            Sign In Account
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
    alignSelf: 'center',
    width: '90%',
  },
});

export default SignUp;
