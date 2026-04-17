import React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

const InputC = ({ label, placeholder, mode, value, onChangeText, onPress }: any) => {
    return (
        <TextInput
            mode={mode}
            label={label}
            value={value}
            onChangeText={onChangeText}
            onPress={onPress}
            placeholder={placeholder}
        />
    );
}

export default InputC;
