import React from 'react';
import { View, FlatList } from 'react-native';
import { Header, ListProduct } from '../../Components/Components';
import styles from './Styles';

const Cart = ({ navigation }: any) => {

  const data = [
    { id: 1, name: "Product 1", image: (require("../../Styles/Images/burger.jpg")) },
    { id: 2, name: "Product 2", price: 200, image: require("../../Styles/Images/pizza.jpg") },
    { id: 3, name: "Product 3", price: 300, image: require("../../Styles/Images/momos.jpg") },
  ]
  return (
    <View style={styles.cartContainer}>
      {/* header */}
      <Header
        backAction="true"
        title="Cart"
        onBackPress={() => navigation.goBack()}
      />

      {/* body */}
      <View style={styles.bodyContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListProduct
              source={item.image}
              name={item.name}
              price={item.price}
              showButtonIcon
              cartContainerStyle={{ padding: 16 }}
              showIcon
            />
          )}
        />
      </View>
    </View>
  );
}

export default Cart;
