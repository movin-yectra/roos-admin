import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { RestaurantDetailsSlice } from "./features/restaurantDetailsSlice";
import { SignupSlice } from "./features/signupSlice";
import {businessIdSlice} from "./features/businessIdSlice";
import { categorySlice } from "./features/categorySlice";
import { fetchAllDropdown, roosCommonSlice } from "./features/roosCommonSlice";
import { menuSlice } from "./features/menuSlice";

export const store = configureStore({
  reducer: {
    restaurant: RestaurantDetailsSlice.reducer,
    signup: SignupSlice.reducer,
    category: categorySlice.reducer,
    roosCommon: roosCommonSlice.reducer,
    businessId: businessIdSlice.reducer,
    menu: menuSlice.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Dispatch the fetchData action immediately
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

//every reload call the API
store.dispatch(fetchAllDropdown());
