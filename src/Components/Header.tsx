import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Switch } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../Redux/Actions/DarkModeAction';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const Header = ({
    backAction,
    onBackPress,
    avatar,
    title,
    showSwitch,
    search,
    searchOnPress,
    cart,
    cartOnPress
}: any) => {
    const darkMode = useSelector((state: any) => state.DARKMODE.darkMode);
    const dispatch = useDispatch<any>();

    const handleSwith = () => {
        dispatch(toggleDarkMode());
    };

    return (
        <Appbar.Header
            style={styles.headerContainer}
            statusBarHeight={0}
        >
            {/* left section */}
            <View style={styles.leftSection}>
                {backAction && (
                    <Appbar.BackAction onPress={onBackPress} />
                )}

                {avatar && (
                    <Avatar.Image size={30} source={avatar} />
                )}

                {title && (
                    <Appbar.Content title={title} style={{ flex: 0, }} titleStyle={{ fontSize: 18 }} />
                )}
            </View>

            {/* center section */}
            <View style={styles.centerSection}>
                {showSwitch && (
                    <Switch value={darkMode} onValueChange={handleSwith} style={{ elevation: 0, shadowColor: 'transparent' }} />
                )}
            </View>

            {/* right section  */}
            <View style={styles.rightSection}>
                {search && (
                    <Appbar.Action icon="magnify" onPress={searchOnPress} />
                )}

                {cart && (
                    <Appbar.Action icon="cart" onPress={cartOnPress} style={{ marginRight: -4 }} />
                )}
            </View>
        </Appbar.Header>
    );
}

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: verticalScale(10),
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(12),
        marginLeft: moderateScale(6)
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    centerSection: {
        top: verticalScale(14),
    }
});
