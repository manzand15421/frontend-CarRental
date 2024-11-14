import React, { useEffect, useState,useCallback } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView ,Button} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { formatCurrency } from '../utils/formatCurrency';
import Markdown from 'react-native-markdown-display';
import DateTimePicker from '@react-native-community/datetimepicker'

//redux
import { useDispatch,useSelector } from 'react-redux';
import { getCars,resetState,selectCars } from '../redux/reducers/cars';


const CarDetail = ({ route }) => {
  const { carId } = route.params;
  const navigation = useNavigation();
  const formatIDR = useCallback((price) => formatCurrency.format(price), []) 
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const car = useSelector(selectCars)
  const dispatch = useDispatch()

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) setStartDate(selectedDate);
  };
  
  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) setEndDate(selectedDate);
  };

  // const renderDescription = () => {
  //   return car.description.split(/##/g).map((section, index) => (
  //     index === 0 ? (
  //       <Text key={index}>{section.replace(/\\n/g, '\n')}</Text>
  //     ) : (
  //       <Text key={index} style={styles.h2}>
  //         {section.replace(/\\n/g, '\n')}
  //       </Text>
  //     )
  //   ));
  // };
  

  useEffect(() => {
   dispatch(getCars)
  }, [carId]);

  useEffect(()=> {
resetState()
  },[])

  if (!car) {
    return <Text>Loading...</Text>;
  }

  return (

    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{car.name}</Text>
          <View style={styles.headerInfo}>
            <View style={styles.infoItem}>
              <Icon name="users" size={16} color="#6b7280" />
              <Text style={styles.infoText}>4</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="briefcase" size={16} color="#6b7280" />
              <Text style={styles.infoText}>2</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Car Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: car.img }}
            style={styles.carImage}
            resizeMode="contain"
          />
          <View style={styles.imageDots}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Package Details */}
        <View style={styles.packageDetails}>
          <Text style={styles.sectionTitle}>Tentang Paket</Text>
{/*           
          <View style={styles.detailSection}>
            <Text style={styles.detailTitle}>Include</Text>
            <Text style={styles.detailText}>• Apa saja yang termasuk dalam paket misal durasi max 12 jam</Text>
            <Text style={styles.detailText}>• Sudah termasuk bensin selama 12 jam</Text>
            <Text style={styles.detailText}>• Sudah termasuk Tiket Wisata</Text>
            <Text style={styles.detailText}>• Sudah termasuk pajak</Text>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.detailTitle}>Exclude</Text>
            <Text style={styles.detailText}>• Tidak termasuk biaya makan sopir Rp 75.000/hari</Text>
            <Text style={styles.detailText}>• Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam</Text>
            <Text style={styles.detailText}>• Tidak termasuk akomodasi</Text>
          </View> */}
         <Text>{car.description.replace(/##/g, '').replace(/\\n/g, '\n')}</Text>

        </View>

        <View style={styles.datePickerContainer}>
  <Text style={styles.sectionTitle}>Select Dates</Text>
  
  {/* Start Date Picker */}
  <TouchableOpacity style={styles.dateField} onPress={() => setShowStartDatePicker(true)}>
    <Text style={styles.dateLabel}>Start Date</Text>
    <Text style={styles.selectedDateText}>{startDate.toDateString()}</Text>
  </TouchableOpacity>
  {showStartDatePicker && (
    <DateTimePicker
      value={startDate}
      mode="date"
      display="default"
      onChange={handleStartDateChange}
    />
  )}

  {/* End Date Picker */}
  <TouchableOpacity style={styles.dateField} onPress={() => setShowEndDatePicker(true)}>
    <Text style={styles.dateLabel}>End Date</Text>
    <Text style={styles.selectedDateText}>{endDate.toDateString()}</Text>
  </TouchableOpacity>
  {showEndDatePicker && (
    <DateTimePicker
      value={endDate}
      mode="date"
      display="default"
      onChange={handleEndDateChange}
    />
  )}
</View>

      </ScrollView>

      {/* Bottom Fixed Section */}
      <View style={styles.bottomSection}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatIDR(car.price)}</Text>
        </View>
        <TouchableOpacity style={styles.paymentButton}
        onPress={() => navigation.navigate('payment')} >
          <Text style={styles.paymentButtonText}>Lanjutkan Pembayaran</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    datePickerContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        marginBottom: 16,
      },
      dateField: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        marginBottom: 8,
      },
      dateLabel: {
        fontSize: 16,
        color: '#4a4a4a',
      },
      selectedDateText: {
        fontSize: 16,
        color: '#6b7280',
      },
      
    container: {
        flex: 1,
        backgroundColor: 'white',
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
      },
      backButton: {
        padding: 8,
      },
      headerContent: {
        marginLeft: 16,
      },
      headerTitle: {
        fontSize: 18,
        fontWeight: '600',
      },
      headerInfo: {
        flexDirection: 'row',
        marginTop: 4,
      },
      infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
      },
      infoText: {
        marginLeft: 4,
        color: '#6b7280',
        fontSize: 14,
      },
      scrollView: {
        flex: 1,
      },
      imageContainer: {
        aspectRatio: 4 / 3,
        backgroundColor: '#f3f4f6',
        position: 'relative',
        alignItems : 'center'
      },
      carImage: {
        width: '80%',
        height: '90%',
      },
      imageDots: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
      },
    //   dot: {
    //     width: 8,
    //     height: 8,
    //     borderRadius: 4,
    //     backgroundColor: '#d1d5db',
    //     marginHorizontal: 4,
    //   },
    //   activeDot: {
    //     backgroundColor: '#4b5563',
    //   },
      packageDetails: {
        padding: 16,
      },
      sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
      },
      detailSection: {
        marginBottom: 16,
      },
      detailTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
      },
      detailText: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 4,
      },
      bottomSection: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
      },
      priceContainer: {
        marginBottom: 16,
      },
      price: {
        fontSize: 18,
        fontWeight: '600',
      },
      paymentButton: {
        backgroundColor: '#3D7B3F',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
      },
      paymentButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
      },
});

export default CarDetail;
