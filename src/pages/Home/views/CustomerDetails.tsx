/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

//models
import { OrderModel, AddressModel } from "../models";

//custom components
import BaseButton from "../../../common/components/controls/BaseButton";

const CustomerDetails: React.FC = () => {
  const { pathname, state } = useLocation();

  const [orderDetails, setOrderDetails] = useState<OrderModel | undefined>();
  const [orderAddress, setOrderAddress] = useState<AddressModel | undefined>();

  useLayoutEffect(() => {
    setOrderDetails(state.orderDetails);
    setOrderAddress(state.orderDetails?.deliveryAddress);
  }, []);

  return (
    <>
      <div className="row g-0 mb-3">
        <div className="col-md-5 px-4 mt-5 rounded-1 border-end">
          <div className="shadow-sm bg-white p-4 rounded-1">
            <div className="d-flex">
              <div className="col-md-8 d-flex align-items-center">
                <p className="my-2 text-grey2 fs-6">Name: </p>
                <p className="my-2 fs-6 ms-3">{orderDetails?.userName}</p>
              </div>

              <div className="col-md-4 d-flex align-items-center border-start">
                <p className="my-2 text-grey2 fs-6">Order ID:</p>
                <p className="my-2 fs-6 ms-3">{orderDetails?.orderNo}</p>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <p className="my-2 text-grey2 fs-6 ">Email: </p>
              <p className="my-2 fs-6 ms-3 overflow-auto">
                {orderDetails?.email}
              </p>
            </div>

            <div className="d-flex align-items-center">
              <p className="my-2 text-grey2 fs-6">Phone: </p>
              <p className="my-2 fs-6 ms-3">{orderDetails?.mobileNo}</p>
            </div>

            <div className="d-flex">
              <p className="text-grey2 fs-6 text-start">Address: </p>
              <div>
                <p className="ms-3">
                  {orderAddress?.houseNumber}, {orderAddress?.street},{" "}
                  {orderAddress?.town}, {orderAddress?.state} -{" "}
                  {orderAddress?.zipCode}.
                </p>
                {orderAddress?.landMark !== "" && (
                  <p className="text-grey2 fs-6 ms-3">
                    Landmark: {orderAddress?.landMark}
                  </p>
                )}
              </div>
            </div>

            <div className="d-flex align-items-center pb-2">
              <div className="col-md-6 d-flex align-items-center">
                <p className="text-grey2 fs-6 mb-0">Paid via: </p>
                <p className="fs-6 ms-3 mb-0">Credit Card</p>
              </div>

              <div className="col-md-6 amount d-flex">
                <p className="text-grey2 fs-6 mb-0">Amount: </p>
                <p className="fs-6 ms-3 mb-0">
                  $ {orderDetails?.grandTotal.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-7 px-4 mt-5">
          {orderDetails?.cartItems &&
            orderDetails?.cartItems.map((item, i) => (
              <div className="p-3 border-0 card-shadow mb-4">
                <div className="row d-flex justify-content-center align-items-center">
                  <div className="col-sm-5 col-md-3 col-lg-4 col-xl-3 d-flex justify-content-center align-items-center border-end">
                    <img
                      src={item.imageOne}
                      alt="logo"
                      className="rounded w-100 me-1 mb-3 mb-md-0"
                    />
                  </div>
                  <div className="col mx-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <h6>{item.productName}</h6>
                    </div>
                    <div className="mt-2"></div>
                    <div className="mt-3"></div>
                    <div>
                      <hr />
                      <div className="mt-2 d-flex align-items-center">
                        <div className="d-flex align-items-center justify-content-md-start justify-content-between w-100">
                          <div>
                            <h6 className="text-grey2 m-0">Qty: </h6>
                          </div>
                          <div className="ms-2">{item.quantity}</div>
                        </div>
                        <div className="d-flex align-items-center justify-content-md-end justify-content-between w-100">
                          <div>
                            <h6 className="text-grey2 m-0">Price: </h6>
                          </div>
                          <div className="ms-2">$ {item.price.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <div
            className={`mt-5 ${pathname === "/customer-details" && "text-end"}`}
          >
            {pathname === "/customer-details" && (
              <Link to={"/"} id="click-back">
                <BaseButton
                  name="Back"
                  types="button"
                  defaultClass="btn btn-outline-warning rounded-1 me-3"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
