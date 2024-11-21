import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  Text,
  ImageBackgroundComponent,
  ActivityIndicator,
} from 'react-native';
import OrderList from '../components/OrderList';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import { selectUser,logout } from '../redux/reducers/user';
import { getMyOrder,getOrderDetail, selectOrder } from '../redux/reducers/order';
import { useSelector,useDispatch } from 'react-redux';
import { clearTime } from '../redux/reducers/timer';
import ModalPopup from '../components/Modal';
import Icon from 'react-native-vector-icons/Feather';
import { convertDate } from '../utils/convertDate';


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
  // const [order, setOrder] = useState('');
  const dispatch = useDispatch()
  const user = useSelector(selectUser);
const order = useSelector(selectOrder)
const [modalVisibile, setModalVisible] = useState(false);
const [errorMessage, setErrorMessage] = useState(null);
  
useFocusEffect(
  React.useCallback(() => {
    dispatch(getMyOrder(user.token))
    dispatch(clearTime())
  },[user.token])
)
useFocusEffect (
  React.useCallback(()=> {
    if (order.status === 'success') {
   
      navigation.navigate('payed')
    }
  },[order])
)

useFocusEffect (
  React.useCallback(()=> {
    if (order.status === 'failed') {
      dispatch(logout())
      dispatch(resetCar())
    setModalVisible(true);
     setErrorMessage(order.message)
      setTimeout(() => {
        navigation.navigate('SignIn')
        setModalVisible(false);
      }, 1000)
    }
  },[order])
)

  return (
    <SafeAreaView style={backgroundStyle}>
      <FocusAwareStatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.primary}
      />
       <ModalPopup visible={order.status === 'loading'}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ActivityIndicator />
          </View>
        </ModalPopup>
      <FlatList
        data={order.data?.resources}
        renderItem={({item}) => {
          const startTime = new Date(item.start_time).getTime(); // Konversi ke milidetik
    const endTime = new Date(item.end_time).getTime(); // Konversi ke milidetik
    const totalDays = Math.round((endTime - startTime) / (1000 * 60 * 60 * 24)); // Konversi ke hari
            const startDate = new Date(item.start_time).toLocaleDateString('id-ID')
          
          return (
          <OrderList
            key={item.toString()}
            image={{uri: item.cars.img}}
            invoice={item.order_no}
            carName={item.cars.name}
            status={`Status : ${item.status}`}
            startDate={`Tanggal Sewa : ${startDate}`}
            endDate={ `waktu sewa : ${totalDays} Hari`} // total sewa hari
            price={item.total}
            onPress={() =>
              dispatch(getOrderDetail({id:item.id,token:user.token}))
            }
          />
        )}
      }
        keyExtractor={item => item.id}
      />
      <ModalPopup visible={modalVisibile}>
        <View style={styles.modalBackground}>
            <>
              <Icon size={13} name={'x-circle'} />
                <Text> {errorMessage} </Text>
             </>
        </View>
      </ModalPopup>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create ({
  modalBackground : {
    width : '90%',
    backgroundColor : "#fff",
    elevation : 20,
    borderRadius : 4,
    padding : 20,
  },
})
export default OrderPage;
