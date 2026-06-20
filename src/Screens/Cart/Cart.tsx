import React from 'react';
import { View, FlatList, Alert, ToastAndroid } from 'react-native';
import { ButtonC, Header, ListProduct, Loader, TextCenter } from '../../Components/Components';
import styles from './Styles';
import { useDispatch, useSelector } from 'react-redux';
import { allCartItems, decreaseQuantity, increaseQuantity, removeFromCart } from '../../Redux/Actions/CartAction';
import { useTheme } from 'react-native-paper';
import { singlePress } from '../../Helper/SinglePress';
import { addToWishList, getallwishlist } from '../../Redux/Actions/WishListAction';
import BottomContainer from '../../Components/BottomContainer';

const Cart = ({ navigation }: any) => {
  const { loading, cart } = useSelector((state: any) => state.CART);
  const { wishlistItems } = useSelector((state: any) => state.WISH_LIST);
  const dispatch = useDispatch<any>();
  const { colors } = useTheme();

  // check if cart item is in wishlist
  const isInWishlist = (item: any) => {
    // check if wishlistItems is an array
    if (!Array.isArray(wishlistItems)) {
      return false;
    }
    // get product id from cart item
    const id = item?.productId?._id;
    if (!id) {
      return false;
    }
    // check if product id is in wishlist items
    return wishlistItems?.some((wishlistItem: any) => wishlistItem?.productId?._id === id);
  };

  // increase quantity of cart item
  const plusFunction = async (item: any) => {
    try {
      const newQty = item?.quantity + 1;
      if (newQty === 11) {
        return
      } else {
        await dispatch(increaseQuantity(item?._id, newQty));
      }
    } catch (error) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      return
    }
  };

  // decrease quantity of cart item
  const minusFunction = async (item: any) => {
    try {
      const newQty = item?.quantity - 1;
      if (newQty === 0) {
        return
      } else {
        await dispatch(decreaseQuantity(item?._id, newQty));
      }
    } catch (error) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      return
    }
  };

  // delete cart item
  const deleteCartItem = async (item: any) => {
    try {
      const response = await dispatch(removeFromCart(item?._id));
      if (response?.success) {
        await dispatch(allCartItems());
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
      return
    }
  };

  // add to wishlist function
  const createWishlistFunction = async (item: any) => {
    try {
      const response = await dispatch(addToWishList(item?.productId));
      if (response?.success) {
        await dispatch(getallwishlist());
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
      return
    }
  };

  // total price
  const totalPrice = Array.isArray(cart) ? cart.reduce((total: any, item: any) => {
    return total + (item?.price || 0) * (item?.quantity || 0);
  }, 0) : 0;


  // handle navigate to product details
  const handleCartDetails = () => {
    if (!cart || cart?.length === 0) return
    navigation.navigate('ReviewProduct', { type: 'cart', cart: cart });
  };

  // fetch all cart items
  React.useEffect(() => {
    dispatch(allCartItems());
    dispatch(getallwishlist());
  }, [dispatch]);

  return (
    <View style={[styles.cartContainer, { backgroundColor: colors.background }]}>
      {/* header */}
      <Header
        backAction="true"
        title="Cart"
        onBackPress={() => navigation.goBack()}
      />

      {/* body */}
      <View style={[styles.bodyContainer, { backgroundColor: colors.background }]}>
        {
          loading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
              <Loader size="Medium" color="red" />
            </View>
          ) : cart?.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{ marginBottom: 60 }}
              data={cart}
              renderItem={({ item }) => (
                <ListProduct
                  source={{ uri: item?.productId?.images[0]?.url }}
                  imageStyle={{ width: '50%', height: 100, resizeMode: 'cover' }}
                  name={item?.productId?.name}
                  price={`₹${item?.price}`}
                  category={`size: ${item?.size}`}
                  onPress={() => singlePress(() => navigation.navigate('ProductDetails', { id: item?.productId?._id }))}
                  showButtonIcon
                  minusonPress={() => minusFunction(item)}
                  quantity={item?.quantity}
                  plusonPress={() => plusFunction(item)}
                  cartContainerStyle={{ padding: 16 }}
                  showIcon
                  cartOnPress={() => deleteCartItem(item)}
                  heartOnPress={isInWishlist(item) ? () => Alert.alert('Already in wishlist') : () => createWishlistFunction(item)}
                  color={isInWishlist(item) ? 'red' : 'gray'}
                />
              )}
            />
          ) : (
            <TextCenter title="empty cart" />
          )
        }
      </View>

      {/* footer */}
      <BottomContainer
        loading={loading}
        disabled={loading}
        totlPrice={totalPrice ? totalPrice : null}
        onPress={handleCartDetails}
      />
    </View>
  );
}

export default Cart;
