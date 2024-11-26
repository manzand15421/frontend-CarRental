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
import {Link, useNavigation,useFocusEffect} from '@react-navigation/native';

import ModalPopup from '../components/Modal';
import { useDispatch,useSelector } from 'react-redux';
import { postRegister,resetState,selectUser } from '../redux/reducers/user';
import GoogleButton from '../components/googleButton';

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
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const handleChange = (val, name) => {
    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const handleRegister = async () => {
  if(formData) 
    await dispatch(postRegister(formData))
  };

  useFocusEffect (
    React.useCallback(()=> {
      if(user.data?.provider === 'google.com') {
        navigation.navigate('homeTabs', { screen: 'Akun' });
      } 
      else if (user.status === 'success') {
        setModalVisible(true);
        setErrorMessage(null);
        dispatch(resetState())
        setTimeout(() => {
          setModalVisible(false);
          navigation.navigate('SignIn');
        }, 1000);
      } else if (user.status === 'failed') {
        setModalVisible(true);
       setErrorMessage(user.message)
       dispatch(resetState())
        setTimeout(() => {
          setModalVisible(false);
        }, 1000)
      }
    },[user.status])
  )

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
      <GoogleButton/>
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
              <Text>Akun Berhasil Di daftarkan</Text>
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
