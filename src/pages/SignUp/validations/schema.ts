import * as yup from "yup";

// works for India, Canada, Europe, New Zealand, Australia, United States phone numbers
const phoneRegExp =
  /^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/;

export const RestaurantSignupValidations = yup.object().shape({
  name: yup.string().required("Name Required"),
  // email: yup
  //   .string()
  //   .email("Please Enter a valid email")
  //   .required("Email is Required"),
  // businessEmail: yup
  //   .string()
  //   .email("Please Enter a valid email")
  //   .required("Business Email is Required"),
  mobileNumber: yup
    .string()
    .matches(/^\d{11}$/, "Invalid phone number")
    .required("Phone Number Required"),
  category: yup.string().required("Category is Required"),
});

const validUrl =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

export const RestaurantDetailsValidations = yup.object().shape({
  restaurantName: yup.string().required("Required"),
  websiteUrl: yup
    .string()
    .matches(validUrl, "Enter correct url!")
    .required("Required"),
  availableTypes: yup
    .array()
    .min(1, "Please select at least one Available types"),
  category: yup.string().required("Required"),
});

export const RestaurantAddressDeatilsValidations = yup.object().shape({
  address: yup.string().required("Required"),
  city: yup.string().required("Required"),
  country: yup.string().required("Required"),
  state: yup.string().required("Required"),
  zipCode: yup
    .number()
    .test(
      "len",
      "Must be exactly 5 characters Zip Code",
      (val: any) => val.toString().length === 5
    )
    .positive()
    .integer()
    .required("Zip Code is required"),
});
