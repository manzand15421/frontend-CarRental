import {
    View,
    Text,
    StyleSheet,
  } from 'react-native';;
import { useState,useRef ,useEffect} from "react";

export function Coundown({timerDb, onFinish,}) {

  const [timeNow, setTimeNow] = useState({hours: 0, minutes: 0, seconds: 0});
  const intervalRef = useRef(null);

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };


  const calculateTime = () => {
    if (!timerDb) return;
    const now = new Date(Date.now() + 16 * 60 * 60 * 1000);

    const updateTime = timerDb - now;

    if (updateTime <= 0) {
      setTimeNow({hours: 0, minutes: 0, seconds: 0});
      clearTimer();
      onFinish();
      return;
    }

    const hours = Math.floor(updateTime / (1000 * 60 * 60));
    const minutes = Math.floor((updateTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((updateTime % (1000 * 60)) / 1000);

    setTimeNow({hours, minutes, seconds});
  };

  useEffect(() => {
    if (timerDb) calculateTime();
    intervalRef.current = setInterval(() => {
      calculateTime();
    }, 1000);
    return () => clearTimer();
  }, [timerDb]); 

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>
        {String(timeNow.hours).padStart(2, '0')}:
        {String(timeNow.minutes).padStart(2, '0')}:
        {String(timeNow.seconds).padStart(2, '0')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    marginBottom: 0,
  },
  timerText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
  },
});
