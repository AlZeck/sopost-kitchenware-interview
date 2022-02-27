import { configureStore, createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    name: "John Doe",
    email: "john@example.com",
    items: {
      forks: true,
      knives: true,
      spoons: false,
    },
    address: {
      line_1: "SoPost Ltd",
      line_2: "The Core, Bath Lane",
      town: "Newcastle Upon Type",
      district: "Tyne & Wear",
      territory: "GBR",
      country: "United Kingdom",
      postcode: "NE4 5TF",
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
