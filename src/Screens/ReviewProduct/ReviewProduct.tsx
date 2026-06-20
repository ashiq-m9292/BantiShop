import React from 'react';
import { Alert, FlatList, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import styles from './Styles';
import { Header, DefaultAddress, ListProduct, PriceChart } from '../../Components/Components';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddress } from '../../Redux/Actions/AddressAction';
import BottomContainer from '../../Components/BottomContainer';

const ReviewProduct = ({ navigation, route }: any) => {
    const { id, selectedSize, type, cart } = route?.params;
    const { colors } = useTheme();
    const [quantity, setQuantity] = React.useState(1);
    const { product } = useSelector((state: any) => state.PRODUCT);
    const { addresses } = useSelector((state: any) => state.ADDRESS);
    const dispatch = useDispatch<any>();
    // find product data from id
    const productData = Array.isArray(product) ? product.find((item: any) => item._id === id) : null;
    // find default address
    const defaultData = Array.isArray(addresses) ? addresses.find((item: any) => item?.isDefault === true) : null;

    const cartItemPrice = Array.isArray(cart) ? cart.reduce((total: any, item: any) => {
        return total + (item?.price || 0) * (item?.quantity || 0);
    }, 0) : 0;
    const productItemPrice = selectedSize ? selectedSize?.price * quantity : productData?.sizes[0]?.price;
    // delivery charges 
    const deliveryCharges = type === 'product' ? productItemPrice >= 200 ? 0 : 20 : cartItemPrice >= 200 ? 0 : 20
    const totalPrice = type === 'product' ? productItemPrice + deliveryCharges : cartItemPrice + deliveryCharges

    // increase quantity
    const increaseQuantity = () => {
        if (quantity < 10) {
            setQuantity(quantity + 1);
        }
    }
    // decrease quantity
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // handle checkout
    const handleCheckout = () => {
        if (!defaultData) {
            Alert.alert('Error', 'Please add address');
            navigation.navigate('Address');
            return;
        } else {
            navigation.navigate('Payment', {
                type: type,
                id: id,
                selectedSize: selectedSize,
                quantity: quantity,
                productItemPrice: productItemPrice,
                cart: cart,
                cartItemPrice: cartItemPrice,
                deliveryCharges: deliveryCharges,
                totalPrice: totalPrice
            });
        }
    };

    React.useEffect(() => {
        dispatch(getUserAddress());
    }, [dispatch]);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header
                backAction="true"
                onBackPress={() => navigation.goBack()}
                title="Review Product"
            />

            {/* default address container */}
            < DefaultAddress
                showHanding={true}
                heading="Deliver To :"
                oneText={defaultData ? defaultData?.street : 'please  add address'}
                twoText={defaultData ? defaultData?.village : 'please  add address'}
                threeText={defaultData ? defaultData?.pincode : 'please  add address'}
                onPress={() => navigation.navigate('Address')}
                onPressText={defaultData ? 'Change' : 'Add'}
            />

            {
                type === 'cart' && (
                    <FlatList
                        data={cart}
                        keyExtractor={(item, index) => item?._id?.toString() || index.toString()}
                        contentContainerStyle={{ paddingBottom: 80 }}
                        renderItem={({ item }) => (
                            <ListProduct
                                source={{ uri: item?.productId?.images[0]?.url }}
                                name={item?.productId?.name}
                                // find cart size price
                                price={`₹${item?.price}`}
                                category={`Size: ${item?.size}`}
                                cartContainerStyle={{ padding: 10 }}
                                imageStyle={{ width: '60%', height: 140 }}
                                cartQuantity={`Quantity: ${item?.quantity}`}
                            />
                        )}
                    />
                )}


            {
                type === 'product' && (
                    <ListProduct
                        source={{ uri: productData?.images[0]?.url }}
                        name={productData?.name}
                        price={selectedSize ? `₹${selectedSize?.price}` : `₹${productData?.sizes[0]?.price}`}
                        category={`Size: ${selectedSize ? selectedSize?.size : productData?.sizes[0]?.size}`}
                        cartContainerStyle={{ padding: 10 }}
                        imageStyle={{ width: '60%', height: 140 }}
                        showButtonIcon={true}
                        quantity={quantity}
                        minusonPress={decreaseQuantity}
                        plusonPress={increaseQuantity}
                    />
                )
            }

            {
                type === 'product' && (
                    <PriceChart
                        textone="Price"
                        texttwo="Delivery Charge"
                        textthree="Discount"
                        textfour="Total"
                        text_one={`₹ ${selectedSize ? selectedSize?.price : productData?.sizes[0]?.price}`}
                        text_two={deliveryCharges === 0 ? 'Free' : `₹ ${deliveryCharges}`}
                        text_three={`₹ ${selectedSize ? selectedSize?.discount : null} `}
                        text_four={`₹ ${totalPrice}`}
                    />
                )
            }




            {/* bottom container */}
            <BottomContainer
                totlPrice={totalPrice}
                onPress={handleCheckout}
            />
        </View>
    );
}

export default ReviewProduct;
