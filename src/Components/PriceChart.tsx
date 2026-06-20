import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const PriceChart = ({ textone, texttwo, textthree, textfour, text_one, text_two, text_three, text_four }: any) => {
    const { colors } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* left section */}
            <View style={[styles.leftSection, { backgroundColor: colors.background }]}>
                <Text variant='titleSmall' style={{ fontWeight: 'bold', color: colors.primary }}>{textone}</Text>
                <Text variant='titleSmall' style={{ fontWeight: 'bold', color: colors.onBackground }}>{texttwo}</Text>
                <Text variant='titleSmall' style={{ fontWeight: 'bold', color: colors.onBackground }}>{textthree}</Text>
                <Text variant='titleMedium' style={{ fontWeight: 'bold', color: colors.secondary }}>{textfour}</Text>
            </View>
            {/* right section */}
            <View style={[styles.rightSection, { backgroundColor: colors.background }]}>
                <Text variant='titleSmall' style={{ fontWeight: 'bold', color: colors.primary }}>{text_one}</Text>
                <Text variant='titleSmall' style={{ fontWeight: 'bold', color: colors.onBackground}}>{text_two}</Text>
                <Text variant='titleSmall' style={{ fontWeight: 'bold', color: colors.onBackground }}>{text_three}</Text>
                <Text variant='titleMedium' style={{ fontWeight: 'bold', color: colors.secondary }} >{text_four}</Text>
            </View>
        </View>
    );
}

export default PriceChart;


const styles = StyleSheet.create({
    container: {
        marginHorizontal: scale(10),
        marginVertical: verticalScale(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        elevation: 2
    },
    leftSection: {
        gap: 16,
    },
    rightSection: {
        gap: 16,
    }
})
