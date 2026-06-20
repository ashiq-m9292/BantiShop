import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { ButtonC } from './Components';

const BottomContainer = ({ totlPrice, onPress, loading, disabled }: any) => {
    const { colors } = useTheme();
    return (
        <View style={[styles.footerContainer, { backgroundColor: colors.background }]} >
            <Text variant='titleMedium' style={{ fontWeight: 'bold', color: colors.secondary }}>₹{totlPrice}</Text>
            <ButtonC
                loading={loading}
                disabled={disabled}
                mode="contained"
                title="Checkout"
                buttonStyle={{ backgroundColor: colors.secondary, borderRadius: 6 }}
                textColor="white"
                onPress={onPress}
                lableStyle={{ fontSize: 18 }}
            />
        </View>
    );
}

export default BottomContainer;

const styles = StyleSheet.create({
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        zIndex: 0,
    }
});
