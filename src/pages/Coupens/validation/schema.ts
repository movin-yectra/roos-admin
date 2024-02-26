import * as Yup from "yup";

export const CouponValidationSchema = Yup.object({
  couponStatus: Yup.boolean(),
  offerApplicableForAllItem: Yup.boolean(),
  couponCode: Yup.string().required("Coupon code is required"),
  logo: Yup.string(),
  discountType: Yup.string().required("Invalid discount type"),
  amount: Yup.number().required("Amount is required"),
  maxUsers: Yup.number().required("No.of Users is required"),
  startDate: Yup.string().required("Enter a start date"),
  endDate: Yup.string().required("Enter an end date"),
});
