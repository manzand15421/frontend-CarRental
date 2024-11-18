import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, ActivityIndicator} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import Button from '../components/Button';
import {Link, useFocusEffect, useNavigation} from '@react-navigation/native';
import ModalPopup from '../components/Modal';

//redux
import { useDispatch,useSelector } from 'react-redux';
import { postLogin,selectUser,resetState} from '../redux/reducers/user';

const initialFormState = {
  email: '',
  password: '',
};
function SignIn() {
 
  const [formData, setFormData] = useState(initialFormState);
  const [modalVisibile, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const navigation = useNavigation();


  const handleChange = (val, name) => {
    setFormData({
      ...formData, //agar value bisa dimodify (hooknya)
      [name]: val, //(dispatch nya)
    });
  };

  const handleLogin = async () => {
    await dispatch(postLogin(formData))
    // await dispatch(getCars(user.token))

  };
 
  useFocusEffect (
    React.useCallback(()=> {
      if (user.status === 'success') {
        setModalVisible(true);
        setErrorMessage(null);
        setTimeout(() => {
          setModalVisible(false);
          navigation.navigate('homeTabs', { screen: 'Akun' });
        }, 1000);
      } else if (user.status === 'failed') {
        setModalVisible(true);
        dispatch(resetState())
       setErrorMessage(user.message)
        setTimeout(() => {
          setModalVisible(false);
          
        }, 1000)
      }
    },[user])
  )

  return (
    <View>
      <ModalPopup visible={user.status === 'loading'}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ActivityIndicator />
          </View>
        </ModalPopup>

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
            // value={'tegalcorporate@gmail.com'}
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
            // value={'@Slamet123'}
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

export default SignIn;
