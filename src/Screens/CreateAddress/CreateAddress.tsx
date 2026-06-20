import React from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { ButtonC, Header, InputC } from '../../Components/Components';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { createAddress } from '../../Redux/Actions/AddressAction';
import styles from './Styles';
import { useTheme } from 'react-native-paper';

const CreateAddress = ({ navigation }: any) => {
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = React.useState(false);
  const {colors} = useTheme();

  // schema for form validation
  const validationSchema = Yup.object().shape({
    street: Yup.string().required('Street is required'),
    village: Yup.string().required('Village is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    pincode: Yup.string().required('Pincode is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
  });

  // handle form submit
  const handleCreateAddress = async (values: any) => {
    setLoading(true);
    try {
      const response = await dispatch(createAddress(values));
      if (response?.success) {
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while creating address');
      return;
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        backAction
        onBackPress={() => navigation.goBack()}
        title="Create Address"
      />
      <Formik
        initialValues={{ street: '', village: '', city: '', state: '', pincode: '', phoneNumber: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await handleCreateAddress(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <KeyboardAvoidingView behavior='padding' style={styles.avoidingContainer}>
            <ScrollView keyboardShouldPersistTaps='handled' style={styles.signupContainer} showsVerticalScrollIndicator={false}>
              <View style={styles.bodyContainer}>
                <InputC
                  label='Street'
                  placeholder='Enter Street'
                  mode='outlined'
                  value={values.street}
                  onChangeText={handleChange('street')}
                  onBlur={handleBlur('street')}
                  error={touched.street && errors.street}
                />

                <InputC
                  label='Village'
                  placeholder='Enter Village'
                  mode='outlined'
                  value={values.village}
                  onChangeText={handleChange('village')}
                  onBlur={handleBlur('village')}
                  error={touched.village && errors.village}
                />

                <InputC
                  label='City'
                  placeholder='Enter City'
                  mode='outlined'
                  value={values.city}
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  error={touched.city && errors.city}
                />

                <InputC
                  label='State'
                  placeholder='Enter State'
                  mode='outlined'
                  value={values.state}
                  onChangeText={handleChange('state')}
                  onBlur={handleBlur('state')}
                  error={touched.state && errors.state}
                />

                <InputC
                  label='Pincode'
                  placeholder='Enter Pincode'
                  mode='outlined'
                  value={values.pincode}
                  onChangeText={handleChange('pincode')}
                  onBlur={handleBlur('pincode')}
                  error={touched.pincode && errors.pincode}
                />

                <InputC
                  label='Phone Number'
                  placeholder='Enter Phone Number'
                  mode='outlined'
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  error={touched.phoneNumber && errors.phoneNumber}
                />

                <ButtonC
                  loading={loading}
                  disabled={loading}
                  mode='contained'
                  buttonStyle={{ backgroundColor: colors.secondary, borderRadius: 6, marginTop: 20 }}
                  textColor="white"
                  onPress={handleSubmit}
                  title='Create Address'
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  );
}

export default CreateAddress;
