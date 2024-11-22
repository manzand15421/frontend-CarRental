import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import {formatCurrency} from '../utils/formatCurrency';
import {Picker} from '@react-native-picker/picker';
import ModalPopup from '../components/Modal';
import {logout, resetState, selectUser} from '../redux/reducers/user';
import {
  selectOrder,
  postOrder,
  updateOrder,
  getOrderDetail,
  resetOrder,
} from '../redux/reducers/order';
import {selectBankName, clear} from '../redux/reducers/timer';

import {useSelector, useDispatch} from 'react-redux';
import { resetCar, selectCars } from '../redux/reducers/cars';

const Payment1 = ({route}) => {
  // const {cars} = route.params;
  const user = useSelector(selectUser);
  const cars = useSelector(selectCars)
  const order = useSelector(selectOrder);
  const reduxBank = useSelector(selectBankName);
  const dispatch = useDispatch();
  const [updated, setUpdated] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [selectedBank, setSelectedBank] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const formatIDR = useCallback(price => formatCurrency.format(price), []);

  const diffTime = Math.abs(endDate - startDate);
  const rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const totalPrice = formatIDR(cars.data.price * rentalDays);

  const [isDriver, setIsDriver] = useState(false);
  const [modalVisibile, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) setStartDate(selectedDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) setEndDate(selectedDate);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Format YYYY-MM-DD
  };
//convert ke string dari tanggal biasa
  const start_time = formatDate(new Date(startDate))
  const end_time = formatDate(new Date(endDate))


  const banks = [
    {id: 'bca', name: 'BCA', subtitle: 'BCA Transfer'},
    {id: 'bni', name: 'BNI', subtitle: 'BNI Transfer'},
    {id: 'mandiri', name: 'Mandiri', subtitle: 'Mandiri Transfer'},
  ];
  const bank = banks.find(bank => bank.id === selectedBank); // filter bank yang dipilih untuk kirim data ke next screen

  const handleNextPayment = async () => {
    
    const data = {
      car_id: cars.data.id,
      start_time: start_time,
      end_time: end_time,
      is_driver: isDriver,
      payment_method: bank.name,
    };

   
    const dataUpdate = {
      start_time: start_time,
      end_time: end_time,
      is_driver: isDriver,
      payment_method: bank.name,
    };

    if (!order.data) {
      dispatch(postOrder({form: data, token: user.token}));
      setUpdated(false);
    } else {
      dispatch(
        updateOrder({
          id: order.data.id,
          form: dataUpdate,
          token: user.token,
        }),
      );
      setUpdated(true);
    
    }
  };

  useEffect(() => {
    
    if (reduxBank !== selectedBank) {
      dispatch(clear());
    }
  }, [reduxBank]);

  useFocusEffect(
    React.useCallback(() => {
      if (order.status === 'success' || !reduxBank === banks.name) {
        setModalVisible(true);
        setErrorMessage(null);
        setTimeout(() => {
          setModalVisible(false);
          navigation.navigate('payed', {
            bank: bank,
            car: cars,
            totalPrice: totalPrice,
            startDate: startDate,
            endDate: endDate,
            isDriver: isDriver,
          });
        }, 1000);
      } else if (order.status === 'failed') {
        setErrorMessage(order.message);
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 1000);
      }
      else if (order.message === 'jwt expired') {
        setErrorMessage(order.message);
        setModalVisible(true);
        dispatch(logout());
        dispatch(resetCar())
        dispatch(resetOrder())
        setTimeout(() => {
          navigation.navigate('SignIn')
          setModalVisible(false);
        }, 1000);
      }
    }, [order]),
  );

  const steps = [
    {id: 1, title: 'Pilih Metode'},
    {id: 2, title: 'Bayar'},
    {id: 3, title: 'Tiket'},
  ];

  const renderStepIndicator = () => (
    <View style={styles.stepContainer}>
      {steps.map((step, index) => (
        <View key={step.id} style={styles.stepWrapper}>
          <View style={styles.stepNumberWrapper}>
            <View
              style={[
                styles.stepNumber,
                {
                  backgroundColor:
                    step.id <= activeStep ? '#22c55e' : '#e5e7eb',
                },
              ]}>
              <Text
                style={[
                  styles.stepNumberText,
                  {color: step.id <= activeStep ? 'white' : '#6b7280'},
                ]}>
                {step.id}
              </Text>
            </View>
            <Text style={styles.stepTitle}>{step.title}</Text>
          </View>
          {index < steps.length - 1 && (
            <View
              style={[
                styles.stepLine,
                {backgroundColor: step.id < activeStep ? '#22c55e' : '#e5e7eb'},
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pembayaran</Text>
      </View>

      {/* Step Indicator */}
      {/* {renderStepIndicator()} */}

      <ScrollView style={styles.content}>
        {/* Car Details */}
        <View style={styles.carDetails}>
          <Image source={{uri: cars.data.img}} style={styles.carImage} />
          <View style={styles.carInfo}>
            <Text style={styles.carName}>{cars.data.name}</Text>
            <View style={styles.carMetrics}>
              <View style={styles.metric}>
                <Icon name="users" size={16} color="#6b7280" />
                <Text style={styles.metricText}>4</Text>
              </View>
              <View style={styles.metric}>
                <Icon name="briefcase" size={16} color="#6b7280" />
                <Text style={styles.metricText}>2</Text>
              </View>
            </View>
          </View>
          <Text style={styles.price}>{formatIDR(cars.data.price)}</Text>
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

        <View style={styles.driverSelection}>
          <Text style={styles.sectionTitle}>Pilih Pengemudi</Text>

          {/* Custom Picker with Icon and Border */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={isDriver}
              onValueChange={itemValue => setIsDriver(itemValue)}
              style={styles.picker}>
              <Picker.Item label="Lepas Kunci" value={false} />
              <Picker.Item label="Dengan Driver" value={true} />
            </Picker>

          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pilih Bank Transfer</Text>
          <Text style={styles.sectionDescription}>
            Kamu bisa membayar dengan transfer melalui ATM, Internet Banking
            atau Mobile Banking
          </Text>

          {banks.map(bank => (
            <TouchableOpacity
              key={bank.id}
              style={[
                styles.bankOption,
                selectedBank === bank.id && styles.bankOptionSelected,
              ]}
              onPress={() => setSelectedBank(bank.id)}>
              <View style={styles.bankInfo}>
                <Text style={styles.bankName}>{bank.name}</Text>
                <Text style={styles.bankSubtitle}>{bank.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Promo Code */}
        <View style={styles.promoSection}>
          <View style={styles.promoHeader}>
            <Icon name="percent" size={20} color="#6b7280" />
            <Text style={styles.promoTitle}>Pakai Kode Promo</Text>
          </View>
          <View style={styles.promoInputContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="Tulis catatanmu di sini"
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity
              style={[
                styles.promoButton,
                !promoCode && styles.promoButtonDisabled,
              ]}
              disabled={!promoCode}>
              <Text style={styles.promoButtonText}>Terapkan</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ModalPopup visible={modalVisibile}>
          <View style={styles.modalBackground}>
            {errorMessage !== null ? (
              <>
                <Icon size={13} name={'x-circle'} />
                {Array.isArray(errorMessage) ? (
                  errorMessage.map(e => {
                    return <Text>{e.message}</Text>;
                  })
                ) : (
                  <Text> {errorMessage} </Text>
                )}
              </>
            ) : updated ? (
              <>
                <Icon size={32} name={'check-circle'} />
                <Text>Order Updated</Text>
              </>
            ) : (
              <>
                <Icon size={32} name={'check-circle'} />
                <Text>Order Created</Text>
              </>
            )}
          </View>
        </ModalPopup>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.totalPrice}>
          <Text style={styles.totalPriceText}>{totalPrice}</Text>
          <Icon name="chevron-down" size={20} color="#000" />
        </View>
        <TouchableOpacity
          style={[
            styles.payButton,
            !(selectedBank && endDate) && styles.payButtonDisabled,
          ]}
          disabled={!(selectedBank && endDate)}
          onPress={handleNextPayment}>
          <Text style={styles.payButtonText}>Bayar</Text>
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
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb', // Border color for the Picker
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  picker: {
    flex: 1,
    fontSize: 16,
    color: '#4a4a4a',
  },
  pickerIcon: {
    marginLeft: 8, // Adds space between the picker and the icon
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  stepContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  stepWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumberWrapper: {
    alignItems: 'center',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '600',
  },
  stepTitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  stepLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 8,
  },
  content: {
    flex: 1,
  },
  carDetails: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    alignItems: 'center',
  },
  carImage: {
    width: 60,
    height: 40,
    borderRadius: 4,
  },
  carInfo: {
    flex: 1,
    marginLeft: 12,
  },
  carName: {
    fontSize: 16,
    fontWeight: '600',
  },
  carMetrics: {
    flexDirection: 'row',
    marginTop: 4,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metricText: {
    marginLeft: 4,
    color: '#6b7280',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22c55e',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  bankOption: {
    flexDirection: 'row',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    marginBottom: 8,
  },
  bankOptionSelected: {
    borderColor: '#22c55e',
    backgroundColor: '#f0fdf4',
  },
  bankInfo: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: '500',
  },
  bankSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  promoSection: {
    padding: 16,
  },
  promoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  promoInputContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  promoButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  promoButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
  promoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: '600',
  },
  payButton: {
    backgroundColor: '#3D7B3F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonDisabled: {
    backgroundColor: '#C9E7CA',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
export default Payment1;
