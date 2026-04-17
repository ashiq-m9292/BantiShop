import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './Styles';
import { ButtonC, Carousel, Header, ListProduct, ProductSizeC } from '../../Components/Components';

const ProductDetails = ({ navigation, route }: any) => {
  const id = route?.params?.id;

  const data = [
    { id: 1, name: "Product 1", image: (require("../../Styles/Images/burger.jpg")) },
    { id: 2, name: "Product 2", price: 200, image: require("../../Styles/Images/pizza.jpg") },
    { id: 3, name: "Product 3", price: 300, image: require("../../Styles/Images/momos.jpg") },
  ]
  return (
    <View style={styles.productContainer}>
      {/* header */}
      <Header
        backAction="true"
        onBackPress={() => navigation.goBack()}
        title="Product Details"
        search="true"
        cart="true"
      />

      {/* body */}
      <View style={styles.bodyContainer}>
        <FlatList
          data={data}
          ListHeaderComponent={
            <View>
              <Carousel sliderData={data} />
              <ProductSizeC selectedSize="Selected Size" name="Product Name" price="₹ 55" />
              <ButtonC title="Add to Cart" mode="outlined" buttonStyle={{ margin: 10, borderRadius: 10 }} onPress={() => {
              }} />
              <ButtonC title="Buy Now" mode="contained" buttonStyle={{ margin: 10, borderRadius: 10 }} onPress={() => {
              }} />
            </View>
          }
          renderItem={({ item }) => (
            <ListProduct
              onPress={() => navigation.push('ProductDetails', { id: item.id })}
              source={item.image}
              name={item.name}
              price={item.price}
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
