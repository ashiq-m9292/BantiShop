import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Appbar, Avatar, Switch, useTheme, Text, Badge } from 'react-native-paper';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Icon from '@react-native-vector-icons/material-design-icons';


const Header = ({
    backAction,
    onBackPress,
    avatar,
    avatarSource,
    avatarOnPress,
    hTitle,
    title,
    showSwitch,
    value,
    onValueChange,
    search,
    searchOnPress,
    cart,
    cartOnPress,
    badge
}: any) => {
    const { colors } = useTheme();

    return (
        <Appbar.Header
            style={[styles.headerContainer, { backgroundColor: colors.background }]}
            statusBarHeight={10}
        >
            {/* left section */}
            <View style={styles.leftSection}>
                {backAction && (
                    <TouchableOpacity onPress={onBackPress}>
                        <Icon name="arrow-left" size={moderateScale(24)} color={colors.onBackground} />
                    </TouchableOpacity>
                )}

                {avatar && (
                    <TouchableOpacity onPress={avatarOnPress}>
                        <Avatar.Image size={moderateScale(40)} source={avatarSource} />
                    </TouchableOpacity>
                )}

                {title && (
                    <Text variant='titleMedium' style={{ color: colors.onBackground, fontWeight: 'bold' }}>{title}</Text>

                )}
            </View>

            {/* center section */}
            <View style={styles.centerSection}>
                {
                    hTitle && (
                        <Text variant='titleLarge' style={{ color: colors.onBackground, fontWeight: 'bold' }}>Banti Shop</Text>
                    )
                }
                {showSwitch && (
                    <Switch value={value} onValueChange={onValueChange} color={colors.onBackground} />
                )}
            </View>

            {/* right section  */}
            <View style={styles.rightSection}>
                {search && (
                    <TouchableOpacity>
                        <Icon name="magnify" size={moderateScale(24)} color={colors.onBackground} onPress={searchOnPress} />
                    </TouchableOpacity>
                )}

                {cart && (
                    <TouchableOpacity>
                        <Icon name="cart" size={moderateScale(24)} color={colors.onBackground} onPress={cartOnPress} />
                        <Badge size={moderateScale(16)} style={{ position: 'absolute', top: -5, right: -5, backgroundColor: colors.secondary, color: colors.onBackground }} >
                            {badge}
                        </Badge>
                    </TouchableOpacity>
                )}
            </View>
        </Appbar.Header>
    );
}

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        marginHorizontal: moderateScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: verticalScale(10),
        position: 'relative',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: verticalScale(16),
        position: 'absolute',
        left: 0,
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: verticalScale(16),
        position: 'absolute',
        right: 0,
    },
    centerSection: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: verticalScale(16),
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
    }
});
