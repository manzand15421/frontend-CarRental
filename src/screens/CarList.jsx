import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  useColorScheme,
} from 'react-native';

import CarList from '../components/CarList';
import axios from 'axios';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import { useDispatch,useSelector } from 'react-redux';
import { getCars,resetState ,selectCars} from '../redux/reducers/cars';
import { getProfile, selectUser } from '../redux/reducers/user';

const Colors = {
  primary: '#A43333',
  secondary: '#SCB85F',
  darker: '#121212',
  lighter: '#ffffff',
  button: '#5CB85F',
};

const CarDummy = [
  {
    id: 1,
    name: 'Innova Zenix',
    image:
      'https://medias.auto2000.co.id/sys-master-hybrismedia/h1b/h8a/8846828240926/Thumbnail_Black_Zenix.png',
    price: 230000,
  },
  {
    id: 2,
    name: 'Innova Zenix',
    image:
      'https://medias.auto2000.co.id/sys-master-hybrismedia/h1b/h8a/8846828240926/Thumbnail_Black_Zenix.png',
    price: 230000,
  },
  {
    id: 3,
    name: 'Innova Zenix',
    image:
      'https://medias.auto2000.co.id/sys-master-hybrismedia/h1b/h8a/8846828240926/Thumbnail_Black_Zenix.png',
    price: 230000,
  },
  {
    id: 4,
    name: 'Innova Zenix',
    image:
      'https://medias.auto2000.co.id/sys-master-hybrismedia/h1b/h8a/8846828240926/Thumbnail_Black_Zenix.png',
    price: 230000,
  },
];



const CarPage = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const navigation = useNavigation();
const car = useSelector(selectCars)
const user = useSelector(selectUser)
const dispatch = useDispatch()

  const getUser = async () => {
dispatch(getProfile())
  };

  const Cars = async () => {
    dispatch(getCars())
  }
useEffect(()=> {
  Cars()
},[]) 



  useFocusEffect(() => {
    getUser();
    console.log('datauser',user)
    if (!user) {
      resetState()
    }
  });


  return (
    <SafeAreaView style={backgroundStyle}>
      <FocusAwareStatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.primary}
      />

      <FlatList
        data={car}
        renderItem={({item, index}) => (
          <CarList
            key={item.toString()}
            image={{uri: item.img}}
            carName={item.name}
            passengers={5}
            baggage={4}
            price={item.price}
            onPress={() => navigation.navigate('carDetail', {carId: item.id})}
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default CarPage;
