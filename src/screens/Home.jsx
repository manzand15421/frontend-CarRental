import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/Feather';
import CarList from '../components/CarList';
import ModalPopup from '../components/Modal';
import GeoLoc from '../components/geoLocation';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import {useNavigation} from '@react-navigation/native';
import { useSelector,useDispatch } from 'react-redux';
import { selectCars,resetCar, getCars,getCarsDetail } from '../redux/reducers/cars';
import { selectUser,logout } from '../redux/reducers/user';
import { resetOrder } from '../redux/reducers/order';



const COLORS = {
  primary: '#A43333',
  secondary: '#5CB85F',
  darker: '#121212',
  lighter: '#ffffff',
};

const ButtonIcon = ({ icon, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = isDarkMode ? '#fff' : '#000';

  return (
    <Button>
      <View style={styles.iconWrapper}>
        <Icon name={icon} size={25} color={'#fff'} />
      </View>
      <Text style={[styles.iconText, { color: textColor }]}>{title}</Text>
    </Button>
  );
};

function Home() {
  const cars = useSelector(selectCars)
  const isDarkMode = useColorScheme() === 'dark';
  const [modalVisibile, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const user = useSelector(selectUser)
  const navigation = useNavigation();
  const dispatch = useDispatch()


// const fetchCars = () => {
//   const page = 1;
//   if(!cars.data?.length || page > cars.data?.page && cars.status === 'idle'){
//     dispatch(getCars({page: page , token : user.token}))
//   }
// }
  useFocusEffect((
    React.useCallback(() => {
      // console.log(cars.message?.page)
      //  fetchCars()
      dispatch(getCars(user.token))
        dispatch(resetOrder())
    }, [user.token])
  ))

  useFocusEffect (
    React.useCallback(()=> {
      if (cars.status === 'failed') {
        dispatch(logout())
        dispatch(resetCar())
      setModalVisible(true);
       setErrorMessage(cars?.message)
        setTimeout(() => {
          navigation.navigate('SignIn')
          setModalVisible(false);
        }, 1000)
      }
    },[cars])
  )

  
  const headerName = user.data?.fullname || 'Dias Hewan'
  // console.log('data',user)

  const backgroundStyle = {
    // overflow: 'visible',
    backgroundColor: isDarkMode ? COLORS.darker : COLORS.lighter,
  };

  return (
    
    <SafeAreaView style={backgroundStyle}>
      <FocusAwareStatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={COLORS.primary}
      />
        <ModalPopup visible={cars.status === 'loading'}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ActivityIndicator />
          </View>
        </ModalPopup>
      {/* end banner */}
      <FlatList
        data={cars.data}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View style={styles.headerContainer}>
                <View>
                  <Text style={styles.headerText}>
                    Hi,
                    {headerName}
                  </Text>
                  {/* <Text style={styles.headerTextLocation}>
                    From Tegal Company
                  </Text> */}
                  <GeoLoc/>
                </View>
                <View>
                  <Image
                    style={styles.imageRounded}
                    source={{uri: 'https://i.pravatar.cc/100'}}
                    width={50}
                    height={50}
                  />
                </View>
              </View>
              {/* banner */}
              <View
                style={{
                  ...styles.headerContainer,
                  ...styles.bannerContainer,
                }}>
                <View style={styles.bannerDesc}>
                  <Text style={styles.bannerText}>
                    Sewa Mobil Berkualitas di kawasanmu
                  </Text>
                  <Button color={COLORS.secondary} title="Sewa Mobil" />
                </View>
                <View style={styles.bannerImage}>
                  <Image
                    source={require('../assets/images/img_car.png')}
                    width={50}
                    height={50}
                  />
                </View>
              </View>
            </View>
            <View style={styles.iconContainer}>
              <ButtonIcon icon="truck" title="Sewa Mobil" />
              <ButtonIcon icon="box" title="Oleh-Oleh" />
              <ButtonIcon icon="key" title="Penginapan" />
              <ButtonIcon icon="camera" title="Wisata" />
            </View>
          </>
        }
        renderItem={({item, index}) => (
          <CarList
            key={item.toString()}
            image={{uri: item.img}}
            carName={item.name}
            passengers={5}
            baggage={4}
            price={item.price}
            // onEndReached={fetchCars}
            // onEndReachedThreshold={0.8}
            onPress={() => navigation.navigate('carDetail', {carId: item.id},dispatch(getCarsDetail({id : item.id , token : user.token})) )}
          />
        )}
       
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
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    height: 130,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', // posisi horizontal
    alignItems: 'center', // posisi
    padding: 10,
  },
  imageRounded: {
    borderRadius: 40,
  },
  headerText: {
    color: COLORS.lighter,
    fontWeight: 700,
    fontSize: 12,
  },
  headerTextLocation: {
    color: COLORS.lighter,
    fontWeight: 700,
    fontSize: 14,
  },
  bannerContainer: {
    borderRadius: 4,
    padding: 0,
    backgroundColor: '#AF392F',
    marginHorizontal: 10,
    flexWrap: 'wrap',
    marginBottom: -200,
  },
  bannerText: {
    fontSize: 16,
    marginBottom: 10,
    color: COLORS.lighter,
  },
  bannerDesc: {
    paddingHorizontal: 10,
    width: '40%',
  },
  iconContainer: {
    marginTop: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  iconWrapper: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    padding: 15,
  },
  iconText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 700,
    minWidth: 65,
    marginTop: 5,
    textAlign: 'center',
  },
  modalBackground : {
    width : '90%',
    backgroundColor : "#fff",
    elevation : 20,
    borderRadius : 4,
    padding : 20,
  },
});

export default Home;
