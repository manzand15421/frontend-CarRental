

import React, {useEffect, useState} from 'react';
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
import axios from 'axios';
import Button from './src/components/Button';
import Icon from 'react-native-vector-icons/Feather';
import CarList from './src/components/Carlist';

const Colors = {
  primary: '#A43333',
  secondary: '#SCB85F',
  darker: '#121212',
  lighter: '#ffffff',
  button: '#5CB85F',
};

const CARS = [
  {
    id: 1,
    name: 'Innova Zenix',
    image:
      'https://medias.auto2000.co.id/sys-master-hybrismedia/h1b/h8a/8846828240926/Thumbnail_Black_Zenix.png',
    price: 230000,
  },
  {
    id: 2,
    name: 'Yaris',
    image:
      'https://medias.auto2000.co.id/sys-master-hybrismedia/h05/h86/8846786625566/4-black-+-super-white-ii_optimized.png',
    price: 150000,
  },
  {
    id: 3,
    name: 'Yaris',
    image:
      'https://medias.auto2000.co.id/sys-master-hybrismedia/h05/h86/8846786625566/4-black-+-super-white-ii_optimized.png',
    price: 150000,
  },
];

const ButtonIcon = ({icon, title}) => (
  <Button style={styles.buttonIcon}>
    <View style={styles.iconWrapper}>
      <Icon name={icon} size={25} color="#fff" />
    </View>
    <Text style={styles.iconText}>{title}</Text>
  </Button>
);

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [cars, setCars] = useState([]);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  // console.log('DATA CARS', cars);

  useEffect(() => {
   
    const FetchCars = async () => {
      try {
        const response = await axios.get(
          'https://pregnant-tiff-neslite-e2cb15a7.koyeb.app/api/v1/cars',
        );
        setCars(response.data.data);
      } catch (e) {
        console.e('fetch data error', e);
      }
    };
    FetchCars();
  }, []);

 return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.primary}
      />
      {/* end banner */}
      <FlatList
        data={cars}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View style={styles.headerContainer}>
                <View>
                  <Text style={styles.headerText}>Hi, Dias Hewan</Text>
                  <Text style={styles.headerTextLocation}> From Tegal Company</Text>
                </View>
                <View >
                  <Image style={styles.imageRounded} source={{ uri: "https://i.pravatar.cc/100" }} width={50} height={50} />
                </View>
              </View>
              {/* banner */}
              <View style={{
                ...styles.headerContainer,
                ...styles.bannerContainer
              }}>
                <View style={styles.bannerDesc}>
                  <Text style={styles.bannerText}>Sewa Mobil Berkualitas di kawasanmu</Text>
                  <Button
                    color={Colors.secondary}
                    title='Sewa Mobil'
                  />
                </View>
                <View style={styles.bannerImage}>
                  <Image source={require('./assets/img_car.png')} width={50} height={50} />
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
        renderItem={({ item, index }) =>
          <CarList
            key={item.toString()}
            image={{ uri: item.image }}
            carName={item.name}
            passengers={5}
            baggage={4}
            price={item.price}
          />
        }
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    height: 130,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', // posisi horizontal
    alignItems: 'center', // posisi
    padding: 10
  },
  imageRounded: {
    borderRadius: 40,
  },
  headerText: {
    color: Colors.lighter,
    fontWeight: 700,
    fontSize: 12
  },
  headerTextLocation: {
    color: Colors.lighter,
    fontWeight: 700,
    fontSize: 14
  },
  bannerContainer: {
    borderRadius: 4,
    padding: 0,
    backgroundColor: '#AF392F',
    marginHorizontal: 10,
    flexWrap: 'wrap',
    marginBottom: -200
  },
  bannerText: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.lighter,
  },
  bannerDesc: {
    paddingHorizontal: 10,
    width: '40%'
  },
  iconContainer: {
    marginTop: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  iconWrapper: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    padding: 15
  },
  iconText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 700,
    minWidth: 65,
    marginTop: 5,
    textAlign: 'center'
  }
});

export default App;
