import React from "react";
import { Link, useLocation } from "react-router-dom";

import BaseTable from "../../../common/components/ui/BaseTable";
import BaseButton from "../../../common/components/controls/BaseButton";
import AddEditOrder from "./AddEditOrder";

import { faPlus, faMessage, faPhone } from "../../../common/ui/Icons/Icons";
import BaseIcon from "../../../common/components/ui/BaseIcon";
import { OrderModel } from "../models";

interface IProps {
  orderDetails: OrderModel;
  itemList?: any;
  totalAmount?: number;
}

const OrderDetails: React.FC<IProps> = ({
  orderDetails,
}) => {
  const urlPath = useLocation();

  return (
    <>
      <div className="shadow rounded-2 pb-4">
        <div className="border-0 rounded-1 pt-2">
          <div className="card-body table-responsive">
            <table className="table table-borderless text-center">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Order ID</th>
                  <th scope="col">
                    <AddEditOrder />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{orderDetails?.userName}</td>
                  <td>{orderDetails?.orderNo}</td>
                  <td className="d-flex justify-content-around">
                    <BaseIcon icon={faPhone} />
                    <BaseIcon icon={faMessage} />
                  </td>
                </tr>
              </tbody>
            </table>
            <hr
              className=""
              style={{ border: "dashed", borderWidth: "1px" }}
            ></hr>
            <div className="">
              <BaseTable
                header={["Item", "Quantity", "Amount"]}
                theadClass="theadMargin"
                tbodyClass="border-0"
              >
                {orderDetails?.cartItems.map((item: any, i: any) => (
                  <tr className="" key={i}>
                    <td className="d-flex align-items-center">
                      <img
                        src={item.imageOne}
                        alt="img"
                        width={40}
                        className="rounded-circle me-2"
                      />
                      <span className="ms-2 text-left">{item.productName}</span>
                    </td>
                    <td>{item.quantity}</td>
                    <td>$ {item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </BaseTable>
            </div>

            <hr className="bg-dark border-1 border-top border-dark"></hr>

            <div className="d-flex justify-content-evenly ms-5 ps-5">
              <p className="fs-6">Total Amount:</p>
              <p className="fs-6">$ {orderDetails?.grandTotal.toFixed(2)}</p>
            </div>
            <div className="text-center mt-2 fs-8">
              {urlPath.pathname === "/customer-details" ? (
                ""
              ) : (
                <Link
                  to={"/customer-details"}
                  state={{ orderDetails: orderDetails }}
                  className="text-dark"
                  id="view-full-details"
                >
                  View full details
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`mt-5 d-flex ${
          urlPath.pathname === "/place-new-order"
            ? "justify-content-center"
            : "justify-content-end"
        }`}
      >
        {urlPath.pathname === "/" && (
          <Link to={"/place-new-order"}>
            <BaseButton
              name="Place new order"
              types="button"
              defaultClass="btn btn-warning rounded-pill hover-pill py-2 me-3"
              icon={faPlus}
              iconPosition="after"
            />
          </Link>
        )}
        {urlPath.pathname === "/customer-details" && (
          <Link to={"/"}>
            <BaseButton
              name="Back"
              types="button"
              defaultClass="btn btn-outline-warning rounded-1 me-3"
            />
          </Link>
        )}
        {urlPath.pathname === "/place-new-order" && (
          <Link to={"/"}>
            <BaseButton
              name="Confirm Order"
              types="button"
              defaultClass="btn btn-success"
            />
          </Link>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
