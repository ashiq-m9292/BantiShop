import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { ButtonC } from './Components';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const DefaultAddress = ({ oneText, twoText, threeText, onPress, onPressText }: any) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.bodyContaier}>
        <Text variant='titleMedium' style={{ fontWeight: 'bold', color: colors.onBackground }}>Delivery Address</Text>
        <View>
          <Text variant='bodyMedium' style={{ fontWeight: 'bold', paddingBottom: verticalScale(4), color: colors.onBackground }}>Home(Default)</Text>
          <Text variant='bodyMedium' style={{ color: colors.onBackground }}>{oneText}</Text>
          <Text variant='bodyMedium' style={{ color: colors.onBackground }}>{twoText}</Text>
          <Text variant='bodyMedium' style={{ color: colors.onBackground }}>{threeText} </Text>
        </View>
      </View>
      <TouchableOpacity onPress={onPress} style={{ position: 'absolute', top: 14, right: 10 }}>
        <Text variant='bodyMedium' style={{ color: 'red', fontWeight: 'bold' }}>{onPressText}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default DefaultAddress;

const styles = StyleSheet.create({
  container: {
    maxHeight: verticalScale(200),
    minHeight: verticalScale(120),
    overflow: 'hidden',
    marginHorizontal: scale(10),
    marginVertical: verticalScale(4),
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  bodyContaier: {
    gap: moderateScale(8)
  }
})
