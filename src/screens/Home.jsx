import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/Feather';
import CarList from '../components/CarList';
import axios from 'axios';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const COLORS = {
  primary: '#A43333',
  secondary: '#5CB85F',
  darker: '#121212',
  lighter: '#ffffff',
};

const ButtonIcon = ({icon, title}) => (
  <Button>
    <View style={styles.iconWrapper}>
      <Icon name={icon} size={25} color="#fff" />
    </View>
    <Text style={styles.iconText}>{title}</Text>
  </Button>
);

function Home() {
  const [cars, setCars] = useState([]);
  const isDarkMode = useColorScheme() === 'dark';
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  // console.log('data',user)

  const getUser = async () => {
    // console.log("async storage",JSON.parse(await AsyncStorage.getItem('users')))
    setUser(JSON.parse(await AsyncStorage.getItem('users')));
  };

  const fetchCars = async () => {
    try {
      const res = await axios('http://192.168.238.158:3000/api/v1/cars');
      // console.log(res.data)
      setCars(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      getUser();
      if (!user) {
        setCars('');
      }
    }, []),
  );

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
                    {user ? user.fullname : 'Dias Hewan'}
                  </Text>
                  <Text style={styles.headerTextLocation}>
                    From Tegal Company
                  </Text>
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
            onPress={() => navigation.navigate('carDetail', {carId: item.id})}
          />
        )}
        keyExtractor={item => item.id}
      />
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
});

export default Home;
