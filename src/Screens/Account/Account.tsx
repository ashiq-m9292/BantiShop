import React from 'react';
import { View } from 'react-native';
import { Header, ButtonC, AvatarC, DividerC } from '../../Components/Components';
import { Text } from 'react-native-paper';
import styles from './Styles';

const Account = () => {
  return (
    <View style={styles.accountContainer}>
      {/* header */}
      <Header
        backAction="true"
        title="Account"
      />

      {/* body */}
      <View style={styles.bodyContainer}>
        {/* avatar */}
        <View style={styles.avatarContainer}>
          <AvatarC type='icon' icon='account' size={80} />
          <Text>Email</Text>
        </View>

        {/* user info */}
        <View style={styles.infoContainer}>
          <Text variant='titleLarge' style={{alignSelf: 'center'}}>Details </Text>
          <DividerC />
          <Text variant='titleMedium'>name: </Text>
          <DividerC />
          <Text variant='titleMedium'>email: </Text>
          <DividerC />
          <Text variant='titleMedium'>phone number: </Text>
          <DividerC />
        </View>

        {/* logout */}
        <ButtonC
          title="Logout"
        />
      </View>
    </View>
  );
}

export default Account;
