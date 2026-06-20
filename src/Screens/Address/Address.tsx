import React from 'react';
import { View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddress, deleteAddress, updateDefaultAddress } from '../../Redux/Actions/AddressAction';
import { Header, Loader } from '../../Components/Components';
import styles from './Styles';
import Icon from '@react-native-vector-icons/material-design-icons';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTheme, Text } from 'react-native-paper';

const Address = ({ navigation }: any) => {
  const { loading, addresses } = useSelector((state: any) => state.ADDRESS);
  const dispatch = useDispatch<any>();
  const [load, setLoad] = React.useState(false);
  const { colors } = useTheme();

  // delete address
  const handleDeleteAddress = async (id: string) => {
    setLoad(true);
    try {
      const response = await dispatch(deleteAddress(id));
      if (response?.success) {
        await dispatch(getUserAddress());
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to delete address. Please try again later.');
      return;
    } finally {
      setTimeout(() => {
        setLoad(false);
      }, 1000);
    }
  };

  // update default address
  const handleUpdateDefaultAddress = async (id: any) => {
    setLoad(true);
    try {
      const response = await dispatch(updateDefaultAddress(id));
      if (response?.success) {
        await dispatch(getUserAddress());
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update default address. Please try again later.');
      return;
    } finally {
      setTimeout(() => {
        setLoad(false);
      }, 1000);
    }
  };

  // fetch user address on component mount
  React.useEffect(() => {
    dispatch(getUserAddress());
  }, [dispatch]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        backAction
        onBackPress={() => navigation.goBack()}
        title="Address"
      />
      {
        loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Loader size="Medium" color="red" />
          </View>
        ) : addresses && addresses?.length > 0 ? (
          <FlatList
            data={addresses}
            keyExtractor={(item, index) => item?._id?.toString() || index.toString()}
            renderItem={({ item }) => (
              <View style={[styles.bodyContainer, { backgroundColor: colors.background }]}>
                <View style={styles.textContainer}>
                  <Text variant='titleSmall' style={{ fontWeight: 'bold', color: colors.onBackground }}>{item?.street}</Text>
                  <Text variant='titleSmall' style={{ fontWeight: 'bold', color: colors.onBackground }}>{item?.village}</Text>
                  <Text variant='titleSmall' style={{ fontWeight: 'bold', color: colors.onBackground }}>{item?.city}</Text>
                  <Text variant='titleSmall' style={{ fontWeight: 'bold', color: colors.onBackground }}>{item?.state}</Text>
                  <Text variant='titleSmall' style={{ fontWeight: 'bold', color: colors.onBackground }}>{item?.pincode}</Text>
                  <Text variant='titleSmall' style={{ fontWeight: 'bold', color: colors.onBackground }}>{item?.phoneNumber}</Text>
                </View>
                <View style={styles.iconContainer}>
                  <TouchableOpacity onPress={() => navigation.navigate('UpdateAddress', { id: item?._id })}>
                    <Icon name="pencil" size={26} color={colors.onBackground} />
                  </TouchableOpacity>
                  <BouncyCheckbox
                    disabled={load}
                    size={25}
                    fillColor="green"
                    iconStyle={{ borderColor: "green" }}
                    isChecked={item?.isDefault === true ? true : false}
                    onPress={() => handleUpdateDefaultAddress(item?._id)}
                  />
                  <TouchableOpacity onPress={() => handleDeleteAddress(item?._id)} disabled={load}>
                    <Icon name="delete" size={26} color={colors.onBackground} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text variant='titleMedium' style={{ fontSize: 20, fontWeight: 'bold' }}>No address</Text>
          </View>
        )
      }

      {/*      plus button icon */}
      <TouchableOpacity style={styles.plusIconContainer} onPress={() => navigation.navigate('CreateAddress')}>
        <Icon name="plus" size={40} color={colors.secondary} />
      </TouchableOpacity>
    </View>
  );
}

export default Address;
