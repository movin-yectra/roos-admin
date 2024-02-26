import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoryValueModel } from "../../pages/MenuManaging/models";

import { IMenuService, MenuService } from "../../pages/MenuManaging/services";

interface ICategory {
  categories: categoryValueModel[];
  categoryId: string;
}

const initialState: ICategory = {
  categories: [],
  categoryId: "",
};

const menuService: IMenuService = new MenuService();

export const fetchCategories = createAsyncThunk(
  "types/fetchCategories",
  async (value: any) => {
    const response = await menuService.getCategory(value);
    return response;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      if (action.payload.category.length > 0) {
        state.categories = action.payload.category;
        state.categoryId = action.payload.id;
      }
      // state.categories = action.payload.category;
      // state.categoryId = action.payload.id;
    });
  },
});
