// import { configureStore } from "@reduxjs/toolkit";
// const store = configureStore({
//     reducer:{},
// });
// export default store;
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";  
import productReducer from "./slices/productSlice";// Import the reducer
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkOutSlice";
import orderReducer from "./slices/orderSlice";
import adminSlice from "./slices/adminSlice";
import adminProductSlice from "./slices/adminProductSlice"
import adminOrderSlice from "./slices/adminOrderSlice"


const store = configureStore({
    reducer: {
        auth: authReducer,  
        products: productReducer,
        cart : cartReducer,
        checkout: checkoutReducer,
        orders: orderReducer,
        admin : adminSlice,
        adminProduct: adminProductSlice,
        adminOrder: adminOrderSlice,
      
    },
});

export default store;
