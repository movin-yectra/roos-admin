import * as Yup from "yup";
import { RestaurantOpenCloseTimeModel } from "../models";

export const RestaurantDetailsValidation = Yup.object().shape({
  image: Yup.string().required("Required"),
  name: Yup.string().required("Restaurant name is required"),
  description: Yup.string().required("Restaurant description is required"),
});

export const CuisineDetailsValidation = Yup.object().shape({
  serviceMode: Yup.array()
    .min(1, "Please select at least one service mode")
    .required("Please select at least one service mode"),
});

export const PaymentMethodsValidation = Yup.object().shape({
  paymentMethod: Yup.array().min(
    1,
    "Please select at least one Payment Methods"
  ),
});

export const AddressDetailsValidations = Yup.object().shape({
  address: Yup.string().min(5).required("Address is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  zipcode: Yup.number()
    .test(
      "len",
      "Must be exactly 5 characters Zip Code",
      (val: any) => val.toString().length === 5
    )
    .positive()
    .integer()
    .required("Zip Code is required"),
});

const validUrl =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export const RestaurantUrlsValidations = Yup.object().shape({
  website: Yup.string()
    .matches(validUrl, "Enter correct url!")
    .required("Please enter website"),
  business: Yup.string()
    .matches(validUrl, "Enter correct url!")
    .required("Business link is required"),
  facebook: Yup.string()
    .matches(
      /^(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)??$/,
      "Enter correct url!"
    )
    .required("Facebook link is required"),
  instagram: Yup.string()
    .matches(
      /(https?:\/\/(www\.)?)?instagram\.com(\/[a-z]?)/,
      "Enter correct url!"
    )
    .required("Instagram link is required"),
});

export const RestaurantTime = Yup.object().shape({
  dayTime: Yup.array().of(
    Yup.object().shape({
      day: Yup.string().required("Day is required"),
      openAt: Yup.string()
        .required("Open time is required")
        .matches(/^(0[0-9]|1[0-9]|2[0-3])$/, "Invalid time format (HH:mm)"),
      closeAt: Yup.string()
        .required("Close time is required")
        .matches(/^(0[0-9]|1[0-9]|2[0-3])$/, "Invalid time format (HH:mm)"),
    })
  ),
});

export const RestaurantOpenCloseTimeSchama: Yup.ObjectSchema<
  RestaurantOpenCloseTimeModel | any
> = Yup.object().shape({
  MONDAY: Yup.object({
    closed: Yup.boolean(),
    openAt: Yup.string()
      .transform((originalValue, originalObject) => {
        if (!originalObject.closed) {
          return originalValue;
        }
        return originalValue;
      })
      .default(""),
    closeAt: Yup.string()
      .transform((originalValue, originalObject) => {
        if (!originalObject.closed) {
          return originalValue;
        }
        return originalValue;
      })
      .default(""),
  }),
  TUESDAY: Yup.object().shape({
    closed: Yup.boolean(),
    openAt: Yup.string()
      .transform((originalValue, originalObject) => {
        if (!originalObject.closed) {
          return originalValue;
        }
        return originalValue;
      })
      .default(""),
    closeAt: Yup.string()
      .transform((originalValue, originalObject) => {
        if (!originalObject.closed) {
          return originalValue;
        }
        return originalValue;
      })
      .default(""),
  }),
  WEDNESDAY: Yup.object().shape({
    closed: Yup.boolean(),
    openAt: Yup.string()
      .transform((originalValue, originalObject) => {
        if (!originalObject.closed) {
          return originalValue;
        }
        return originalValue;
      })
      .default(""),
    closeAt: Yup.string()
      .transform((originalValue, originalObject) => {
        if (!originalObject.closed) {
          return originalValue;
        }
        return originalValue;
      })
      .default(""),
  }),
  THURSDAY: Yup.object().shape({
    closed: Yup.boolean(),
    openAt: Yup.string()
      .transform((originalValue, originalObject) => {
        if (!originalObject.closed) {
          return originalValue;
        }
        return originalValue;
      })
      .default(""),
    closeAt: Yup.string()
      .transform((originalValue, originalObject) => {
        if (!originalObject.closed) {
          return originalValue;
        }
        return originalValue;
      })
      .default(""),
  }),
  FRIDAY: Yup.object().shape({
    closed: Yup.boolean(),
    openAt: Yup.string()
      .transform((originalValue, originalObject) => {
        if (!originalObject.closed) {
          return originalValue;
        }
        return originalValue;
      })
      .default(""),
    closeAt: Yup.string()
      .transform((originalValue, originalObject) => {
        if (!originalObject.closed) {
          return originalValue;
        }
        return originalValue;
      })
      .default(""),
  }),
  SATURDAY: Yup.object().shape({
    closed: Yup.boolean(),
    openAt: Yup.string()
      .transform((originalValue, originalObject) => {
        if (!originalObject.closed) {
          return originalValue;
        }
        return originalValue;
      })
      .default(""),
    closeAt: Yup.string()
      .transform((originalValue, originalObject) => {
        if (!originalObject.closed) {
          return originalValue;
        }
        return originalValue;
      })
      .default(""),
  }),
  SUNDAY: Yup.object().shape({
    closed: Yup.boolean(),
    openAt: Yup.string()
      .transform((originalValue, originalObject) => {
        if (!originalObject.closed) {
          return originalValue;
        }
        return originalValue;
      })
      .default(""),
    closeAt: Yup.string()
      .transform((originalValue, originalObject) => {
        if (!originalObject.closed) {
          return originalValue;
        }
        return originalValue;
      })
      .default(""),
  }),
});

export const RestaurantOpenCloseValidation = Yup.object().shape({
  restaurantOpenCloseTime: Yup.array().of(
    Yup.object({
      timings: Yup.array().of(
        Yup.object().shape({
          openAt: Yup.string().required("Required"),
          closeAt: Yup.string().required("Required"),
        })
      ),
    })
  ),
});

export const DeliveryZoneValidation = Yup.object().shape({
  preparingTime: Yup.string().required("Preparing Time required"),
  deliveryMode: Yup.array().min(1, "At least one option must be selected"),
  deliveryModeFee: Yup.array().of(
    Yup.object().shape({
      deliveryRadius: Yup.string().required("Delivery radius is required"),
      deliveryFee: Yup.string().required("Delivery fee is required"),
    })
  ),
});

export const TaxDetailsValidation = Yup.object({
  taxDetails: Yup.array().of(
    Yup.object({
      taxName: Yup.string().required("Tax Name is required"),
      taxValue: Yup.string().required("Tax Amount is required"),
      // taxUnits: Yup.string().required("Tax Units are required"),
    })
  ),
});
