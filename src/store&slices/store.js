import categoriesSlice from "./categoriesSlice.js";
import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "./currencySlice.js";
import productsCardSlice from "./productsCardSlice.js";
import cartItemsSlice from "./cartItemsSlice.js";

const store = configureStore({
  reducer: {
    categoryReducer: categoriesSlice.reducer,
    currencyReducer: currencySlice.reducer,
    cardReducer: productsCardSlice.reducer,
    cartItemsReducer: cartItemsSlice.reducer,
  },
});

export default store;
