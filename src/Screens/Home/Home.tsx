import React from 'react';
import { View, FlatList } from 'react-native';
import styles from './Styles';
import { Header, Carousel, Slider, GridProduct } from '../../../src/Components/Components';

const Home = ({ navigation }: any) => {
  const data = [
    { id: 1, name: "Product 1", image: (require("../../Styles/Images/burger.jpg")) },
    { id: 2, name: "Product 2", price: 200, image: require("../../Styles/Images/pizza.jpg") },
    { id: 3, name: "Product 3", price: 300, image: require("../../Styles/Images/momos.jpg") },
  ]
  return (
    <View style={styles.container}>
      <Header
        avatar="true"
        title="Banti Shop"
        showSwitch="true"
        search="true"
        cart="true"
      />
      <FlatList
        data={data}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Carousel sliderData={data} />
            <Slider />
          </View>
        }
        renderItem={({ item }) => (
          <GridProduct
            navigation={navigation}
            onPress={() => navigation.push('ProductDetails', { id: item.id })}
            source={item.image}
            name={item.name}
            price={`₹ ${item.price}`}
            description={item.id}
          />
        )}
      />
    </View>
  );
}

export default Home;
