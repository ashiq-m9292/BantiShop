import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { moderateScale, scale } from 'react-native-size-matters';

// reusable component
const ProductSizeC = ({ selectedSize, price, name }: any) => {
    const size = [
        'S',
        'M',
        'L',
        'XL',
        'XXL',
    ];
    return (
        <View style={styles.container}>
            <Text variant='titleMedium'>{selectedSize}</Text>
            <View style={styles.productSizeContainer}>
                {
                    size.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.bodyContainer}>
                            <Text key={index}>{item}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>

            {/* name and description */}
            <View>
                <Text variant='titleLarge'>{name}</Text>
                <Text>dkdkdkdkdkkkdkdk Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque soluta repellendus minus fuga at, facere numquam autem libero odit ex.</Text>
            </View>

            {/* price  */}
            <View>
                <Text variant='displaySmall'>{price}</Text>
            </View>


        </View>
    );
}

export default ProductSizeC;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: scale(12),
        marginVertical: moderateScale(12),
        gap: moderateScale(24),
    },
    productSizeContainer: {
        flexDirection: 'row',
        gap: moderateScale(12),
    },
    bodyContainer: {
        backgroundColor: 'green',
        padding: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',

    },
})
