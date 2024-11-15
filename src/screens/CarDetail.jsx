import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';
import {formatCurrency} from '../utils/formatCurrency';
import Markdown from 'react-native-markdown-display';
import DateTimePicker from '@react-native-community/datetimepicker';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {getCars, resetState, selectCars} from '../redux/reducers/cars';

const CarDetail = ({route}) => {
  const {carId} = route.params;
  const navigation = useNavigation();
  const cars = useSelector(selectCars);
  const car = cars?.data?.find(car => car.id === carId);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const formatIDR = useCallback(price => formatCurrency.format(price), []);
  const diffTime = Math.abs(endDate - startDate);
  const rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const totalPrice = formatIDR(car.price * rentalDays);

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) setStartDate(selectedDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) setEndDate(selectedDate);
  };

  const handleNextPayment = () => {
    const diffTime = Math.abs(endDate - startDate);
    const rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    navigation.navigate('payment', {
      cars : car,
      totalPrice: totalPrice,
      startDate: startDate,
      endDate: endDate,
    });
  };
  const md = `## Include
  
  - Apa saja yang termasuk dalam paket misal durasi max 12 jam
  - Sudah termasuk bensin selama 12 jam
  - Sudah termasuk Tiket Wisata
  - Sudah termasuk pajak
  
  ## Exclude
  
  - Tidak termasuk biaya makan sopir Rp 75.000/hari
  - Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam
  - Tidak termasuk akomodasi penginapan`.toString();

  if (!car) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
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

      {/* Dropdown for isDriver */}
      {/* <View style={styles.driverSelection}>
          <Text style={styles.sectionTitle}>Pilih Pengemudi</Text>
          <Picker
            selectedValue={isDriver}
            onValueChange={(itemValue) => setIsDriver(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Tidak Ada Pengemudi" value={false} />
            <Picker.Item label="Ada Pengemudi" value={true} />
          </Picker>
        </View> */}

      <ScrollView style={styles.scrollView}>
        {/* Car Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{uri: car.img}}
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

          <Text>{md}</Text>
        </View>

        <View style={styles.datePickerContainer}>
          <Text style={styles.sectionTitle}>Select Dates</Text>

          {/* Start Date Picker */}
          <TouchableOpacity
            style={styles.dateField}
            onPress={() => setShowStartDatePicker(true)}>
            <Text style={styles.dateLabel}>Start Date</Text>
            <Text style={styles.selectedDateText}>
              {startDate.toDateString()}
            </Text>
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
          <TouchableOpacity
            style={styles.dateField}
            onPress={() => setShowEndDatePicker(true)}>
            <Text style={styles.dateLabel}>End Date</Text>
            <Text style={styles.selectedDateText}>
              {endDate.toDateString()}
            </Text>
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
          <Text style={styles.price}>{totalPrice}</Text>
        </View>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={handleNextPayment}>
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
  driverSelection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
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
    alignItems: 'center',
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
