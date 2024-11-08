import React, { useEffect, useState } from 'react';
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
    image:'https://medias.auto2000.co.id/sys-master-hybrismedia/h1b/h8a/8846828240926/Thumbnail_Black_Zenix.png',
    price: 230000,
  },
  {
    id: 2,
    name: 'Innova Zenix',
    image: 'https://medias.auto2000.co.id/sys-master-hybrismedia/h1b/h8a/8846828240926/Thumbnail_Black_Zenix.png',
    price: 230000,
  },
  {
    id: 3,
    name: 'Innova Zenix',
    image: 'https://medias.auto2000.co.id/sys-master-hybrismedia/h1b/h8a/8846828240926/Thumbnail_Black_Zenix.png',
    price: 230000,
  },
  {
    id: 4,
    name: 'Innova Zenix',
    image:'https://medias.auto2000.co.id/sys-master-hybrismedia/h1b/h8a/8846828240926/Thumbnail_Black_Zenix.png',
    price: 230000,
  },
];

console.log(CarDummy.image)

const CarPage = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [car,setCar] = useState([])

  useEffect (()  => {

    const getCars = async () => {
      try {
        const res = await axios.get('https://pregnant-tiff-neslite-e2cb15a7.koyeb.app/api/v1/cars',)
        setCar(res.data.data)
      }

      catch (e){
        console.log(e)
      }
     }
     getCars()
  
  },[])

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
            image={{uri : item.img}}
            carName={item.name}
            passengers={5}
            baggage={4}
            price={item.price}
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create ({
    
})

export default CarPage 