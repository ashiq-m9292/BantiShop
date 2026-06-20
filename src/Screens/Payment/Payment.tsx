import React from 'react';
import { Alert, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import styles from './Styles';
import { Header } from '../../Components/Components';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../Redux/Actions/OrderAction';
import BottomContainer from '../../Components/BottomContainer';

const Payment = ({ navigation, route }: any) => {
  const { type, id, selectedSize, quantity, productItemPrice, cart, cartItemPrice, deliveryCharges, totalPrice } = route?.params;
  const { colors } = useTheme();
  const { product } = useSelector((state: any) => state.CART);
  const productData = Array.isArray(product) ? product.find((item: any) => item._id === id) : null;
  const { addresses } = useSelector((state: any) => state.ADDRESS);
  const defaultData = Array.isArray(addresses) ? addresses.find((item: any) => item?.isDefault === true) : null;
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch<any>();
  const [checked, setChecked] = React.useState("");

  // order data 
  const orderData = {
    address: {
      street: defaultData?.street,
      village: defaultData?.village,
      city: defaultData?.city,
      state: defaultData?.state,
      pincode: defaultData?.pincode,
      phoneNumber: defaultData?.phoneNumber
    },
    products: type === 'cart' ? cart.map((item: any) => ({
      productId: item?.productId?._id,
      name: item?.productId?.name,
      price: item?.price,
      quantity: item?.quantity,
      size: item?.size,
      image: item?.productId?.images[0],
    })) : [{
      productId: id,
      name: productData?.name,
      price: selectedSize?.price,
      quantity: quantity,
      size: selectedSize?.size,
      image: productData?.images[0],
    }],
    itemTotal: type === 'product' ? productItemPrice : cartItemPrice,
    deliveryCharges: deliveryCharges,
    totalAmount: totalPrice
  };

  // place order
  const placeOrder = async () => {
    if (!checked) {
      Alert.alert('Error', 'Please select payment method.');
      return
    } else if (checked === "ONLINE") {
      Alert.alert('Error', 'Online payment is not available.');
      return
    }
    setLoading(true);
    try {
      const response = await dispatch(createOrder(orderData));
      if (response?.success) {
        navigation.replace('Thanks');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
      return
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        backAction='true'
        onBackPress={() => navigation.goBack()}
        title='Payment'
      />

      {/* body container */}
      <Text variant='titleLarge' style={{ marginHorizontal: 10, marginVertical: 14, color: colors.primary, fontWeight: 'bold' }}>Select Payment Method</Text>
      <View style={[styles.bodyContainer, { backgroundColor: colors.background }]}>
        {/* cash on delivery */}
        <View style={[styles.Codcontainer, { backgroundColor: colors.background }]}>
          <Text variant='titleMedium' style={{ fontWeight: 'bold', color: colors.primary }}>₹ {totalPrice}</Text>
          <Text variant='titleSmall' style={{ fontWeight: 'bold', color: colors.onBackground }}>Cash on Delivery</Text>
          <BouncyCheckbox
            size={25}
            fillColor='green'
            iconStyle={{ borderColor: "green" }}
            innerIconStyle={{ borderWidth: 2 }}
            isChecked={checked === "COD"}
            onPress={() => {
              if (checked === "COD") {
                setChecked("");
              } else {
                setChecked("COD");
              }
            }}
          />
        </View>

        {/* online payment */}
        <View style={styles.Codcontainer}>
          <Text variant='titleMedium' style={{ fontWeight: 'bold', color: colors.primary }}>₹ {totalPrice}</Text>
          <Text variant='titleSmall' style={{ fontWeight: 'bold', color: colors.onBackground }}>Online Payment</Text>
          <BouncyCheckbox
            size={25}
            fillColor='green'
            iconStyle={{ borderColor: "green" }}
            innerIconStyle={{ borderWidth: 2 }}
            isChecked={checked === "ONLINE"}
            onPress={() => {
              if (checked === "ONLINE") {
                setChecked("");
              } else {
                setChecked("ONLINE");
              }
            }}
          />
        </View>
      </View>

      {/* bottom container */}
      <BottomContainer
        loading={loading}
        disabled={loading}
        totlPrice={totalPrice}
        onPress={placeOrder}
      />
    </View>
  );
}

export default Payment;
