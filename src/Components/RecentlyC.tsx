import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { singlePress } from '../Helper/SinglePress';

const RecentlyC = ({ data, navigation }: any) => {
    const { colors } = useTheme();
    const safeMode = Array.isArray(data) ? data : [];
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text variant='titleLarge' style={{ fontWeight: 'bold', color: colors.onBackground }}>Recently Viewed</Text>
            <FlatList
                keyExtractor={(item, index) => item._id + index.toString()}
                data={safeMode}
                showsVerticalScrollIndicator={false}
                horizontal={true}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemContainer} onPress={() => singlePress(() => navigation.navigate('ProductDetails', { id: item?.productId?._id }))}>
                        <Image
                            style={styles.imageStyle}
                            source={{ uri: item?.productId?.images[0]?.url }}
                        />
                        <Text variant='titleSmall' style={{ color: colors.onBackground, fontWeight: 'bold' }}>{item?.productId?.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

export default RecentlyC;


const styles = StyleSheet.create({
    container: {
        marginHorizontal: scale(10),
        marginTop: verticalScale(10),
    },
    itemContainer: {
        width: scale(100),
        paddingHorizontal: scale(10),
        paddingTop: verticalScale(10),
        alignItems: 'center',
    },
    imageStyle: {
        width: '100%',
        height: moderateScale(80),
        borderRadius: moderateScale(10),
    },

});
