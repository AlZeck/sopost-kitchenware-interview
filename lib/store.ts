import { configureStore, createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    name: "",
    email: "",
    items: {
      forks: false,
      knives: false,
      spoons: false,
    },
    address: {
      line_1: "",
      line_2: "",
      town: "",
      district: "",
      territory: "",
      country: "",
      postcode: "",
    },
  },
  reducers: {
    setOrderName(state, action) {
      state.name = action.payload;
    },
    setOrderEmail(state, action) {
      state.email = action.payload;
    },
    setOrderItems(state, action) {
      state.items = action.payload;
    },
    setOrderAddress(state, action) {
      state.address = action.payload;
    },
  },
});

export const { setOrderName, setOrderEmail, setOrderItems, setOrderAddress } =
  orderSlice.actions;

const formSlice = createSlice({
  name: "form",
  initialState: {
    step: 1,
  },
  reducers: {
    nextStep(state) {
      state.step += 1;
    },
    prevStep(state) {
      if (state.step > 1) {
        state.step -= 1;
      }
    },
  },
});

export const { nextStep, prevStep } = formSlice.actions;

export const store = configureStore({
  reducer: {
    order: orderSlice.reducer,
    form: formSlice.reducer,
  },
});
