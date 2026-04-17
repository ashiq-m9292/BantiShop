import React from 'react';
import { View, Text } from 'react-native';
import { IconButton } from 'react-native-paper';

const IconwithButton = ({icon,size, onPress}:any) => {
  return (
   <IconButton
    icon={icon}
    size={size}
    onPress={onPress}
   />
  );
}

export default IconwithButton;
