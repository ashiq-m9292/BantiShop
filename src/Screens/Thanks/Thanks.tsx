import React from 'react';
import { View, StyleSheet, BackHandler, Image, ActivityIndicatorBase } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { ButtonC } from '../../Components/Components';
import Icon from '@react-native-vector-icons/material-design-icons';

const Thanks = ({ navigation }: any) => {
    const { colors } = useTheme();
    //navigation home screen  to orders screen
    const goTrackOrder = () => {
        navigation.reset({
            index: 1,
            routes: [{ name: "Bottom" }, { name: "Orders" }],
        });
    };

    //    navigation home scree
    const goToHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Bottom" }],
        })
    };

    React.useEffect(() => {
        const onBackPress = () => {
            navigation.reset({
                index: 1,
                routes: [{ name: "Bottom" }, { name: "Orders" }],
            });
            return true; // Prevent default back behavior
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () => backHandler.remove();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* icon contaier */}
            <View style={[styles.iconContainer, { backgroundColor: colors.background }]}>
                <Icon name="check-circle" size={80} color="green" />
                <Text variant='titleMedium' style={{ fontWeight: 'bold', color: colors.onBackground, textAlign: 'center' }}>Order Confirmed</Text>
                <Text variant='titleSmall' style={{ fontWeight: 'bold', color: colors.onBackground, textAlign: 'center' }}>Your order has been placed successfully</Text>
            </View>

            <ButtonC
                onPress={goTrackOrder}
                mode='contained'
                buttonStyle={{ backgroundColor: colors.secondary, borderRadius: 4, marginHorizontal: 10 }}
                textColor='white'
                title='track order'
            />

            <ButtonC
                onPress={goToHome}
                mode='outlined'
                title='continue shopping'
                textColor="white"
                buttonStyle={{ backgroundColor: colors.secondary, borderRadius: 4, marginHorizontal: 10 }}
            />
        </View>
    );
}

export default Thanks;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40
    },
    iconContainer: {
        alignItems: 'center',
        gap: 10
    },
});


