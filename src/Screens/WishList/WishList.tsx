import React from 'react';
import { View, FlatList, Alert } from 'react-native';
import { GridProduct, Header, Loader, TextCenter } from '../../Components/Components';
import { useDispatch, useSelector } from 'react-redux';
import { getallwishlist, removeFromWishList } from '../../Redux/Actions/WishListAction';
import { singlePress } from '../../Helper/SinglePress';
import styles from './Styles';
import { useTheme, Text } from 'react-native-paper';

const WishList = ({ navigation }: any) => {
    const { loading, wishlistItems } = useSelector((state: any) => state.WISH_LIST);
    const dispatch = useDispatch<any>();
    const { colors } = useTheme();

    // delete wishlist item
    const deletefunction = async (id: string) => {
        try {
            const response = await dispatch(removeFromWishList(id));
            if (response?.success) {
                await dispatch(getallwishlist());
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again later.');
            return
        }
    }

    React.useEffect(() => {
        dispatch(getallwishlist());
    }, [dispatch]);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header
                backAction
                onBackPress={() => navigation.goBack()}
                title="Wish List"
            />
            {
                loading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Loader size="Medium" color="red" />
                    </View>
                ) : wishlistItems?.length > 0 ? (
                    <FlatList
                        data={wishlistItems}
                        numColumns={2}
                        keyExtractor={(item, index) => item?._id?.toString() || index.toString()}
                        renderItem={({ item }) => (
                            <GridProduct
                                navigation={navigation}
                                onPress={() => {
                                    singlePress(() => {
                                        navigation.push('ProductDetails', { id: item?.productId?._id });
                                    });
                                }}
                                source={{ uri: item?.productId?.images[0]?.url }}
                                showContentWithIcon={true}
                                imageStyle={{ width: '100%', resizeMode: 'cover' }}
                                name={item?.productId?.name}
                                price={`₹ ${item?.productId?.sizes[0]?.price}`}
                                deleteOnPress={() => deletefunction(item?._id)}
                            />
                        )}
                    />
                ) : (
                    <TextCenter title="empty wishlist" />
                )
            }
        </View>
    );
}

export default WishList;
