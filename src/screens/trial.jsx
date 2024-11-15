import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setEndTime, selectEndTime,clearTime } from "../redux/reducers/timer/trial"; // Update path as necessary

const TimerScreen = () => {
  const dispatch = useDispatch();
  const endTime = useSelector(selectEndTime); // Get endTime from Redux

  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 }); //hasil akhir dari kalkulasi
  const [timerDuration, setTimerDuration] = useState(10); // Set default timer 

  // ketika tidak ada endtime dari redux maka fungsi ini akan jalan
  useEffect(() => {
    if (!endTime) {
      const now = new Date().getTime();
      const newEndTime = now + timerDuration * 60 * 60 * 1000; // kalkulasi total waktu sekarang + durasi yang diinginkan (ms)
      dispatch(setEndTime(newEndTime)); // masukkan total waktu ke redux
    }
  }, [dispatch, endTime, timerDuration]); // Add timerDuration to dependencies


  // mengkalkulasi waktu ketika halaman direload 
  const calculateTimeLeft = () => {
    if (!endTime) return;
//variabel untuk menghitung waktu total redux dikurangi waktu sekarang (ketika dibuka)
    const now = new Date().getTime();
    const diff = endTime - now;

    if (diff <= 0) {
      setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    //hasil dari pengurangan dicari untuk jam,menit,dan waktu
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeLeft({ hours, minutes, seconds }); //masukakn value 
  };

  // Update the countdown timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);



  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {String(timeLeft.hours).padStart(2, "0")}:
        {String(timeLeft.minutes).padStart(2, "0")}:
        {String(timeLeft.seconds).padStart(2, "0")}
      </Text>
      
      {/* Buttons to set the timer to different durations */}
      <View style={styles.buttonsContainer}>
        <Button title="Set Timer to 24 hours" onPress={() => handleSetTimer(24)} />
        <Button title="Set Timer to 10 hours" onPress={() => handleSetTimer(10)} />
        <Button title="Set Timer to 1 hour" onPress={() => handleSetTimer(1)} />
        <Button title="reset" onPress={() => dispatch(clearTime())} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#000",
  },
  buttonsContainer: {
    marginTop: 20,
  },
});

export default TimerScreen;
