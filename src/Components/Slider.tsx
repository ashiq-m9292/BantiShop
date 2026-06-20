import React from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { AvatarC } from '../Components/Components';
import { singlePress } from '../Helper/SinglePress';

const Slider = ({ navigation }: any) => {
  const { colors } = useTheme();
  return (
    <View style={[style.sliderContainer, { backgroundColor: colors.background }]}>

      {/* categary title */}
      <Text variant='titleLarge' style={{ color: colors.onBackground, fontWeight: 'bold' }}>Categaries</Text>

      {/* categaries icons */}
      <View style={style.categariIcon}>
        <TouchableOpacity style={style.item} onPress={() => {
          singlePress(() => navigation.navigate('CategoryProduct', { category: 'Pizza' }))
        }} activeOpacity={0.6}>
          <AvatarC type='image' size={60} source={require('../Images/pizza.jpg')} />
          <Text variant='titleSmall' style={{ color: colors.onBackground, fontWeight: 'bold' }}>Pizza</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.item} onPress={() => {
          singlePress(() => navigation.navigate('CategoryProduct', { category: 'Burger' }))
        }} activeOpacity={0.6}>
          <AvatarC type='image' size={60} source={require('../Images/burger.jpg')} />
          <Text variant='titleSmall' style={{ color: colors.onBackground, fontWeight: 'bold' }}>Burger</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.item} onPress={() => {
          singlePress(() => navigation.navigate('CategoryProduct', { category: 'Chowmeen' }))
        }} activeOpacity={0.6}>
          <AvatarC type='image' size={60} source={require('../Images/chowmeen.jpg')} />
          <Text variant='titleSmall' style={{ color: colors.onBackground, fontWeight: 'bold' }}>Chowmeen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.item} onPress={() => {
          singlePress(() => navigation.navigate('CategoryProduct', { category: 'new product' }))
        }} activeOpacity={0.6}>
          <AvatarC type='image' size={60} source={require('../Images/momos.jpg')} />
          <Text variant='titleSmall' style={{ color: colors.onBackground, fontWeight: 'bold' }}>Momos</Text>
        </TouchableOpacity>
      </View>

      {/* products title */}
      <Text variant='titleLarge' style={{ color: colors.onBackground, fontWeight: 'bold' }}>Products</Text>
    </View>
  );
}

export default Slider;


const style = StyleSheet.create({
  sliderContainer: {
    paddingTop: verticalScale(10),
    paddingHorizontal: scale(10),
    gap: verticalScale(12),
    paddingBottom: verticalScale(8)
  },
  item: {
    alignItems: 'center',
    gap: moderateScale(6)
  },
  categariIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(20)
  }
})
