import { createSlice } from "@reduxjs/toolkit";

const cartItemsSlice = createSlice({
  name: "cart",
  initialState: {
    itemsSelected: [],
    quantity: 0,
    totalPrice: 0,
    paid: false,
  },
  reducers: {
    addItemToCart: (state, actions) => {
      let quantity = 0;
      const addQuantity = (item) => (quantity = item);
      let selectedAttributes = JSON.stringify(actions.payload.attributes);
      const index = state.itemsSelected.findIndex(
        (item) =>
          JSON.stringify(item.attributes) === selectedAttributes &&
          item.id === actions.payload.id &&
          addQuantity(item.quantity)
      );
      if (index === -1) {
        state.itemsSelected = [
          ...state.itemsSelected.map((item) => item),
          {
            id: actions.payload.id,
            quantity: Number(1),
            attributes: actions.payload.attributes,
            price: actions.payload.price,
          },
        ];
      } else {
        state.itemsSelected = [
          ...state.itemsSelected.slice(0, index),
          {
            id: actions.payload.id,
            quantity: Number(quantity) + 1,
            attributes: actions.payload.attributes,
            price: actions.payload.price,
          },
          ...state.itemsSelected.slice(index + 1),
        ];
      }
      let totalPrice = 0;
      state.itemsSelected.map(
        (item) => (totalPrice += item.price * item.quantity)
      );
      state.totalPrice = totalPrice.toFixed(2);
      state.quantity = state.itemsSelected
        .map((item) => item.quantity)
        .reduce((quantityA, quantityB) => {
          if (state.itemsSelected.length <= 1) {
            return quantityB;
          } else {
            return quantityB + quantityA;
          }
        });
      state.itemsSelected = state.itemsSelected.filter(
        (item) => item.quantity > 0
      );
      state.paid = false;
    },
    //Adds item to cart for first time
    addTotals: (state) => {
      let totalPrice = 0;
      state.itemsSelected.map(
        (item) => (totalPrice += item.price * item.quantity)
      );
      state.totalPrice = totalPrice.toFixed(2);
    },
    checkOut: (state) => {
      state.itemsSelected = [];
      state.totalPrice = 0;
      state.quantity = 0;
      state.paid = true;
    },
    addQuantity: (state, actions) => {
      let quantity = 0;
      const addQuantity = (Item) => (quantity = Item);
      const index = state.itemsSelected.findIndex(
        (items) =>
          JSON.stringify(items.attributes) ===
            JSON.stringify(actions.payload.item.attributes) &&
          items.id === actions.payload.id &&
          addQuantity(items.quantity)
      );
      state.itemsSelected = [
        ...state.itemsSelected.slice(0, index),
        {
          id: actions.payload.id,
          quantity: quantity + 1,
          attributes: actions.payload.item.attributes,
          price: actions.payload.value,
        },
        ...state.itemsSelected.slice(index + 1),
      ];
      let totalPrice = 0;
      state.totalPrice = state.itemsSelected.map(
        (item) => (totalPrice += item.price * item.quantity)
      );

      state.quantity = state.itemsSelected
        .map((item) => item.quantity)
        .reduce((quantityA, quantityB) => {
          if (state.itemsSelected.length <= 1) {
            return quantityB;
          } else {
            return quantityB + quantityA;
          }
        });
      state.totalPrice = totalPrice.toFixed(2);
    },
    //Adds or removes quantity
    removeQuantity: (state, actions) => {
      let quantity = 0;
      const addQuantity = (Item) => (quantity = Item);
      const index = state.itemsSelected.findIndex(
        (items) =>
          JSON.stringify(items.attributes) ===
            JSON.stringify(actions.payload.item.attributes) &&
          items.id === actions.payload.id &&
          addQuantity(items.quantity)
      );
      state.itemsSelected = [
        ...state.itemsSelected.slice(0, index),
        {
          id: actions.payload.id,
          quantity: quantity - 1,
          attributes: actions.payload.item.attributes,
          price: actions.payload.value,
        },
        ...state.itemsSelected.slice(index + 1),
      ];
      state.itemsSelected = state.itemsSelected.filter(
        (item) => item.quantity > 0
      );
      let totalPrice = 0;
      state.totalPrice = state.itemsSelected.map(
        (item) => (totalPrice += item.price * item.quantity)
      );
      if (state.itemsSelected.length > 1) {
        state.quantity = state.itemsSelected
          .map((item) => item.quantity)
          .reduce((quantityA, quantityB) => {
            return quantityB + quantityA;
          });
      } else {
        state.quantity = state.quantity - 1;
      }
      state.totalPrice = totalPrice.toFixed(2);
    },
  },
});

export const cartActions = cartItemsSlice.actions;

export default cartItemsSlice;
