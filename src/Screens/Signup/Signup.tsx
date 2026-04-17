import React from 'react';
import { View, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { ButtonC, InputC } from '../../Components/Components';
import styles from './Styles';

const Signup = ({ navigation }: any) => {
  return (
    <KeyboardAvoidingView style={styles.avoidingContainer} behavior='padding'>
      <ScrollView contentContainerStyle={styles.signupContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>

        {/* header title */}
        <Text variant='headlineSmall' style={{ alignSelf: 'center' }}>SignUp</Text>

        {/* login form */}
        <View style={styles.bodyContainer}>
          <InputC label='Username' placeholder='Enter your username' mode='outlined' />

          <InputC label='Email' placeholder='Enter your email' mode='outlined' />

          <InputC label='Password' placeholder='Enter your password' mode='outlined' />

          <ButtonC title='SignUp' mode='contained' buttonStyle={{ borderRadius: 8, padding: 4 }} onPress={() => { }} />
        </View>

        {/* sign up */}
        <View style={styles.footerContainer}>
          <Text variant='bodyMedium'>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text variant='bodyMedium' style={{ color: '#6200ee', marginLeft: 4 }}>Log In</Text>
          </TouchableOpacity>
        </View>


      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Signup;
