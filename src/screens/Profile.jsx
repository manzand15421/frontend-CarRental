import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  // Mock user data
  const [user, setUser] = useState({
    name: 'Dias Hewan',
    email: 'dias@example.com',
    profilePicture: 'https://i.pravatar.cc/150?img=3',
    location: 'Tegal',
    phoneNumber: '+62 123 4567 890',
    bio: 'Enthusiast of travel and cars.',
  });
  const navigation = useNavigation()
  const isLogin =false

  // If you are fetching user data from an API, use useEffect and update the state
  // useEffect(() => {
  //   // fetchUserData();
  // }, []);

  return (
   
    <ScrollView contentContainerStyle={styles.container}>
      {/* <View style={styles.profileContainer}>
        <Image
          source={{uri: user.profilePicture}}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View> */}
 {!isLogin && (
      <View style={styles.detailsContainer}>
        <View style={styles.cardContainer}>
       
        {/* <Text style={styles.detailLabel}>Location:</Text>
        <Text style={styles.detailValue}>{user.location}</Text>

        <Text style={styles.detailLabel}>Phone Number:</Text>
        <Text style={styles.detailValue}>{user.phoneNumber}</Text>

        <Text style={styles.detailLabel}>Bio:</Text>
        <Text style={styles.detailValue}>{user.bio}</Text> */}
        <Image style={styles.imageSet} source={require('../../assets/profile.png')}/>
        <Text style={styles.messageRegister}>Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di TMMIN Car Rental lebih mudah</Text>
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
  
  )
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
marginVertical : "40%",
alignItems : 'center'
},

  messageRegister: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    textAlign : 'center',
    marginTop : '10%',
  },

  detailValue: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
    width : "30%",
    alignContent : 'center'

  },
});

export default ProfileScreen;
