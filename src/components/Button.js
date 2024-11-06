import {
  Text,
  Pressable,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

export default function Button({color, title, children, onPress, style}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      
      style={{
        backgroundColor : color,
        ...styles.button,
        ...style,
      }}>
      {children ? children : <Text style= { styles.buttonTitle}>{title}</Text>}
      {/* ketika ada children yang dipake children */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 3,
    borderRadius : 3,
    width : 130

  },
  buttonTitle : {
    textAlign : 'center',
    color : '#fff',
    fontSize : 20,
    fontWeight : 800,
  }
});
