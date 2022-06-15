import {createSlice} from "@reduxjs/toolkit";


const productsCardSlice = createSlice({
    name: 'product',
    initialState: {
        productSelected: "huarache-x-stussy-le",
    },
    reducers: {
        productSelector: (state, actions) => {
        state.productSelected = actions.payload;
      },
    },
  });


export const productsActions= productsCardSlice.actions;


export default productsCardSlice;