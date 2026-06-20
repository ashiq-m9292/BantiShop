import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';


const ProductSizeC = ({ selectedSize, setSelectedSize, sizeTitle, sizes, price, name, discription }: any) => {
    const { colors } = useTheme();
    const safeMode = Array.isArray(sizes) ? sizes : [];
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* name and description  */}
            <View style={styles.nameAndDescription}>
                <Text variant='titleLarge' style={{ fontWeight: 'bold', color: colors.onBackground }}>{name}</Text>
                <Text variant='bodyMedium' style={{ color: colors.onBackground, fontWeight: 'bold' }}>{discription}</Text>
            </View>

            <Text variant='titleLarge' style={{ fontWeight: 'bold', color: colors.onBackground }}>{sizeTitle}</Text>
            <View style={styles.productSizeContainer}>

                {
                    safeMode.map((item: any, index: any) => (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.6}
                            disabled={selectedSize === item}
                            style={[styles.bodyContainer, { backgroundColor: selectedSize === item ? colors.primary : colors.secondary }]}
                            onPress={() => setSelectedSize(item)}
                        >
                            <Text variant='bodyMedium' key={index}>{item?.size}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>

            {/* price  */}
            <Text variant='displaySmall' style={{ fontWeight: 'bold', color: colors.onBackground }}>{price}</Text>
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
    nameAndDescription: {
        gap: moderateScale(6),
    },
    productSizeContainer: {
        flexDirection: 'row',
        gap: moderateScale(12),
    },
    bodyContainer: {
        width: scale(60),
        height: verticalScale(40),
        borderRadius: moderateScale(30),
        alignItems: 'center',
        justifyContent: 'center',

    },
})
