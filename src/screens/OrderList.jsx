import React, {useEffect, useState} from 'react';
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
import { selectUser } from '../redux/reducers/user';
import axios from 'axios';
import { useSelector } from 'react-redux';

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
  const user = useSelector(selectUser)
  

  const getOrder = async () => {

    try {
    const res = await axios('http://localhost:3000/api/v1/order/myorder',{
          headers: {
            Content: 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        },)
    const data = res.data
    setOrder(data)
    console.log(res)
    }catch(e) {
        console.log(e.response.data)
    }
  } 

  useFocusEffect(
React.useCallback(() => {
    getOrder()
    console.log("tess",order)
},[])
)

  return (
    <SafeAreaView style={backgroundStyle}>
      <FocusAwareStatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.primary}
      />
      <FlatList
        data={order}
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
