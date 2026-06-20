import React from 'react';
import { View, FlatList, Alert, Dimensions } from 'react-native';
import styles from './Styles';
import { ButtonC, Carousel, Header, ListProduct, ProductSizeC, DefaultAddress } from '../../Components/Components';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, allCartItems, removeFromCart } from '../../Redux/Actions/CartAction';
import { singlePress } from '../../Helper/SinglePress';
import { getUserAddress } from '../../Redux/Actions/AddressAction';
import { Text, useTheme } from 'react-native-paper';
import { getProductData } from '../../Redux/Actions/ProductAction';
import { createRecently } from '../../Redux/Actions/RecentlyAction';



const ProductDetails = ({ navigation, route }: any) => {
  const id = route?.params?.id;
  const { colors } = useTheme();
  const { product } = useSelector((state: any) => state.PRODUCT)
  const { cart } = useSelector((state: any) => state.CART);

  const dispatch = useDispatch<any>();
  const [loading, setLoading] = React.useState<boolean>(false);
  // selected size
  const [selectedSize, setSelectedSize] = React.useState<any>(null);
  // find product 
  const productData = Array.isArray(product) ? product.find((item: any) => item._id === id) : null;
  const imageData = Array.isArray(productData?.images) ? productData?.images : [];
  // filter current product 
  const currentProduct = Array.isArray(product) ? product.filter((item: any) => item._id !== id) : null;
  // get cart id 
  const cartId = Array.isArray(cart) ? cart.find((item: any) => item?.productId?._id === id)?._id : null;

  // check if product is in cart
  const isIncart = () => {
    if (!Array.isArray(cart)) {
      return false;
    }
    if (!id) {
      return false;
    }
    return cart?.some((item: any) => item?.productId?._id === id);
  }

  // add to cart
  const addToCartHandler = async () => {
    setLoading(true);
    try {
      if (isIncart()) {
        await dispatch(removeFromCart(cartId));
      } else {
        if (!selectedSize?.size) {
          Alert.alert('Error', 'Please select a size');
          return;
        }
        await dispatch(addToCart(id, selectedSize?.size, selectedSize.price));
      }
      await dispatch(allCartItems());
      setSelectedSize(null);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
      return
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  // handle navigate
  const buyNowHandler = () => {
    if (!selectedSize || !selectedSize?.size || selectedSize === null) {
      Alert.alert('Error', 'Please select a size');
      return;
    };
    navigation.navigate('ReviewProduct', { type: 'product', id: id, selectedSize: selectedSize });
  };

  // handle recently viewed product
  const handleRecently = (id: any) => {
    dispatch(createRecently(id));
  };

  // fetch products and cart items on component mount
  React.useEffect(() => {
    dispatch(getProductData());
    dispatch(allCartItems());
    dispatch(getUserAddress());
  }, [dispatch]);

  return (
    <View style={[styles.productContainer, { backgroundColor: colors.background }]}>
      {/* header */}
      <Header
        backAction="true"
        onBackPress={() => navigation.goBack()}
        title="Product Details"
        cart="true"
        cartOnPress={() => navigation.navigate('Bottom', { screen: 'Cart' })}
        badge={cart?.length}
      />

      {/* body */}
      <View style={[styles.bodyContainer, { backgroundColor: colors.background }]}>
        <FlatList
          contentContainerStyle={{ overflow: 'visible' }}
          data={currentProduct}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item?._id?.toString() || index.toString()}
          ListHeaderComponent={
            <View>
              <Carousel
                data={imageData}
                autoPlay={true}
                carouselImageContainer={{ height: 300 }}
                dotsContainer={{ position: 'absolute', bottom: 200 }}
              />

              <ProductSizeC
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                sizes={productData?.sizes}
                sizeTitle="Size"
                name={productData?.name}
                price={selectedSize ? `₹${selectedSize?.price}` : `₹${productData?.sizes[0]?.price}`}
                discription={productData?.description}
              />

              <ButtonC
                title={isIncart() ? 'Remove From Cart' : 'Add To Cart'}
                mode="outlined"
                loading={loading}
                disabled={loading}
                textColor={colors.secondary}
                buttonStyle={{ margin: 10, borderRadius: 10 }}
                onPress={addToCartHandler}
              />

              <ButtonC
                title="Buy Now"
                mode="contained"
                textColor={colors.secondary}
                buttonStyle={{ margin: 10, borderRadius: 10 }}
                onPress={buyNowHandler}
              />

              <Text variant="titleLarge" style={styles.similarProduct}>Similar Products</Text>
            </View>
          }
          renderItem={({ item }) => (
            <ListProduct
              onPress={() => {
                singlePress(() => {
                  navigation.push('ProductDetails', { id: item?._id });
                  handleRecently(item?._id);
                });
              }}
              source={{ uri: item?.images[0]?.url }}
              name={item?.name}
              price={`₹ ${item?.sizes[0]?.price}`}
              category={item?.category}
              cardContainerCopy={{ margin: 10 }}
              cartContainerStyle={{ padding: 10 }}
              imageStyle={{ width: '60%', height: 140 }}
            />
          )}
        />
      </View>
    </View>
  );
}

export default ProductDetails;
