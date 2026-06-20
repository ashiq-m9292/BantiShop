import React from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import styles from './Styles';
import { useSelector } from 'react-redux';
import { Header } from '../../Components/Components';
import Icon from '@react-native-vector-icons/material-design-icons';



const OrderDetails = ({ navigation, route }: any) => {
  const { orderId, productId } = route.params;
  const { orders } = useSelector((state: any) => state.ORDER);
  const { colors } = useTheme()

  // find order details 
  const orderData = Array.isArray(orders) ? orders.find((item: any) => item._id === orderId) : null;
  if (!orderData) return null
  // find product details 
  const productData = Array.isArray(orderData?.products) ? orderData?.products.find((item: any) => item.productId === productId) : null;
  if (!productData) return null

  // handle navigate to product details
  const handleProductDetails = (id: any) => {
    navigation.navigate('ProductDetails', { id: id });
  };

  // order status 
  const trackingOrderStatus = [
    {
      id: 1,
      name: 'placed'
    },
    {
      id: 2,
      name: 'shipped'
    },
    {
      id: 3,
      name: 'delivered'
    },
  ]

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        backAction="true"
        onBackPress={() => navigation.goBack()}
        title="Order Details"
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>

        {/* first product details container */}
        <TouchableOpacity style={[styles.firstcontaier, { backgroundColor: colors.background }]} activeOpacity={0.6} onPress={() => handleProductDetails(orderData?.products[0]?.productId)}>
          <Image
            source={{ uri: productData?.image?.url }}
            style={styles.imageStyle}
          />
          <View style={styles.firstcontainerChild}>
            <Text>#{orderData?._id}</Text>
            <Text>Name: {productData?.name}</Text>
            <Text>price: {productData?.price}</Text>
            <Text>Size: {productData?.size}</Text>
            <Text>Quantity: {productData?.quantity}</Text>
          </View>
        </TouchableOpacity>

        {/* second address container */}
        <View style={[styles.secondcontainer, { backgroundColor: colors.background }]}>
          <Text variant='titleMedium'>Street: {orderData?.address?.street}</Text>
          <Text variant='titleMedium'>Village: {orderData?.address?.village}</Text>
          <Text variant='titleMedium'>Pin Code: {orderData?.address?.pincode}</Text>
          <Text variant='titleMedium'>City: {orderData?.address?.city}</Text>
          <Text variant='titleMedium'>State: {orderData?.address?.state}</Text>
          <Text variant='titleMedium'>Phone Number: {orderData?.address?.phoneNumber}</Text>
        </View>

        {
          trackingOrderStatus?.map((item: any, index: any) => (
            <View key={index} style={[styles.thirdcontainer, { backgroundColor: colors.background }]}>
              <Text variant='titleLarge' style={{ fontWeight: 'bold', color: colors.primary }}>{item?.name} </Text>
              <Icon name={item?.name === orderData?.orderStatus ? 'check-circle' : 'blank'} size={24} color={colors.secondary} />
            </View>
          ))
        }
        {/* total price and cod */}
        <View style={[styles.fourthContainer, { backgroundColor: colors.background }]}>
          <Text variant='titleLarge' style={{ fontWeight: 'bold', color: colors.secondary }}>Total Price:    ₹{orderData?.totalAmount}</Text>
          <Text variant='titleLarge' style={{ fontWeight: 'bold', color: colors.secondary }}>payment Status: {orderData?.paymentStatus}</Text>
        </View>

      </ScrollView>
    </View>
  );
}

export default OrderDetails;
