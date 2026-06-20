import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Screens from '../Screens/Screens';
import Icon from '@react-native-vector-icons/material-design-icons'
import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();
const Bottom = () => {
    const { colors } = useTheme();
    return (
        // icon kaise lagaye
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: colors.background
            },
            tabBarActiveTintColor: colors.secondary
        }}
        >
            <Tab.Screen name="Home" component={Screens.Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="cart" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen name="Account" component={Screens.Account}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='account' color={color} size={size} />
                    ),
                }}
            />


            <Tab.Screen name="Setting" component={Screens.Setting}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='cog' color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen name="Cart" component={Screens.Cart}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='cart' color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default Bottom;
