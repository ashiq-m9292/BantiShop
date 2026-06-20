import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Header, DividerC } from '../../Components/Components';
import styles from './Styles';
import { Text, useTheme } from 'react-native-paper';
import { singlePress } from '../../Helper/SinglePress';


const Setting = ({ navigation }: any) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.settingContainer, { backgroundColor: colors.background }]}>
      {/* header */}
      <Header
        backAction="true"
        onBackPress={() => navigation.goBack()}
        title="Setting"
      />
      {/* body */}
      <View style={[styles.bodyContainer, { backgroundColor: colors.background }]}>
        <DividerC />
        <TouchableOpacity activeOpacity={0.6} onPress={() => {
          singlePress(() => {
            navigation.navigate("Orders")
          })
        }}>
          <Text variant='titleMedium' style={{ fontWeight: 'bold', color: colors.onBackground }}>Orders</Text>
        </TouchableOpacity>
        <DividerC />
        <TouchableOpacity activeOpacity={0.6} onPress={() => {
          singlePress(() => {
            navigation.navigate('WishList')
          })
        }}>
          <Text variant='titleMedium' style={{ fontWeight: 'bold', color: colors.onBackground }}>WishList</Text>
        </TouchableOpacity>
        <DividerC />
        <TouchableOpacity activeOpacity={0.6}>
          <Text variant='titleMedium' style={{ fontWeight: 'bold', color: colors.onBackground }}>Edit Account</Text>
        </TouchableOpacity>
        <DividerC />
        <TouchableOpacity activeOpacity={0.6} onPress={() => {
          singlePress(() => {
            navigation.navigate('Address')
          })
        }}>
          <Text variant='titleMedium' style={{ fontWeight: 'bold', color: colors.onBackground }}>Address</Text>
        </TouchableOpacity>
        <DividerC />
        <TouchableOpacity activeOpacity={0.6}>
          <Text variant='titleMedium' style={{ fontWeight: 'bold', color: colors.onBackground }}>Language</Text>
        </TouchableOpacity>
        <DividerC />
      </View>
    </View>
  );
}

export default Setting;
