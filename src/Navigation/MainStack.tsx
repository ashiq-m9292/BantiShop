import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Screens from '../Screens/Screens';
import Bottom from './Bottom';

const Stack = createNativeStackNavigator();
const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='Bottom' component={Bottom} />

            <Stack.Screen name="ProductDetails" component={Screens.ProductDetails} />

            <Stack.Screen name="Orders" component={Screens.Orders} />

            <Stack.Screen name="OrderDetails" component={Screens.OrderDetails} />

            <Stack.Screen name="Address" component={Screens.Address} />

            <Stack.Screen name="CreateAddress" component={Screens.CreateAddress} />

            <Stack.Screen name="UpdateAddress" component={Screens.UpdateAddress} />

        </Stack.Navigator>
    );
}

export default MainStack;
