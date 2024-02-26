/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import BaseButton from "../../../common/components/controls/BaseButton";
import BaseIcon from "../../../common/components/ui/BaseIcon";
import { faCircleInfo, faTags } from "../../../common/ui/Icons/Icons";
import { useNavigate } from "react-router-dom";
import { CouponService, ICouponService } from "../services";
import { useAppSelector } from "../../../store";
import { getCouponResponseModel } from "../models";
import { useAppAlert } from "../../../common/hooks/useAppAlert";

const CouponsList: React.FC = () => {
  const [isTrue, setIsTrue] = useState<boolean>(true);
  const [coupon, setCoupon] = useState<getCouponResponseModel[]>([]);

  const navigate = useNavigate();
  const selectorBusinessId = useAppSelector(
    (store) => store.businessId.businessId
  );

  const { setIsLoading } = useAppAlert();

  const service: ICouponService = new CouponService();

  const handleEditCoupon = (couponId: any) => {
    navigate(`edit-coupon/${couponId}`);
  };

  const handleDeleteCoupon = (id: any) => {
    setIsLoading(true);
    service
      .deleteCoupon(id)
      .then((response) => {
        setIsLoading(false);
        getCoupons();
      })
      .catch((error) => {});
  };

  const getCoupons = () => {
    setIsLoading(true);
    service
      .getAllCoupons(selectorBusinessId)
      .then((response) => {
        setCoupon(response);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsTrue(false);
      });
  };

  useEffect(() => {
    if (selectorBusinessId) {
      getCoupons();
    }
  }, [selectorBusinessId]);

  return (
    <div className="px-5 mt-4">
      <div className="d-flex justify-content-between border-2 border-bottom pb-3">
        <div className="">
          <h4 className="fw-semibold">Coupons</h4>
        </div>
        <div className="">
          <BaseButton
            defaultClass="btn btn-success"
            name="Add New Coupon"
            handleClick={() => navigate("create-coupon")}
            icon={faTags}
          />
        </div>
      </div>
      {isTrue ? (
        <div>
          <div className="d-flex justify-content-between mt-3 text-center fw-semibold">
            <small className="border w-100 p-2">Coupon Code</small>
            <small className="border w-100 p-2">Coupon Type</small>
            <small className="border w-100 p-2">Value</small>
            <small className="border w-100 p-2">Expiry Date</small>
            <small className="border w-100 p-2">Redeemed</small>
            <small className="border w-100 p-2">Action</small>
          </div>
          {coupon.map((item, i) => (
            <div
              className="d-flex justify-content-between align-items-center text-center border"
              key={i}
            >
              <div className="m-0 w-100 p-2 py-3">
                <span className="p-2 m-0 bg-light-1 border-dash">
                  {item.couponCode}
                </span>
              </div>
              <div className="m-0 w-100 p-2">
                <small>{item.discountType}</small>
              </div>
              {item.discountType === "PERCENTAGEDISCOUNT" ? (
                <div className="m-0 w-100 p-2">
                  <small>{item.amount} %</small>
                </div>
              ) : (
                <div className="m-0 w-100 p-2">
                  <small>$ {item.amount}</small>
                </div>
              )}

              <div className="m-0 w-100 p-2">
                <small>{item.endDate}</small>
              </div>
              <div className="m-0 w-100 p-2">
                <small>{item.redeemedCount}</small>
              </div>
              <div className="m-0 w-100 p-2 d-flex justify-content-around">
                <BaseButton
                  defaultClass="btn text-primary px-2 py-0"
                  name="Edit"
                  handleClick={() => handleEditCoupon(item.id)}
                />
                <BaseButton
                  defaultClass="btn text-danger px-2 py-0"
                  name="Delete"
                  handleClick={() => handleDeleteCoupon(item.id)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="d-flex justify-content-between mt-3 border-2 border-danger border-top rounded-1">
          <small className="border w-100 p-2 text-danger rounded-1">
            <BaseIcon icon={faCircleInfo} classes="fs-5 me-2" /> No coupons
            found
          </small>
        </div>
      )}
    </div>
  );
};

export default CouponsList;
