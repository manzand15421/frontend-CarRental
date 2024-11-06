/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

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
    name: 'Innova Zenix',
    image:
      'https://medias.auto2000.co.id/sys-master-hybrismedia/h1b/h8a/8846828240926/Thumbnail_Black_Zenix.png',
    price: 230000,
  },
  {
    name: 'Yaris',
    image:
      'https://medias.auto2000.co.id/sys-master-hybrismedia/h05/h86/8846786625566/4-black-+-super-white-ii_optimized.png',
    price: 150000,
  },
  {
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

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={{...styles.headerText}}>Hi,Dias Hewan</Text>
              <Text style={{...styles.headerText, fontSize: 20}}>
                From Tegal Company
              </Text>
            </View>

            <View>
              <Image
                source={{uri: 'https://i.pravatar.cc/100'}}
                width={45}
                height={45}
                style={styles.imageSetting}
              />
            </View>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.wrapper}>
            <Text style={styles.contentText}>
              Sewa Mobil Berkualitas di kawasanmu
            </Text>
            <Button color={Colors.button} title="Sewa Mobil" />
          </View>
      
          <Image
            source={require('./assets/img_car.png')}
            style={styles.imageCar}
          />
          
        </View>
        <View style={styles.iconContainer}>
          <ButtonIcon icon="truck" title="Sewa Mobil"/>
          <ButtonIcon icon="box" title="Oleh-Oleh"/>
          <ButtonIcon icon="key" title="Penginapan"/>
          <ButtonIcon icon="camera" title="Wisata"/>
        </View>
        {/* end banner */}
        <FlatList
          data={CARS}
          renderItem={({item}) => 
            <CarList
              key={item.id}
              image={{ uri: item.image }}
              carName={item.name}
              passengers={5}
              baggage={4}
              price={item.price}
            />
          }
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    height: 176,
  },

  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
  },

  headerText: {
    color: Colors.lighter,
    fontWeight: 800,
  },

  imageSetting: {
    borderRadius: 30,
  },

  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#AF392F',
    margin: 10,
    marginTop: -76,
    borderRadius: 10,
    alignItems: 'center',
    height: 160,
  },

  contentText: {
    color: Colors.lighter,
    fontWeight: 400,
    fontSize: 25,
    lineHeight: 35,
  },

  wrapper: {
    width: '40%',
    paddingHorizontal: 10,
  },
  imageCar: {
  width: '60%',
   height : '100%',
   borderRadius : 10,
  },

  iconContainer: {
    marginTop: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  iconWrapper: {
    backgroundColor: Colors.primary,
    borderRadius:5,
    padding: 15
  },
  iconText:{
    color:'#fff',
    fontSize: 12,
    fontWeight: 700,
    minWidth: 65,
    marginTop: 5,
    textAlign:'center'
  }
  // ButtonStyle : {
  //   marginTop : 10,
  //   backgroundColor : "#5CB85F",
  //   padding : 5,
  //   borderRadius : 5,
  //   alignItems: 'center',
  //   width : 140,
  //   height : 40,
  //   marginLeft : 10,
  // },

  // ButtonText : {
  //   color : Colors.lighter,
  //   fontSize : 20,
  //   fontWeight : 900,
  //   padding : 3

  // }
});

export default App;
