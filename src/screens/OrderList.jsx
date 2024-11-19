import React, {useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  ActivityIndicatore,
  ImageBackgroundComponent,
} from 'react-native';
import OrderList from '../components/OrderList';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';

const Colors = {
  primary: '#A43333',
  secondary: '#SCB85F',
  darker: '#121212',
  lighter: '#ffffff',
  button: '#5CB85F',
};

const OrderDummy = [
  {
    id: 1,
    invoice: '12/04/20024/1',
    carName: 'Innova Zenix',
    isDriver: 'Dengan Driver',
    startDarte: '20/11/2024',
    endDate: '22/11/2024',
    price: 250000,
    img: 'https://medias.auto2000.co.id/sys-master-hybrismedia/h1b/h8a/8846828240926/Thumbnail_Black_Zenix.png',
  },

  {
    id: 2,
    invoice: '12/04/20024/1',
    carName: 'Innova Zenix',
    isDriver: 'Dengan Driver',
    startDarte: '20/11/2024',
    endDate: '22/11/2024',
    price: 250000,
    img: 'https://medias.auto2000.co.id/sys-master-hybrismedia/h1b/h8a/8846828240926/Thumbnail_Black_Zenix.png',
  },
  {
    id: 3,
    invoice: '12/04/20024/1',
    carName: 'Innova Zenix',
    isDriver: 'Dengan Driver',
    startDarte: '20/11/2024',
    endDate: '22/11/2024',
    price: 250000,
    img: 'https://medias.auto2000.co.id/sys-master-hybrismedia/h1b/h8a/8846828240926/Thumbnail_Black_Zenix.png',
  },
  {
    id: 4,
    invoice: '12/04/20024/1',
    carName: 'Innova Zenix',
    isDriver: 'Dengan Driver',
    startDarte: '20/11/2024',
    endDate: '22/11/2024',
    price: 250000,
    img: 'https://medias.auto2000.co.id/sys-master-hybrismedia/h1b/h8a/8846828240926/Thumbnail_Black_Zenix.png',
  },
  {
    id: 5,
    invoice: '12/04/20024/1',
    carName: 'Innova Zenix',
    isDriver: 'Dengan Driver',
    startDarte: '20/11/2024',
    endDate: '22/11/2024',
    price: 250000,
    img: 'https://medias.auto2000.co.id/sys-master-hybrismedia/h1b/h8a/8846828240926/Thumbnail_Black_Zenix.png',
  },
];



const OrderPage = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const navigation = useNavigation();
  const [order, setOrder] = useState('');

  return (
    <SafeAreaView style={backgroundStyle}>
      <FocusAwareStatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.primary}
      />
      <FlatList
        data={OrderDummy}
        renderItem={({item}) => (
          <OrderList
            key={item.toString()}
            image={{uri: item.img}}
            invoice={item.invoice}
            carName={item.carName}
            isDriver={item.isDriver}
            startDate={item.startDarte}
            endDate={item.endDate}
            price={item.price}
            // onPress={() =>
            //   navigation.navigate('carDetail', {
            //     carId: item.id,
            //     carName: item.name,
            //   })
            // }
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default OrderPage;
