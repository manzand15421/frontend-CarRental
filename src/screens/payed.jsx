import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function PaymentConfirmation() {
  const route = useRoute()
  const { banks,selectedBank } = route.params

  const selectedBankDetai = banks.find(bank => bank.id === selectedBank)
  
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 55,
    seconds: 6
  });

  useEffect(() => {
   

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        clearInterval(timer);
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const steps = [
    { id: 1, title: 'Pilih Metode', active: true, completed: true },
    { id: 2, title: 'Bayar', active: true, completed: false },
    { id: 3, title: 'Tiket', active: false, completed: false },
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
                  backgroundColor: step.completed ? '#22c55e' : 
                                 step.active ? '#22c55e' : '#e5e7eb' 
                },
              ]}
            >
              {step.completed ? (
                <Icon name="check" size={12} color="white" />
              ) : (
                <Text style={[
                  styles.stepNumberText,
                  { color: step.active ? 'white' : '#6b7280' }
                ]}>
                  {step.id}
                </Text>
              )}
            </View>
            <Text style={styles.stepTitle}>{step.title}</Text>
          </View>
          {index < steps.length - 1 && (
            <View style={[
              styles.stepLine,
              { backgroundColor: step.completed ? '#22c55e' : '#e5e7eb' }
            ]} />
          )}
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>{selectedBankDetai.subtitle}</Text>
          <Text style={styles.orderId}>Order ID: xxxxxxxx</Text>
        </View>
      </View>

      {/* Step Indicator */}
      {renderStepIndicator()}

      <ScrollView style={styles.content}>
        {/* Timer */}
        <View style={styles.timerSection}>
          <Text style={styles.timerLabel}>
            Selesaikan Pembayaran Sebelum
          </Text>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              {String(timeLeft.hours).padStart(2, '0')}:
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </Text>
          </View>
          <Text style={styles.dateText}>
            Rabu, 19 Jun 2022 jam 13.00 WIB
          </Text>
        </View>

        {/* Car Details */}
        <View style={styles.carDetails}>
          <Image
            source={{ uri: '/placeholder.svg?height=60&width=60' }}
            style={styles.carImage}
          />
          <View style={styles.carInfo}>
            <Text style={styles.carName}>Innova Zenix</Text>
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
          <Text style={styles.price}>Rp 230.000</Text>
        </View>

        {/* Transfer Details */}
        <View style={styles.transferSection}>
          <Text style={styles.sectionTitle}>Lakukan Transfer ke</Text>
          <View style={styles.bankCard}>
            <Text style={styles.bankName}>BCA</Text>
            <Text style={styles.bankSubtitle}>BCA Transfer</Text>
            <Text style={styles.bankNote}>a.n Jeep Bromo Online</Text>
          </View>

          <View style={styles.accountSection}>
            <Text style={styles.fieldLabel}>Nomor Rekening</Text>
            <View style={styles.copyField}>
              <Text style={styles.accountNumber}>xxxx-xxxx-xxxx</Text>
              <TouchableOpacity>
                <Icon name="copy" size={20} color="#22c55e" />
              </TouchableOpacity>
            </View>

            <Text style={styles.fieldLabel}>Total Bayar</Text>
            <View style={styles.copyField}>
              <Text style={styles.totalAmount}>Rp 230.000</Text>
              <TouchableOpacity>
                <Icon name="copy" size={20} color="#22c55e" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={[styles.noteSection,styles.bottomSection]}>
          <Text style={styles.noteText}>
            Klik konfirmasi pembayaran untuk mempercepat proses pengecekan
          </Text>
       

      {/* Bottom Buttons */}
      <View style={styles.bottomSection2} >
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Konfirmasi Pembayaran</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderListButton}>
          <Text style={styles.orderListButtonText}>Lihat Daftar Pesanan</Text>
        </TouchableOpacity>
        
      </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  orderId: {
    fontSize: 14,
    color: '#6b7280',
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
  timerSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  timerLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  timerContainer: {
    marginBottom: 4,
  },
  timerText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
  },
  dateText: {
    fontSize: 14,
    color: '#6b7280',
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
    height: 60,
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
  transferSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  bankCard: {
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    marginBottom: 16,
  },
  bankName: {
    fontSize: 16,
    fontWeight: '600',
  },
  bankSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  bankNote: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  accountSection: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  copyField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    marginBottom: 16,
  },
  accountNumber: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '500',
  },
  noteSection: {
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  noteText: {
    fontSize: 20,
    fontWeight : 800,
    color: '#6b7280',
    textAlign: 'left',
    width : '70%'
  },
  bottomSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 8,
  },
  bottomSection2: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 20,
  },
  confirmButton: {
    backgroundColor: '#22c55e',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orderListButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  orderListButtonText: {
    color: '#22c55e',
    fontSize: 16,
    fontWeight: '600',
  },
});