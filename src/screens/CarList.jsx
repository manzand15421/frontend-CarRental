import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  useColorScheme,
  ActivityIndicator
} from 'react-native';

import CarList from '../components/CarList';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import ModalPopup from '../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getCars, resetCar, selectCars,getCarsDetail } from '../redux/reducers/cars';
import { selectUser } from '../redux/reducers/user';

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
  const dispatch = useDispatch()
  const car = useSelector(selectCars);
  const user = useSelector(selectUser);

  useFocusEffect (
    React.useCallback(()=> {
      if (user.status === 'failed') {
        setModalVisible(true);
       setErrorMessage(car.message)
        setTimeout(() => {
          setModalVisible(false);
        }, 1000)
      }
    },[car])
  )

  return (
    <SafeAreaView style={backgroundStyle}>
      <FocusAwareStatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.primary}
      />

<ModalPopup visible={car.status === 'loading'}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ActivityIndicator />
          </View>
        </ModalPopup>

      <FlatList
        data={car.data}
        renderItem={({ item }) => (
          <CarList
            key={item.toString()}
            image={{ uri: item.img }}
            carName={item.name}
            passengers={5}
            baggage={4}
            price={item.price}
            onPress={() =>
              user.login ?
              navigation.navigate('carDetail', {
                carId: item.id,
                carName: item.name,
              },dispatch(getCarsDetail({id : item.id , token : user.token})))
              :
              navigation.navigate('SignIn',)
              

            }
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default CarPage;
