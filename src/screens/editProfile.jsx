import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { selectUser } from '../redux/reducers/user';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { apiClient } from '../config/axios';
import { useDispatch } from 'react-redux';

const initialFormState = {
    fullname : '',
    // email: '',
    phone_number : '',
    avatar :''
  };

export default function EditProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleChange = (val, name) => {
    setFormData({
      ...formData, //agar value bisa dimodify (hooknya)
      [name]: val, //(dispatch nya)
     
    });
  };
// useEffect(()=> {
//     console.log(user.data)
// },[formData])

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 200,
      maxWidth: 200,
    };

    launchImageLibrary(options, (response) => {

        const selectedImage = response.assets[0];
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setAvatar({ uri: selectedImage.uri });
      }

      const imageData = `data:${selectedImage.type};base64,${selectedImage.base64}`;
      handleChange(imageData,'avatar');

    });
  };

  const UpdateProfile = async () => {

    try{
        const res = await apiClient.put(`/users/updateUser/${user.data.id}`,formData,{
            headers: {
                Content: 'application/json',
                Authorization: `Bearer ${user.token}`,
              },
        })
       if(res.data.status === "success"){
        dispatch(selectUser)
        navigation.navigate('homeTabs', {screen : "Akun"} )
       }

    }catch (e){
return console.log(e)
    }
  } 

  const handleSubmit = () => {
    if (!name || !email || !phoneNumber || !address) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // Here you would typically send the data to your backend
    console.log({ name, email, phoneNumber, address, avatar });
    Alert.alert('Success', 'Profile updated successfully');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
        {avatar ? (
          <Image source={avatar} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarPlaceholderText}>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
        //   value={name}
          onChangeText={text => handleChange(text,'fullname')}
          placeholder="Enter your name"
          placeholderTextColor={'#A5A5A5'}
        />
      </View>

      {/* <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
        //   value={email}
          onChangeText={text => handleChange(text, 'email')}
          placeholder="Enter your email"
          placeholderTextColor={'#A5A5A5'}
          keyboardType="email-address"
        />
      </View> */}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
        //   value={phoneNumber}
          onChangeText={text => handleChange(text,'phone_number')}
          placeholder="Enter your phone number"
          placeholderTextColor={'#A5A5A5'}
          keyboardType="phone-pad"
        />
      </View>

      {/* <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.input, styles.addressInput]}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your address"
          multiline
        />
      </View> */}

      <TouchableOpacity style={styles.button} onPress={UpdateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E1E1E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderText: {
    color: '#888',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    color: '#000'
  },
  addressInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});