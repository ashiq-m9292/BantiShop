import React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

const InputC = ({ label, placeholder, mode, value, onChangeText, onBlur, error, onPress, autoFocus, onSubmitEditing }: any) => {
    return (
        <TextInput
            mode={mode}
            label={label}
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            onPress={onPress}
            error={error}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onSubmitEditing={onSubmitEditing}
        />
    );
}

export default InputC;
