import { combineReducers } from 'redux';

import { darkModeReducer } from './Reducers/DarkReducer'
import { bannerReducer } from './Reducers/BannerReducer'
import { productReducer } from './Reducers/ProductReducer';
import userAuthReducer from './Reducers/UserReducer';
import { cartredu } from './Reducers/CartReducer';
import { wishListReducer } from './Reducers/WishListReducer';
import { addressReducer } from './Reducers/AddressReducer';
import { orderReducer } from './Reducers/OrderReducer';
import { recentlyReducer } from './Reducers/RecentlyReducer';


export const rootReducer = combineReducers({
   DARK_MODE: darkModeReducer,
   BANNER: bannerReducer,
   RECENTLY_VIEWED: recentlyReducer,
   PRODUCT: productReducer,
   USER: userAuthReducer,
   CART: cartredu,
   WISH_LIST: wishListReducer,
   ADDRESS: addressReducer,
   ORDER: orderReducer,
});
