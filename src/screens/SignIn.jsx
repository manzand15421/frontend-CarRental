import React, {useEffect, useReducer, useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, Alert} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import Button from '../components/Button';
import {Link, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ModalPopup from '../components/Modal';

const initialFormState = {
  email: 'tegalcorporate@gmail.com',
  password: '@Slamet123',
};
function SignUp() {
  // const [email, setEmail] = useState('wiwin54@gmail.com');
  // const [password, setPassword] = useState('@Slamet13');
  const [formData, setFormData] = useState(initialFormState);
  const [modalVisibile, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();

  const handleChange = (val, name) => {
    setFormData({
      ...formData, //agar value bisa dimodify (hooknya)
      [name]: val, //(dispatch nya)
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://192.168.1.35:3000/api/v1/auth/signin',
        formData,
      );

      //Untuk async storage ( menyimpan data )
      const {data} = response.data;
      await AsyncStorage.setItem('token', JSON.stringify(data.token));
      await AsyncStorage.setItem(
        'users',
        JSON.stringify({
          fullname : data.user.fullname,
          email: data.user.email,
        }),
      );
      setModalVisible(true);
      setErrorMessage(null);
    } catch (error) {
      const errorMessage = error.response.data.message;
      setModalVisible(true);
      setErrorMessage(errorMessage);
      console.log(errorMessage);
    }
  };

  useEffect(() => {
    if (modalVisibile === true) {
      setTimeout(() => {
        if (errorMessage === null) navigation.navigate('homeTabs');
        setModalVisible(false);
        setFormData(initialFormState);
      }, 1000);
    }
  });
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
            value={'tegalcorporate@gmail.com'}
            onChangeText={text => handleChange(text, 'email')}
          />
        </View>

        <View>
          <Text style={styles.formText}>Create Password*</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="min.8,!@,123,Aa"
            placeholderTextColor={'#A5A5A5'}
            style={styles.formInput}
            value={'@Slamet123'}
            onChangeText={text => handleChange(text, 'password')}
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
            Sign Up For Free
          </Link>
        </Text>
      </View>
      <ModalPopup visible={modalVisibile}>
        <View style={styles.modalBackground}>
          {errorMessage !== null ? (
            <>
              <Icon size={13} name={'x-circle'} />
              {Array.isArray(errorMessage) ? (
                errorMessage.map(e => {
                  return <Text>{e.message}</Text>;
                })
              ) : (
                <Text> {errorMessage} </Text>
              )}
            </>
          ) : (
            <>
              <Icon size={32} name={'check-circle'} />
              <Text>Berhasil Login</Text>
            </>
          )}
        </View>
      </ModalPopup>
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
    width: '90%',
    alignSelf: 'center',
  },
  modalBackground : {
    width : '90%',
    backgroundColor : "#fff",
    elevation : 20,
    borderRadius : 4,
    padding : 20,
  },
});

export default SignUp;
