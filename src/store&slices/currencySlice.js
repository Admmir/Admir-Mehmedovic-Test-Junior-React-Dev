import {createSlice} from "@reduxjs/toolkit";


const currencySlice = createSlice({
    name: 'currency',
    initialState: {
      currencySelected : "USD",
      currencySymbol : "$",
      currencyDropdownIsShown : false
    },
    reducers: {
      currencySelector: (state, actions) => {
        state.currencySelected = actions.payload;
      },
      symbolSelector: (state, actions) => {
        state.currencySymbol = actions.payload;
      },
      currencyDropdownClose : (state, actions )=>{
        state.currencyDropdownIsShown = false;
      },
      currencyDropdownOpen : (state) => {
        state.currencyDropdownIsShown = true;
      }
    },
  });


export const currencyActions= currencySlice.actions;


export default currencySlice;