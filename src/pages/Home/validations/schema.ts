import * as yup from "yup";

export const PlaceNewOrderValidations = yup.object().shape({
  name: yup.string().required("Required"),
  mobileNumber: yup
    .string()
    .matches(/^\d{11}$/, "Invalid phone number")
    .required("Required"),
  address: yup.string().required("Required"),
  address1: yup.string().required("Required"),
});
