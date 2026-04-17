import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { moderateScale } from 'react-native-size-matters';

const GridProduct = ({ onPress, name, price, description, source }: any) => {
  return (
    <Card style={style.cardContainer} contentStyle={{ padding: 4 }} onPress={onPress}>
      <Card.Cover source={source} style={style.imageStyle} />
      <Card.Content style={style.content}>
        <Text variant="titleMedium">{name}</Text>
        <Text variant="bodyMedium">{price}</Text>
        <Text variant="bodyMedium">{description}</Text>
      </Card.Content>
    </Card>
  );
}

export default GridProduct;

const style = StyleSheet.create({
  cardContainer: {
    width: '48%',
    margin: '1%',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  content: {
    padding: moderateScale(10),
    gap: moderateScale(6)
  }
})
