import React from 'react';
import { View, FlatList } from 'react-native';
import styles from './Styles';
import { Header, Carousel, Slider, GridProduct, Loader, RecentlyC } from '../../../src/Components/Components';
import { useDispatch, useSelector } from 'react-redux';
import { singlePress } from '../../Helper/SinglePress';
import { useTheme } from 'react-native-paper';
import { bannerData } from '../../Redux/Actions/BannerAction';
import { getProductData } from '../../Redux/Actions/ProductAction';
import { getProfile } from '../../Redux/Actions/UserAction';
import { getDarkMode, setDarkMode } from '../../Redux/Actions/DarkAction';
import { createRecently, getRecently } from '../../Redux/Actions/RecentlyAction';

const Home = ({ navigation }: any) => {
  const { darkMode } = useSelector((state: any) => state.DARK_MODE);
  const { banner } = useSelector((state: any) => state.BANNER);
  const { recently } = useSelector((state: any) => state.RECENTLY_VIEWED);
  const { user } = useSelector((state: any) => state.USER);
  const { loading, product } = useSelector((state: any) => state.PRODUCT)
  const dispatch = useDispatch<any>();
  const [refreshing, setRefreshing] = React.useState(false);
  const { colors } = useTheme();

  // refresh products on pull down
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getRecently())
    dispatch(getProductData()).then(() => setRefreshing(false));
  }, [dispatch]);

  // handle switch dark mode
  const handleSwitch = () => {
    dispatch(setDarkMode());
  };

  // handle recently viewed product
  const handleRecently = (id: any) => {
    dispatch(createRecently(id));
  };


  React.useEffect(() => {
    dispatch(getDarkMode())
    dispatch(getRecently())
    dispatch(getProfile())
    dispatch(getProductData());
    dispatch(bannerData());
  }, [dispatch]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* header */}
      <Header
        avatar="true"
        avatarOnPress={() => navigation.navigate('Account')}
        avatarSource={{ uri: user?.picture?.url }}
        showSwitch="true"
        value={darkMode}
        onValueChange={handleSwitch}
        hTitle="true"
        search="true"
        searchOnPress={() => navigation.navigate('SearchScreen')}
      />

      {/* product grid */}
      {
        loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Loader size="Medium" color="red" />
          </View>
        ) : (
          <FlatList
            data={product}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={onRefresh}
            keyExtractor={(item, index) => item?._id?.toString() || index.toString()}
            ListHeaderComponent={
              <View>
                {/* carousel */}
                <Carousel autoPlay={true} data={banner} carouselContainer={{ paddingHorizontal: 10 }} carouselImageContainer={{ borderRadius: 10 }} />

                {/* recently viewed */}
                {
                  recently?.length > 0 && (
                    <RecentlyC data={recently} navigation={navigation} />
                  )
                }

                {/* slider */}
                <Slider navigation={navigation} />
              </View>
            }
            renderItem={({ item }) => (
              <GridProduct
                navigation={navigation}
                onPress={() => {
                  singlePress(() => {
                    navigation.push('ProductDetails', { id: item?._id });
                    handleRecently(item?._id);
                  });
                }}
                source={{ uri: item?.images[0]?.url }}
                showContent={true}
                imageStyle={{ width: '100%', height: 180, resizeMode: 'cover' }}
                name={item?.name}
                price={`₹ ${item?.sizes[0]?.price}`}
                category={item?.category}
              />
            )}
          />
        )
      }
    </View>
  );
}

export default Home;
