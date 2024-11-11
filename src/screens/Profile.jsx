import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);
  const navigation = useNavigation();

  const handleLogout = async () => {
     await AsyncStorage.removeItem('token')
     await AsyncStorage.removeItem('users')

     const token = await AsyncStorage.getItem('token');
     const userData = await AsyncStorage.getItem('users');

     if (!token && !userData)  {
      setLogin(false);
      setUser(null); 
  }
  };
useEffect(()=>{
},[user])

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('users');

      if (token && userData) {
        setUser(JSON.parse(userData)); //jadikan object
        setLogin(true);
      } 
   
    } catch (error) {
      console.log('AsyncStorage error =>', error.message);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {login && user ? (
        <View style={styles.profileContainer}>
          <Image
            source={{uri: user.profilePicture}}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>

          <Text style={styles.detailLabel}>Location:</Text>
          <Text style={styles.detailValue}>{user.location}</Text>

          <Text style={styles.detailLabel}>Phone Number:</Text>
          <Text style={styles.detailValue}>{user.phoneNumber}</Text>

          <Text style={styles.detailLabel}>Bio:</Text>
          <Text style={styles.detailValue}>{user.bio}</Text>
          <Button
            onPress={handleLogout}
            style={styles.buttonContainer}
            color="#3D7B3F"
            title="Log Out"
          />
        </View>
      ) : (
        <View style={styles.detailsContainer}>
          <View style={styles.cardContainer}>
            <Image
              style={styles.imageSet}
              source={require('../../assets/profile.png')}
            />
            <Text style={styles.messageRegister}>
              Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di
              TMMIN Car Rental lebih mudah
            </Text>
            <Button
              onPress={() => navigation.navigate('SignUp')}
              style={styles.buttonContainer}
              color="#3D7B3F"
              title="Register"
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    flexGrow: 1,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#777',
  },
  detailsContainer: {
    width: '100%',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 10,
  },
  cardContainer: {
    marginVertical: '40%',
    alignItems: 'center',
  },
  messageRegister: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    marginTop: '10%',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
    width: '30%',
    alignContent: 'center',
  },
});

export default ProfileScreen;
