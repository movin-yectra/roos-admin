import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { AddNewMenuModel } from "../models";

interface IMenu {
  createMenu: AddNewMenuModel;
}

const initialState: IMenu = {
  createMenu: {
    productNo: "",
    productName: "",
    addedIngredients: "",
    category: "",
    productDescription: "",
    price: "",
    imageOne: "",
    imageTwo: "",
    imageThree: "",
    businessId: "",
    customizations: null,
  },
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    createMenuItem: (state, action: PayloadAction<AddNewMenuModel>) => {
      state.createMenu.addedIngredients = action.payload.addedIngredients;
      state.createMenu.imageOne = action.payload.imageOne;
      state.createMenu.imageTwo = action.payload.imageTwo;
      state.createMenu.imageThree = action.payload.imageThree;
      state.createMenu.businessId = action.payload.businessId;
      state.createMenu.category = action.payload.category;
      state.createMenu.price = action.payload.price;
      state.createMenu.productDescription = action.payload.productDescription;
      state.createMenu.productName = action.payload.productName;
      state.createMenu.productNo = action.payload.productNo;
    },
    createCustomizations: (state, action: PayloadAction<any>) => {
      state.createMenu.customizations = action.payload;
    },
  },
});

export const { createMenuItem, createCustomizations } = menuSlice.actions;
