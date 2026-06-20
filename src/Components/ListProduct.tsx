import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Icon from '@react-native-vector-icons/material-design-icons';
import { DividerC, IconwithButton } from '../Components/Components';

const ListProduct = ({ cardContainer, onPress, cartContainerStyle, cartBody, imageStyle, contentStyle, source, name, price, more, cartQuantity, showMoreDetails, category, brand, showButtonIcon, showIcon, size, quantity, minusonPress, plusonPress, cartOnPress, heartOnPress, color }: any) => {
    const { colors } = useTheme();
    return (
        <Card style={[styles.cardContainer, cardContainer, { backgroundColor: colors.background }]} contentStyle={cartContainerStyle} onPress={onPress}>
            <View style={[styles.cardBody, cartBody]}>
                <Card.Cover source={source} style={imageStyle} />
                <Card.Content style={[styles.contentStyle, contentStyle]}>
                    <Text variant="titleMedium" style={{ color: colors.onBackground, fontWeight: 'bold' }}>{name}</Text>
                    <Text variant="bodyMedium" style={{ color: colors.onBackground, fontWeight: 'bold' }}>{price}</Text>
                    <Text variant="bodyMedium" style={{ color: colors.onBackground, fontWeight: 'bold' }}>{category}</Text>
                    {cartQuantity && <Text variant="bodyMedium" style={{ color: colors.onBackground, fontWeight: 'bold' }}>{cartQuantity}</Text>}
                    {
                        showMoreDetails && (
                            <>
                                <Text variant="bodyMedium">{brand}</Text>
                                <Text variant="bodyMedium">{size}</Text>
                                <Text variant="bodyMedium">{more}</Text>
                            </>
                        )
                    }

                </Card.Content>
            </View>

            {/* increment decrement button */}
            {
                showButtonIcon && (
                    <View style={styles.buttonContainerStyle}>
                        <IconwithButton icon='minus' size={30} onPress={minusonPress} />
                        <Text variant='titleMedium'>{quantity}</Text>
                        <IconwithButton icon='plus' size={30} onPress={plusonPress} />
                    </View>
                )
            }

            {/* icons */}
            {
                showIcon && (
                    <View style={styles.iconContainer}>
                        <DividerC />
                        <View style={styles.iconStyle}>
                            <TouchableOpacity onPress={cartOnPress}>
                                <Icon name='delete' size={30} color={"grey"} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={heartOnPress}>
                                <Icon name='heart' size={30} color={color} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        </Card>
    );
}

export default ListProduct;

const styles = StyleSheet.create({
    cardContainer: {
        margin: moderateScale(10),
    },
    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    imageStyle: {
        // width: '30%',
        // height: verticalScale(80),
        // resizeMode: 'cover',
    },
    contentStyle: {
        flex: 1,
        gap: 10
    },
    buttonContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: scale(8)
    },
    iconContainer: {
        marginTop: verticalScale(10),
        gap: verticalScale(10)
    },
    iconStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }

});
