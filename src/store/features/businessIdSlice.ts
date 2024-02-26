import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IBusinessId {
    businessId: string;
    userId: string;
}

const initialState: IBusinessId = {
    businessId: "",
    userId: "",
};

export const businessIdSlice = createSlice({
  name: "businessId",
  initialState,
  reducers: {
    addBusinessId: (state, action: PayloadAction<any>) => {
      state.businessId = action.payload;
    },
    addUserId: (state, action: PayloadAction<any>) => {
      state.userId = action.payload;
    },
  },
});

export const { addBusinessId, addUserId } = businessIdSlice.actions;

// Selector
export const selectBusinessId = (state: any) => state.businessId.businessId;
export const selectUserId = (state: any) => state.businessId.userId;

