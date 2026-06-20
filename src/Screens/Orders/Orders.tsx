import React from 'react';
import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Header, Loader } from '../../Components/Components';
import styles from './Styles';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrder } from '../../Redux/Actions/OrderAction';

const Orders = ({ navigation }: any) => {
  const { loading, orders } = useSelector((state: any) => state.ORDER);
  const dispatch = useDispatch<any>();
  const { colors } = useTheme();

  // handle navigate to order details
  const handleOrderDetails = (orderId: any, id: any) => {
    navigation.navigate('OrderDetails', { orderId: orderId, productId: id });
  };


  // one list in all products using flatmap
  const safeMode = Array.isArray(orders) ? orders : [];
  const allOrders = safeMode.flatMap((order: any) => order.products.map((product: any) => ({
    ...product,
    orderId: order._id,
    orderStatus: order?.orderStatus,
    readableTime: order?.readableTime,
    totalAmount: order?.totalAmount
  })))

  // get user orders
  React.useEffect(() => {
    dispatch(getUserOrder());
  }, [dispatch])
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        backAction="true"
        onBackPress={() => navigation.goBack()}
        title="My Orders"
      />

      {
        loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Loader size="Medium" color="red" />
          </View>
        ) : orders?.length > 0 ? (
          <FlatList
            data={allOrders}
            keyExtractor={(item: any, index: any) => `${item.orderId}-${item._id}`}
            renderItem={({ item }: any) => (
              <View style={[styles.mainContainer, { backgroundColor: colors.background }]}>
                <View style={styles.bodyContainer}>
                  <View style={styles.leftContainer}>
                    <Text variant='titleSmall' style={{ fontWeight: 'bold', color: colors.onBackground }}>#{item?.orderId}</Text>
                    <Text variant='titleSmall' style={{ fontWeight: 'bold', color: colors.onBackground }}>{item?.readableTime}</Text>
                  </View>
                  <View style={styles.rightContainer}>
                    <Text variant='titleSmall' style={{ fontWeight: 'bold', color: colors.primary }}>{item?.orderStatus}</Text>
                    <Text variant='titleSmall' style={{ fontWeight: 'bold', color: colors.onBackground }}>₹ {item?.price}</Text>
                  </View>
                </View>
                <TouchableOpacity activeOpacity={0.6} onPress={() => handleOrderDetails(item?.orderId, item?.productId)}>
                  <Text variant='titleMedium' style={{ fontWeight: 'bold', color: colors.secondary }}>Track Order</Text>
                </TouchableOpacity>
              </View>
            )}

          />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text variant='titleMedium' style={{ fontWeight: 'bold', color: colors.onBackground }}>No orders found</Text>
          </View>
        )
      }
    </View>
  );
}

export default Orders;
