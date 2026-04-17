import React from 'react';
import { FlatList, ImageBackground, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

const width = Dimensions.get('window').width
const Carousel = ({ sliderData, imageStyle }: any) => {
  return (
    <FlatList
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      data={sliderData}
      renderItem={({ item }) => <TouchableOpacity activeOpacity={0.6}>
        <ImageBackground
          source={item.image}
          style={[styles.imageStyle, imageStyle]}
        />
      </TouchableOpacity>}
    />
  );
}

export default Carousel;

const styles = StyleSheet.create({
  imageStyle: {
    width: width,
    height: verticalScale(200),
    resizeMode: 'cover',
  }
})
