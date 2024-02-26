import * as yup from "yup";

export const addNewItemSchema = yup.object().shape({
  productNo: yup.string().required("Required"),
  productName: yup.string().required("Required"),
  addedIngredients: yup.string().required("Required"),
  category: yup.string().required("Required"),
  productDescription: yup.string().required("Required"),
  price: yup.number().required("Required"),
  imageOne: yup.string().required("Required"),
});
