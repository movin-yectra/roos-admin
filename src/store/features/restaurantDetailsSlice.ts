import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  RestaurantDataModel,
  PaymentMethodModel,
  AddressDetailsModel,
  RestaurantImagesModel,
  RestaurantMediaUrlModel,
  ServiceType,
  DeliveryTypesModel,
} from "../../pages/RestaurantDetails/models";
import {
  RestaurantCreateModel,
  RestaurantResponseModel,
} from "../../common/models/base.model";
import { TaxValue } from "../models";
import { APIKeysModel } from "../../pages/Settings/components/SettingOther";


interface IRestaurant {
  restaurant: RestaurantCreateModel;
  restaurantResponse: RestaurantResponseModel;
}
const initialState: IRestaurant = {
  restaurant: {
    localAccountId: "",
    restaurantName: "",
    restaurantLogo: "",
    description: "",
    serviceTypes: [],
    address: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
    deliveryZone: "",
    imageOne: "",
    imageTwo: "",
    imageThree: "",
    websiteUrl: "",
    businessUrl: "",
    facebookId: "",
    instagramId: "",
    leadTime: "",
    deliveryMode: "",
    deliveryRadius: false,
    deliveryZipcode: false,
    deliveryFee: [],
    taxDetails: [],
    autoAccept: false,
    autoPrint: false,
    apiKey: "",
    apiToken: "",
    selectedServices: [],
    contactNo: "",
  },
  restaurantResponse: {
    businessId: "",
  },
};

export const RestaurantDetailsSlice = createSlice({
  name: "restaurantDetails",
  initialState,
  reducers: {
    //RestaurantDetails create screen state
    addLocalAccountId: (state, action: PayloadAction<string>) => {
      state.restaurant.localAccountId = action.payload;
    },
    addRestaurantDetails: (
      state,
      action: PayloadAction<RestaurantDataModel>
    ) => {
      state.restaurant.restaurantLogo = action.payload.image;
      state.restaurant.restaurantName = action.payload.name;
      state.restaurant.description = action.payload.description;
    },

    addSelectedServicesMode: (state, action: PayloadAction<Array<string>>) => {
      state.restaurant.selectedServices = action.payload;
      const getWeekday = (index: number): string => {
        const weekdays = [
          "SUNDAY",
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
        ];
        return weekdays[index];
      };
      state.restaurant.serviceTypes = action.payload.map((item) => {
        const newDynamicServiceType: ServiceType = {
          serviceMode: item,
          restaurantOpenCloseTime: Array(7)
            .fill({})
            .map((_, index) => ({
              day: getWeekday(index),
              closed: false,
              timings: [],
            })),
        };
        return newDynamicServiceType;
      });
    },
    updateServiceMode: (state, action: PayloadAction<ServiceType>) => {
      if (state.restaurant && state.restaurant.serviceTypes) {
        state.restaurant.serviceTypes = state.restaurant.serviceTypes.map(
          (obj) => {
            if (obj.serviceMode === action.payload.serviceMode) {
              // Update only the specified properties
              return { ...obj, ...action.payload };
            }
            return obj; // Keep other objects unchanged
          }
        );
      }
    },

    addPaymentMethods: (state, action: PayloadAction<PaymentMethodModel>) => {
      // state.payment.paymentMethod = action.payload.paymentMethod;
      // console.log(action.payload);
    },
    addAddressDetails: (state, action: PayloadAction<AddressDetailsModel>) => {
      state.restaurant.address = action.payload.address;
      state.restaurant.city = action.payload.city;
      state.restaurant.country = action.payload.country;
      state.restaurant.state = action.payload.state;
      state.restaurant.zipCode = action.payload.zipcode;
      state.restaurant.deliveryZone = action.payload.deliveryZone;
    },

    adddeliveryMode: (state, action: PayloadAction<DeliveryTypesModel>) => {
      state.restaurant.deliveryMode = action.payload.deliveryMode;
      state.restaurant.leadTime = action.payload.preparingTime;
      state.restaurant.deliveryRadius = action.payload.isDeliveryRadius;
      state.restaurant.deliveryZipcode = action.payload.isDeliveryZipcode;
      if (state.restaurant.deliveryMode === "Self Delivery") {
        state.restaurant.deliveryFee = action.payload.deliveryFee;
      } else {
        state.restaurant.deliveryFee = [];
      }
    },
    addTaxDetails: (state, action: PayloadAction<TaxValue[]>) => {
      state.restaurant.taxDetails = action.payload;
    },
    addRestaurantImage: (
      state,
      action: PayloadAction<RestaurantImagesModel>
    ) => {
      state.restaurant.imageOne = action.payload.imageOne;
      state.restaurant.imageTwo = action.payload.imageTwo;
      state.restaurant.imageThree = action.payload.imageThree;
    },
    addRestaurantMediaUrl: (
      state,
      action: PayloadAction<RestaurantMediaUrlModel>
    ) => {
      state.restaurant.websiteUrl = action.payload.website;
      state.restaurant.businessUrl = action.payload.business;
      state.restaurant.facebookId = action.payload.facebook;
      state.restaurant.instagramId = action.payload.instagram;
      state.restaurant.localAccountId = action.payload.localAccountId;
      state.restaurant.contactNo = action.payload.contactNo;
    },
    setRestaurantResponse(
      state,
      action: PayloadAction<RestaurantResponseModel>
    ) {
      state.restaurantResponse = action.payload;
    },

    //setting pages onLoad call business API and set state
    setSettingRestaurantResponse(
      state,
      action: PayloadAction<RestaurantCreateModel>
    ) {
      state.restaurant = action.payload;
    },

    //update state for business module API
    updateSettingRestaurantDetails: (
      state,
      action: PayloadAction<RestaurantDataModel>
    ) => {
      state.restaurant.restaurantLogo = action.payload.image;
      state.restaurant.restaurantName = action.payload.name;
      state.restaurant.description = action.payload.description;
    },

    updateSelectedServicesMode: (
      state,
      action: PayloadAction<Array<string>>
    ) => {
      const newServices = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      // remove null values and add extra values without duplicates
      state.restaurant.selectedServices = Array.from(
        new Set([
          ...state.restaurant.selectedServices.filter(Boolean),
          ...newServices,
        ])
      );
    },
    updateSelectedServicesModeRemove: (
      state,
      action: PayloadAction<Array<string>>
    ) => {
      state.restaurant.selectedServices =
        state.restaurant.selectedServices.filter(
          (item) => !action.payload.includes(item)
        );
    },

    updateSettingRestaurantAddress: (
      state,
      action: PayloadAction<AddressDetailsModel>
    ) => {
      state.restaurant.address = action.payload.address;
      state.restaurant.city = action.payload.city;
      state.restaurant.country = action.payload.country;
      state.restaurant.state = action.payload.state;
      state.restaurant.zipCode = action.payload.zipcode;
      state.restaurant.deliveryZone = action.payload.deliveryZone;
    },
    updateSettingRestaurantImages: (
      state,
      action: PayloadAction<RestaurantImagesModel>
    ) => {
      state.restaurant.imageOne = action.payload.imageOne;
      state.restaurant.imageTwo = action.payload.imageTwo;
      state.restaurant.imageThree = action.payload.imageThree;
    },
    updateSettingRestaurantUrls: (
      state,
      action: PayloadAction<RestaurantMediaUrlModel>
    ) => {
      state.restaurant.websiteUrl = action.payload.website;
      state.restaurant.businessUrl = action.payload.business;
      state.restaurant.facebookId = action.payload.facebook;
      state.restaurant.instagramId = action.payload.instagram;
    },
    updateSettingOthers: (state, action: PayloadAction<APIKeysModel>) => {
      state.restaurant.apiKey = action.payload.apiKey;
      state.restaurant.apiToken = action.payload.apiToken;
      state.restaurant.autoAccept = action.payload.autoAccept;
      state.restaurant.autoPrint = action.payload.autoPrint;
    },
    updateSettingTaxDetails: (state, action: PayloadAction<TaxValue[]>) => {
      state.restaurant.taxDetails = action.payload;
    },
  },
});

export default RestaurantDetailsSlice.reducer;
export const {
  addLocalAccountId,
  addRestaurantDetails,
  addSelectedServicesMode,
  updateServiceMode,
  addPaymentMethods,
  addAddressDetails,
  adddeliveryMode,
  addRestaurantImage,
  addRestaurantMediaUrl,
  setRestaurantResponse,
  setSettingRestaurantResponse,
  updateSettingRestaurantDetails,
  updateSettingRestaurantAddress,
  updateSettingRestaurantImages,
  updateSettingRestaurantUrls,
  updateSelectedServicesMode,
  updateSelectedServicesModeRemove,
  addTaxDetails,
  updateSettingOthers,
  updateSettingTaxDetails,
} = RestaurantDetailsSlice.actions;
