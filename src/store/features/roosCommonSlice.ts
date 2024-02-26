import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RoosBaseServices } from "../../common/services";
import { AllDropdownModel } from "../models";

interface IDropdown {
  dropDown: AllDropdownModel;
}

const initialState: IDropdown = {
  dropDown: new AllDropdownModel(),
};

const _services = new RoosBaseServices();

export const fetchAllDropdown = createAsyncThunk("api/fetchData", async () => {
  const response = await _services
    .getAllDropdown()
    .then((response) => response);
  return response;
});

export const roosCommonSlice = createSlice({
  name: "roosCommonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllDropdown.fulfilled, (state, action) => {
      state.dropDown = action.payload[0];
    });
  },
});
