import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Header, DividerC } from '../../Components/Components';
import styles from './Styles';
import { Text } from 'react-native-paper';

const Setting = () => {
  return (
    <View style={styles.settingContainer}>
      {/* header */}
      <Header
        backAction="true"
        title="Setting"
      />
      {/* body */}
      <View style={styles.bodyContainer}>
        <DividerC />
        <TouchableOpacity activeOpacity={0.6}>
          <Text variant='titleMedium'>Orders</Text>
        </TouchableOpacity>
        <DividerC />
        <TouchableOpacity activeOpacity={0.6}>
          <Text variant='titleMedium'>WishList</Text>
        </TouchableOpacity>
        <DividerC />
        <TouchableOpacity activeOpacity={0.6}>
          <Text variant='titleMedium'>Edit Account</Text>
        </TouchableOpacity>
        <DividerC />
        <TouchableOpacity activeOpacity={0.6}>
          <Text variant='titleMedium'>Address</Text>
        </TouchableOpacity>
        <DividerC />
        <TouchableOpacity activeOpacity={0.6}>
          <Text variant='titleMedium'>Language</Text>
        </TouchableOpacity>
        <DividerC />
      </View>
    </View>
  );
}

export default Setting;
