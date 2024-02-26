import React, { useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import PhoneInput from "react-phone-input-2";

//custom components
import BaseInput from "../../../common/components/controls/BaseInput";
import BaseTable from "../../../common/components/ui/BaseTable";
import BaseButton from "../../../common/components/controls/BaseButton";
import BaseCheckBox from "../../../common/components/controls/BaseCheckBox";

//models
import { OverviewResponseModel, PlaceNewOrderModel } from "../models";

//validation
import { PlaceNewOrderValidations } from "../validations/schema";

//icons
import { faPlus, faMinus } from "../../../common/ui/Icons/Icons";

//services
import { HomeService, IHomeService } from "../services";

const PlaceNewOrder: React.FC = () => {
  const service: IHomeService = new HomeService();
  const [orderList, setOrderList] = useState<OverviewResponseModel>(
    new OverviewResponseModel()
  );

  const initialValues: PlaceNewOrderModel = new PlaceNewOrderModel();

  const urlPath = useLocation();
  const navigate = useNavigate();
  const itemimg = "item";

  const getResponse = () => {
    service.getOverview().then((response) => {
      setOrderList(response);
    });
  };

  // Increment the quantity
  const increaseQuantity = (id: number) => {
    setOrderList((order: OverviewResponseModel) => {
      return {
        ...order,
        ongoingOrders: order.ongoingOrders.map((item) =>
          item.orderId === id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    });
  };

  // Decrement the quantity
  const decreaseQuantity = (id: number) => {
    setOrderList((order: OverviewResponseModel) => {
      return {
        ...order,
        ongoingOrders: order.ongoingOrders.map((item) =>
          item.orderId === id && item.quantity > 0
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    });
  };

  const onSubmit = () => {
    navigate("/");
  };

  const formik = useFormik({
    initialValues,
    validationSchema: PlaceNewOrderValidations,
    onSubmit,
  });

  //useEffect
  useLayoutEffect(() => {
    getResponse();
  }, []);

  return (
    <>
      <form className="row my-5 g-0" onSubmit={formik.handleSubmit}>
        <div className="col-md-8 px-5">
          <div className="row gx-3 g-0">
            <div className="col-md-5">
              <BaseInput
                name="name"
                type="text"
                label="Name"
                placeholder="Enter Name"
                inputClass="border-0"
                value={formik.values.name}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                formik={formik}
              />
            </div>
            <div className="col-md-5">
              <PhoneInput
                country={"us"}
                placeholder="Enter Mobile Number"
                onChange={(event: any) =>
                  formik.setFieldValue("mobileNumber", event)
                }
                onBlur={formik.handleBlur}
                buttonClass={`bg-white ${
                  formik.errors.mobileNumber && formik.touched.mobileNumber
                    ? "border-danger"
                    : "border-0"
                }`}
                value={formik.values.mobileNumber}
                containerClass="col-5 mt-4"
                inputClass={`bg-white ${
                  formik.errors.mobileNumber && formik.touched.mobileNumber
                    ? "border-danger"
                    : "border-0 "
                }`}
                inputProps={{
                  name: "mobileNumber",
                }}
              />
              {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                <div className="text-danger fs-9">
                  {formik.errors.mobileNumber}
                </div>
              ) : null}
            </div>
            <div className="col-md-5 mt-3">
              <BaseInput
                name="address"
                type="text"
                label="Address"
                placeholder="Enter Address"
                inputClass="border-0"
                value={formik.values.address}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                formik={formik}
              />
            </div>
            <div className="col-md-5 mt-3">
              <BaseInput
                name="address1"
                type="text"
                label="Address"
                placeholder="Enter Address"
                inputClass="border-0"
                value={formik.values.address1}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                formik={formik}
              />
            </div>
          </div>
          <div className="mt-5">
            <BaseTable
              classes="table-borderless"
              header={["Item", "Quantity", "Added Ingredients", "Amount"]}
              theadClass="text-start"
            >
              {orderList.ongoingOrders.map((item, i) => (
                <tr className="text-start" key={i}>
                  <td>
                    <div>
                      <img
                        src={item.profileImg}
                        alt="img"
                        width={40}
                        className="rounded-circle"
                      />

                      <span className="ms-2">{item.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex ">
                      <div className="d-flex align-items-center border rounded-1">
                        <div>
                          <BaseButton
                            id="qty-incerment"
                            icon={faMinus}
                            types="button"
                            defaultClass="btn ps-2"
                            handleClick={() => decreaseQuantity(item.orderId)}
                          />
                        </div>
                        <div className="bg-warning text-white py-1 px-2 rounded-1">
                          {item.quantity}
                        </div>
                        <div>
                          <BaseButton
                            icon={faPlus}
                            types="button"
                            defaultClass="btn ps-2"
                            handleClick={() => increaseQuantity(item.orderId)}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex">
                      <div className="">
                        <BaseCheckBox
                          id={`suger${item.orderId}`}
                          name="suger"
                          types="checkbox"
                          boxClass="form-check d-flex"
                          inputClass="form-check-input"
                          labelClass="ms-2"
                          label="Suger"
                          // defaultchecked={true}
                        />
                        <BaseCheckBox
                          id={`salt${item.orderId}`}
                          name="salt"
                          types="checkbox"
                          boxClass="form-check d-flex "
                          inputClass="form-check-input"
                          labelClass="ms-2"
                          label="Salt"
                        />
                      </div>
                    </div>
                  </td>
                  <td>{item.payVia}</td>
                  <td>
                    <BaseButton
                      name={"Add"}
                      defaultClass="btn btn-outline-secondary rounded-1 "
                    />
                  </td>
                </tr>
              ))}
            </BaseTable>
          </div>
        </div>
        {/* ///////////////////////////////////////////////////////// */}
        <div className="col-md-4 p-3">
          <div className="mt-4">
            <div className="row g-0 align-items-center pb-2">
              <p className="text-center fw-medium fs-5 lh-3">Order Details</p>
            </div>
            <div className="shadow p-4 rounded-1">
              <BaseTable header={["Item", "Quantity", "Amount"]}>
                {orderList.items.map((item, i) => (
                  <tr key={i}>
                    <td>
                      <div className="d-flex">
                        <img
                          src={require(`../../../assets/customerDetails/${itemimg}.svg`)}
                          alt="logo"
                          className="rounded-circle"
                          width={40}
                          height={40}
                        />
                        <span className="ms-2 d-flex align-items-center">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.amount}</td>
                  </tr>
                ))}
              </BaseTable>
              <hr className="bg-dark border-1 border-top border-dark"></hr>
              <div className="d-flex justify-content-evenly ms-5 ps-4">
                <p className="fs-6">Total Amount:</p>
                <p className="fs-6">${orderList.totalAmount}</p>
              </div>
            </div>
          </div>
          <div
            className={`mt-5 ${
              urlPath.pathname === "/place-new-order" && "text-center"
            }`}
          >
            {urlPath.pathname === "/place-new-order" && (
              <BaseButton
                name="Confirm order"
                types="submit"
                defaultClass="btn btn-success rounded-1 me-3"
              />
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceNewOrder;
