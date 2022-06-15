import {createSlice} from "@reduxjs/toolkit";


const categoriesSlice = createSlice({
    name: 'category',
    initialState: {
      categorySelected: "ALL",
    },
    reducers: {
      categorySelector: (state, actions) => {
        state.categorySelected = actions.payload;
      }
     
    },
  });


export const categoriesActions= categoriesSlice.actions;


export default categoriesSlice;