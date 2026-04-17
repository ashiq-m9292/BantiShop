import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import styles from './Styles';
import { ButtonC, InputC } from '../../Components/Components';

const Login = ({ navigation }: any) => {
  return (
    <KeyboardAvoidingView style={styles.avoidingContainer} behavior='padding'>
      <ScrollView contentContainerStyle={styles.loginContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>

        {/* header title */}
        <Text variant='headlineSmall' style={{ alignSelf: 'center' }}>Login</Text>

        {/* login form */}
        <View style={styles.bodyContainer}>
          <InputC label='Email' placeholder='Enter your email' mode='outlined' />
          <View>
            <InputC label='Password' placeholder='Enter your password' mode='outlined' />

            <Text variant='titleMedium' style={{ alignSelf: 'flex-end' }}>Forgot Password?</Text>
          </View>

          <ButtonC title='Login' mode='contained' buttonStyle={{ borderRadius: 8, padding: 4 }} onPress={() => { }} />
        </View>

        {/* sign up */}
        <View style={styles.footerContainer}>
          <Text variant='bodyMedium'>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.replace('Signup')}>
            <Text variant='bodyMedium' style={{ color: '#6200ee', marginLeft: 4 }}>Sign Up</Text>
          </TouchableOpacity>
        </View>


      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Login;
