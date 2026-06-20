import React from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { ButtonC, Header, InputC } from '../../Components/Components';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updatingAddress } from '../../Redux/Actions/AddressAction';
import styles from './Styles';
import { useTheme } from 'react-native-paper';

const UpdateAddress = ({ navigation, route }: any) => {
  const id = route?.params?.id;
  const { addresses } = useSelector((state: any) => state.ADDRESS);
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = React.useState(false);
  const {colors} = useTheme();

  // find data of address to be updated using id
  const addressData = addresses?.find((item: any) => item?._id === id);
  // schema for form validation
  const validationSchema = Yup.object().shape({
    street: Yup.string().required('Street is required'),
    village: Yup.string().required('Village is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    pincode: Yup.string().required('Pincode is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
  });

  // handle update address
  const handleUpdateAddress = async (values: any) => {
    setLoading(true);
    try {
      const response = await dispatch(updatingAddress(id, values));
      if (response?.success) {
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while updating address');
      return;
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Header
        backAction
        onBackPress={() => navigation.goBack()}
        title="Update Address"
      />
      <Formik
        initialValues={{ street: addressData.street || '', village: addressData.village || '', city: addressData.city || '', state: addressData.state || '', pincode: addressData.pincode || '', phoneNumber: addressData.phoneNumber || '' }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          // only selected field update ho to hai baki ka data same hi rahta hai
          const updateFields: any = {};
          if (values.street !== addressData.street) updateFields.street = values.street;
          if (values.village !== addressData.village) updateFields.village = values.village;
          if (values.city !== addressData.city) updateFields.city = values.city;
          if (values.state !== addressData.state) updateFields.state = values.state;
          if (values.pincode !== addressData.pincode) updateFields.pincode = values.pincode;
          if (values.phoneNumber !== addressData.phoneNumber) updateFields.phoneNumber = values.phoneNumber;
          await handleUpdateAddress(updateFields);
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
                  mode='contained'
                  onPress={handleSubmit}
                  title='Update Address'
                  buttonStyle={{ backgroundColor: colors.secondary, borderRadius: 6, marginTop: 20 }}
                  textColor="white"
                  loading={loading}
                  disabled={loading}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  );
}

export default UpdateAddress;
