export class CouponsResponseModel {
  businessId: string;
  couponCode: string;
  startDate: any;
  endDate: any;
  discountType: string;
  amount: string;
  couponStatus: boolean;
  offerApplicableForAllItem: boolean;
  logo: any;
  maxUsers?: string;
  description?: string;
  products: any;
}

export class getCouponResponseModel {
  businessId: string;
  couponCode: string;
  productId: string;
  redeemedCount: string;
  startDate: any;
  endDate: any;
  discountType: string;
  amount: number;
  couponStatus: boolean;
  offerApplicableForAllItem: boolean;
  discountsOnSelectedProduct: string;
  logo: any;
  id: string;
}
