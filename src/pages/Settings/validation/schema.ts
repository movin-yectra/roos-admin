import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const myDetailsSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  email: yup.string().email("Please Enter a valid email").required("Required"),
  mobileNo: yup.number().required("Required"),
});

export const restaurantDetailsSchema = yup.object().shape({
  name: yup.string().required("Required"),
  description: yup.string().required("Required"),
  image: yup.string().required("Required"),
});

export const CuisineDetailsValidation = yup.object().shape({
  availableTypes: yup
    .array()
    .min(1, "Please select at least one Available types"),
  servingType: yup.array().min(1, "Please select at least one Serving types"),
});

export const PaymentMethodsValidation = yup.object().shape({
  paymentMethod: yup
    .array()
    .min(1, "Please select at least one Payment Methods"),
});

export const passwordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "New password must be at least 8 characters long")
    .matches(passwordRules, { message: "Please create a strong password" }),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

export const addressSchema = yup.object().shape({
  address: yup.string().required("Required"),
  city: yup.string().required("Required"),
  country: yup.string().required("Required"),
  state: yup.string().required("Required"),
  zipcode: yup.number().required("Required"),
  deliveryZone: yup.string().required("Required"),
});

export const imagesSchama = yup.object().shape({
  imageOne: yup.string().required("Required"),
  imageTwo: yup.string(),
  imageThree: yup.string(),
});
