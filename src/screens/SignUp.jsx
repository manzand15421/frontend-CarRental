import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/Feather'
import {Link, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import ModalPopup from '../components/Modal';
import { resetCar } from '../redux/reducers/cars';
import { useDispatch } from 'react-redux';

const initialFormState = {
  fullname: '',
  email: '',
  password: '',
};

function SignUp() {
  // const [fullname, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [formData, setFormData] = useState(initialFormState);
  const [modalVisibile,setModalVisible] = useState(false)
  const [errorMessage,setErrorMessage] = useState('')
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const handleChange = (val, name) => {
    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const handleRegister = async () => {

    try {
      const response = await axios.post( 
        'http://192.168.238.158/api/v1//auth/signup',
    formData,
      );
     setModalVisible(true)
     setErrorMessage(null)
    } catch (error) {
      const errorMessage = error.response.data.message
      setModalVisible(true)
      setErrorMessage(errorMessage)
      console.log(errorMessage);
    }
  };

  useEffect(() => {
    dispatch(resetCar())
    if(modalVisibile === true) {
      setTimeout(() => {
        if(errorMessage === null ) navigation.navigate("SignIn")
          setModalVisible(false)
          setFormData(initialFormState)
      },1000)
    }
  })
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
            onChangeText={text => handleChange(text, 'fullname')}
          />
        </View>
        <View>
          <Text style={styles.formText}>Email*</Text>
          <TextInput
            placeholder="Contoh : john_doe123@gmail.com"
            placeholderTextColor={'#A5A5A5'}
            style={styles.formInput}
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
            onChangeText={text => handleChange(text, 'password')}
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
    alignSelf: 'center',
    width: '90%',
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
