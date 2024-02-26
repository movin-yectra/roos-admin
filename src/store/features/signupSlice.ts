import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  SignupAdressDetailsmodel,
  SignupCustomerModel,
  SignupRestaurantModel,
} from "../../pages/SignUp/models";

interface ISignup {
  signupCustomer: SignupCustomerModel;
  signupRestaurant: SignupRestaurantModel;
  signupAdressDetail: SignupAdressDetailsmodel;
}

const initialState: ISignup = {
  signupCustomer: new SignupCustomerModel(),
  signupRestaurant: new SignupRestaurantModel(),
  signupAdressDetail: new SignupAdressDetailsmodel(),
};

export const SignupSlice = createSlice({
  name: "signupSlice",
  initialState: initialState,
  reducers: {
    addSignupCustomer: (state, action: PayloadAction<SignupCustomerModel>) => {
      state.signupCustomer = action.payload;
    },
    addSignupRestaurant: (
      state,
      action: PayloadAction<SignupRestaurantModel>
    ) => {
      state.signupRestaurant = action.payload;
    },
    addSignupAdressDetail: (
      state,
      action: PayloadAction<SignupAdressDetailsmodel>
    ) => {
      state.signupAdressDetail = action.payload;
    },
  },
 // extraReducers: {},
});

export const { addSignupCustomer, addSignupRestaurant, addSignupAdressDetail } =
  SignupSlice.actions;

export default SignupSlice.reducer;
