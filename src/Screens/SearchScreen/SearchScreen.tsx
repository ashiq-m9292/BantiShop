import React from 'react';
import { View, FlatList } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import styles from './Styles';
import { InputC, GridProduct, Loader } from '../../Components/Components';
import { useDispatch, useSelector } from 'react-redux';
import { singlePress } from '../../Helper/SinglePress';
import { getSearchProducts } from '../../Redux/Actions/ProductAction';



const SearchScreen = ({ navigation }: any) => {
    const { colors } = useTheme();
    const { loading, product } = useSelector((state: any) => state.PRODUCT);
    const dispatch = useDispatch<any>();
    const [search, setSearch] = React.useState('');

    // handle search 
    const handleSearch = () => {
        const query = search.trim();
        if (!query) return
        dispatch(getSearchProducts({ keyword: query }));
    }

    // React.useEffect(() => {
    //     const timer = setTimeout(() => {
    //         if (!search.trim()) return;
    //         dispatch(getSearchProducts(search));
    //     }, 300); 

    //     return () => clearTimeout(timer);
    // }, [search]);

    return (
        <View style={[styles.searchScreenContainer, { backgroundColor: colors.background }]}>
            {/* header with search */}
            <View style={[styles.headerContainer, { backgroundColor: colors.background }]}>
                <InputC
                    placeholder="Search"
                    mode="outlined"
                    value={search}
                    onChangeText={setSearch}
                    autoFocus
                    onSubmitEditing={() => handleSearch()}
                />
            </View>

            {/* product grid */}
            {
                loading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Loader size="Medium" color="red" />
                    </View>
                ) : search.trim() && product?.length > 0 ? (
                    <FlatList
                        data={product}
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
                        <Text variant='titleMedium' style={{ color: colors.onBackground, fontWeight: 'bold' }}>{product?.length === undefined ? 'Product not found' : 'Please search for a product'}</Text>
                    </View>
                )
            }
        </View>
    );
}

export default SearchScreen;
