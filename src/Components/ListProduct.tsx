import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Icon from '@react-native-vector-icons/material-design-icons';
import { DividerC, IconwithButton } from '../Components/Components';

const ListProduct = ({ cardContainer,cardContainerCopy, onPress, cartContainerStyle, cartBody, imageStyle, contentStyle, source, name, price, showButtonIcon, showIcon }: any) => {
    return (
        <Card style={[styles.cardContainer, cardContainerCopy]} contentStyle={cartContainerStyle} onPress={onPress}>
            <View style={[styles.cardBody, cartBody]}>
                <Card.Cover source={source} style={[styles.imageStyle, imageStyle]} />
                <Card.Content style={[styles.contentStyle, contentStyle]}>
                    <Text variant="titleMedium">{name}</Text>
                    <Text variant="bodyMedium">{price}</Text>
                    <Text variant="bodyMedium">Category</Text>
                </Card.Content>
            </View>

            {/* increment decrement button */}
            {
                showButtonIcon && (
                    <View style={styles.buttonContainerStyle}>
                        <IconwithButton icon='minus' size={30} />
                        <Text variant='titleMedium'>1</Text>
                        <IconwithButton icon='plus' size={30} />
                    </View>
                )
            }

            {/* icons */}
            {
                showIcon && (
                    <View style={styles.iconContainer}>
                        <DividerC />
                        <View style={styles.iconStyle}>
                            <Icon name='delete' size={30} />
                            <Icon name='heart' size={30} />
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
        margin: moderateScale(14),
    },
    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    imageStyle: {
        width: '30%',
        height: verticalScale(80),
        resizeMode: 'cover',
    },
    contentStyle: {
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
