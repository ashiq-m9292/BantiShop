import React from 'react';
import { View } from 'react-native';
import { Header, ButtonC, AvatarC, DividerC } from '../../Components/Components';
import { Text, useTheme } from 'react-native-paper';
import styles from './Styles';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, logout } from '../../Redux/Actions/UserAction';

const Account = ({ navigation }: any) => {
  const [Accountloading, setAccountLoading] = React.useState(false);
  const { loading, user } = useSelector((state: any) => state.USER);
  const dispatch = useDispatch<any>();
  const { colors } = useTheme();

  const logoutUser = async () => {
    setAccountLoading(true);
    try {
      const response = await dispatch(logout());
      if (response?.success) {
        setTimeout(() => {
          setAccountLoading(false)
        }, 900);
      }
    } catch (error) {
      return error;
    } finally {
      setTimeout(() => {
        setAccountLoading(false);
      }, 1000);
    }
  };

  React.useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <View style={[styles.accountContainer, { backgroundColor: colors.background }]}>
      {/* header */}
      <Header
        backAction="true"
        onBackPress={() => navigation.goBack()}
        title="Account"
      />

      {/* body */}
      <View style={[styles.bodyContainer, { backgroundColor: colors.background }]}>
        {/* avatar */}
        <View style={[styles.avatarContainer, { backgroundColor: colors.background }]}>
          <AvatarC type='image' source={{ uri: user?.picture?.url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} size={80} />
          <Text variant='titleMedium' style={{ alignSelf: 'center', color: colors.onBackground, fontWeight: 'bold' }}>{user?.email}</Text>
        </View>

        {/* user info */}
        <View style={[styles.infoContainer, { backgroundColor: colors.background }]}>
          <Text variant='titleLarge' style={{ alignSelf: 'center', color: colors.onBackground, fontWeight: 'bold' }}>Details </Text>
          <DividerC />
          <Text variant='titleMedium' style={{ fontWeight: 'bold', color: colors.onBackground }}>name: {loading ? 'Loading...' : user?.name} </Text>
          <DividerC />
          <Text variant='titleMedium' style={{ fontWeight: 'bold', color: colors.onBackground }}>email: {loading ? 'Loading...' : user?.email}</Text>
          <DividerC />
          <Text variant='titleMedium' style={{ fontWeight: 'bold', color: colors.onBackground }}>role: {loading ? 'Loading...' : user?.role}</Text>
          <DividerC />
        </View>

        {/* logout */}
        <ButtonC
          loading={Accountloading}
          disabled={Accountloading}
          title="Logout"
          mode="contained"
          textColor={'white'}
          onPress={logoutUser}
          buttonStyle={{ width: '30%', alignSelf: 'center', backgroundColor: colors.secondary, borderRadius: 6 }}
        />

      </View>
    </View>
  );
}

export default Account;
