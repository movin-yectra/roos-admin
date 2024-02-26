import { CouponsResponseModel, getCouponResponseModel } from "../models/index";

import { apiClient } from "../../../common/hooks/useApiClient";

const { httpGet, httpPost, httpPut, httpDelete } = apiClient();

export interface ICouponService {
  getAllCoupons(businessId: string): Promise<getCouponResponseModel[]>;
  createCoupon(value: CouponsResponseModel): Promise<any>;
  updateCoupon(couponId: string, value: CouponsResponseModel): Promise<any>;
  deleteCoupon(couponId: string): Promise<any>;
  getCoupon(couponId: string): Promise<CouponsResponseModel>;
  getCouponByCode(couponCode: string): Promise<any>;
}
export class CouponService implements ICouponService {
  getAllCoupons(businessId: string): Promise<getCouponResponseModel | any> {
    return httpGet(`roos-coupon-dev/getAll?businessId=${businessId}`).then(
      (response) => {
        return response;
      }
    );
  }

  createCoupon(value: CouponsResponseModel): Promise<any> {
    return httpPost("roos-coupon-dev/create", value).then((response) => {
      return response;
    });
  }

  updateCoupon(couponId: string, value: CouponsResponseModel): Promise<any> {
    return httpPut(`roos-coupon-dev/put?id=${couponId}`, value).then(
      (response) => {
        return response;
      }
    );
  }

  deleteCoupon(couponId: string): Promise<any> {
    return httpDelete(`roos-coupon-dev/delete?id=${couponId}`).then(
      (response) => {
        return response;
      }
    );
  }

  getCoupon(couponId: string): Promise<CouponsResponseModel | any> {
    return httpGet(`roos-coupon-dev/get?id=${couponId}`).then((response) => {
      return response;
    });
  }

  getCouponByCode(couponCode: string): Promise<any> {
    return httpGet(
      `roos-coupon-dev/getcouponByCode?couponCode=${couponCode}`
    ).then((response) => {
      return response;
    });
  }
}
