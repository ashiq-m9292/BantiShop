import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { scale, verticalScale } from 'react-native-size-matters';
import { AvatarC } from '../Components/Components';

const Slider = () => {
  return (
    <View style={style.sliderContainer}>
      <Text variant='titleLarge'>Categaries</Text>
      <View style={style.categariIcon}>
        <AvatarC type='text' label='V' size={64} />
        <AvatarC type='text' label='NV' size={64} />
      </View>
      <Text variant='titleLarge'>Products</Text>
    </View>
  );
}

export default Slider;


const style = StyleSheet.create({
  sliderContainer: {
    marginTop: verticalScale(10),
    marginHorizontal: scale(10),
    gap: verticalScale(12)
  },
  categariIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(20)
  }
})
