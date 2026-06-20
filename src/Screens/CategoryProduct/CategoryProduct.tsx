import React from 'react';
import { View, FlatList } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import styles from './Styles';
import { Header, Loader, GridProduct } from '../../Components/Components';
import { useSelector } from 'react-redux';
import { singlePress } from '../../Helper/SinglePress';
// import singlePress from '../../Helper/SinglePress';

const CategoryProduct = ({ navigation, route }: any) => {
    const { category } = route?.params;
    const { colors } = useTheme();
    const { loading, product } = useSelector((state: any) => state.CART);
    // find product from category
    const filteredProduct = Array.isArray(product) ? product.filter((item: any) => item?.name === category) : null;
    return (
        <View style={[styles.CategoryProductContainer, { backgroundColor: colors.background }]}>
            <Header
                backAction="true"
                onBackPress={() => navigation.goBack()}
                title={category}
                search="true"
                cart="true"
                searchOnPress={() => navigation.navigate('SearchScreen')}
            />

            {/* product list */}
            {
                loading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Loader size="Medium" color="red" />
                    </View>
                ) : filteredProduct && filteredProduct.length > 0 ? (
                    <FlatList
                        data={filteredProduct}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingVertical: 16 }}
                        numColumns={2}
                        keyExtractor={(item: any, index: any) => item?._id?.toString() || index.toString()}
                        renderItem={({ item }: any) => (
                            <GridProduct
                                onPress={() => {
                                    singlePress(() => navigation.navigate('ProductDetails', { id: item?._id }))
                                }}
                                showContent={true}
                                source={{ uri: item?.images[0]?.url }}
                                imageStyle={{ width: '100%', height: 180, resizeMode: 'cover' }}
                                name={item?.name}
                                price={item?.sizes[0]?.price}
                                category={item?.category}
                            />
                        )}
                    />
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text variant='titleLarge' style={{ color: colors.onBackground, fontWeight: 'bold' }}>No Product Found</Text>
                    </View>
                )
            }
        </View>
    );
}

export default CategoryProduct;
