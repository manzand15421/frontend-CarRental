import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  Text,
  ActivityIndicator,
} from 'react-native';
import Button from '../components/Button';
import OrderList from '../components/OrderList';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {selectUser, logout} from '../redux/reducers/user';
import {
  getMyOrder,
  getOrderDetail,
  selectOrder,
  cancelOrder,
} from '../redux/reducers/order';
import {useSelector, useDispatch} from 'react-redux';
import {clearTime} from '../redux/reducers/timer';
import ModalPopup from '../components/Modal';
import Icon from 'react-native-vector-icons/Feather';
import {resetCar} from '../redux/reducers/cars';
import {apiClient} from '../config/axios';

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
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const order = useSelector(selectOrder);
  const [modalVisibile, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const calculateTotalDays = (start, end) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    return Math.round((endTime - startTime) / (1000 * 60 * 60 * 24));
  };

  useFocusEffect(
    React.useCallback(() => {
      if (user.login) {
        dispatch(getMyOrder(user.token));
        dispatch(clearTime());
      }
    }, [user.token]),
  );
  useFocusEffect(
    React.useCallback(() => {
      if (order.status === 'success') {
        navigation.navigate('payed');
      }
    }, [order]),
  );

  useFocusEffect(
    React.useCallback(() => {
      if (order.status === 'failed') {
        dispatch(logout());
        dispatch(resetCar());
        setModalVisible(true);
        setErrorMessage(order.message);
        setTimeout(() => {
          navigation.navigate('SignIn');
          setModalVisible(false);
        }, 1000);
      }
    }, [order]),
  );

  const CancelOrder = async id => {
    console.log('text');
    try {
      const cancel = await apiClient.put(`/order/${id}/cancelOrder`, {
        headers: {
          Content: 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch(getMyOrder(user.token));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <FocusAwareStatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.lighter}
      />
      <ModalPopup visible={order.status === 'loading'}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator />
        </View>
      </ModalPopup>

      <ModalPopup visible={modalVisibile}>
        <View style={styles.modalBackground}>
          <>
            <Icon size={13} name={'x-circle'} />
            <Text> {errorMessage} </Text>
          </>
        </View>
      </ModalPopup>

      {!user.login ? (
        <View style={styles.detailsContainer}>
          <View style={styles.cardContainer}>
            <Text style={styles.messageRegister}>
              Login Atau Daftar Untuk Booking Mobil !
            </Text>
            <Button
              onPress={() => navigation.navigate('SignUp')}
              style={styles.ButtonContainer}
              color="#3D7B3F"
              title="Booking Sekarang"
            />
          </View>
        </View>
      ) : (
        <FlatList
          data={order.data?.resources}
          renderItem={({item}) => {
            const time = new Date(item.overdue_time);
            const totalDays = calculateTotalDays(
              item.start_time,
              item.end_time,
            );

            const isDisabled =
              item.status === 'canceled' || item.status === 'paid';

            return (
              <OrderList
                key={item.toString()}
                image={{uri: item.cars.img}}
                invoice={item.order_no}
                carName={item.cars.name}
                status={`Status : ${item.status}`}
                startDate={`Tanggal Sewa : ${new Date(
                  item.start_time,
                ).toLocaleDateString('id-ID')}`}
                endDate={`waktu sewa : ${totalDays} Hari`} // total sewa hari
                price={item?.total}
                overdue={time.getTime()}
                CancelOrder={() => CancelOrder(item.id)}
                onPress={() =>
                  !isDisabled &&
                  dispatch(getOrderDetail({id: item.id, token: user.token}))
                }
                disabled={isDisabled} // Disable button if canceled
              />
            );
          }}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    width: '90%',
    backgroundColor: '#fff',
    elevation: 20,
    borderRadius: 4,
    padding: 20,
  },

  messageRegister: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: '10%',
    padding: 30,
  },

  ButtonContainer: {
    width: '70%',
    alignSelf: 'center',
  },

  cardContainer: {
    marginVertical: '70%',
    alignItems: 'center',
  },
  detailsContainer: {
    width: '100%',
  },
});
export default OrderPage;
