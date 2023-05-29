import React from 'react';
import {Pressable, Text, TouchableOpacity} from 'react-native';
export default function Button({text, colors, textColor, onPress, disabled}) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors,
        borderRadius: 8,
        width: 100,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={{
          color: textColor,
          fontSize: 16,
          fontFamily: 'Montserrat-Medium',
        }}>
        {' '}
        {text}
      </Text>
    </TouchableOpacity>
  );
}
