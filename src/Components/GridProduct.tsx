import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Icon from '@react-native-vector-icons/material-design-icons';

const GridProduct = ({ onPress, showContent, name, price, category, source, imageStyle, showContentWithIcon, deleteOnPress }: any) => {
  const { colors } = useTheme();
  return (
    <Card style={[style.cardContainer, { backgroundColor: colors.background }]} contentStyle={{ padding: 2 }} onPress={onPress}>
      <Card.Cover source={source} style={imageStyle} />
      {
        showContent && (
          <View style={style.mainContent}>
            <Card.Content style={style.content}>
              <Text variant="titleMedium" style={{ color: colors.onBackground, fontWeight: 'bold' }}>{name}</Text>
              <Text variant="bodyMedium" style={{ color: colors.onBackground, fontWeight: 'bold' }}>{price}</Text>
              <Text variant="bodyMedium" style={{ color: colors.onBackground, fontWeight: 'bold' }}>{category}</Text>
            </Card.Content>
            <Icon name="chevron-right" size={26} color={colors.onBackground} />
          </View>
        )
      }
      {/* show conten with icon  */}
      {
        showContentWithIcon && (
          <Card.Content style={style.contentwithIcon}>
            <View style={style.textContainer}>
              <Text variant="titleMedium" style={{ color: colors.onBackground, fontWeight: 'bold' }}>{name}</Text>
              <Text variant="bodyMedium" style={{ color: colors.onBackground, fontWeight: 'bold' }}>{price}</Text>
            </View>
            <TouchableOpacity onPress={deleteOnPress} style={{ paddingTop: 14 }}>
              <Icon name="delete" size={26} color={colors.onBackground} />
            </TouchableOpacity>
          </Card.Content>
        )
      }
    </Card>
  );
}

export default GridProduct;

const style = StyleSheet.create({
  cardContainer: {
    width: '48%',
    margin: '1%',
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(10),

  },
  content: {
    gap: moderateScale(2)
  },
  contentwithIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(10),
  },
  textContainer: {
    gap: moderateScale(8)
  }
})
