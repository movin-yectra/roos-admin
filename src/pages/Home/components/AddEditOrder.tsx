import React, { useLayoutEffect, useState } from "react";

import BaseTable from "../../../common/components/ui/BaseTable";
import BaseButton from "../../../common/components/controls/BaseButton";
import BaseCheckBox from "../../../common/components/controls/BaseCheckBox";

import BaseInput from "../../../common/components/controls/BaseInput";

import {
  faPlus,
  faMinus,
  faMagnifyingGlass,
} from "../../../common/ui/Icons/Icons";
import { HomeService, IHomeService } from "../services";
import { OverviewResponseModel } from "../models";

const EditOrder: React.FC = () => {
  const service: IHomeService = new HomeService();
  const [orderList, setOrderList] = useState<OverviewResponseModel>(
    new OverviewResponseModel()
  );

  useLayoutEffect(() => {
    getResponse();
  }, []);

  const getResponse = () => {
    service.getOverview().then((response) => {
      setOrderList(response);
    });
  };

  // Increment the quantity
  const quantityIncrement = (id: number) => {
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
  const quantityDecrement = (id: number) => {
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

  return (
    <>
      <div>
        <button
          type="button"
          className="btn btn-outline-dark rounded-1 py-0 editorder"
          data-bs-toggle="modal"
          data-bs-target="#editorder"
        >
          Edit
        </button>
      </div>
      {/* ///////// Edit Model ///////////// */}
      <div
        className="modal fade fw-normal"
        id="editorder"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="d-flex justify-content-end ">
              <button
                type="button"
                className="btn-close mt-3 me-3"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-center align-items-center">
                <div className="col-7">
                  <BaseInput
                    name="search"
                    placeholder="Search..."
                    type="text"
                    inputClass="border-0"
                    inputIcon={faMagnifyingGlass}
                    iconPosition="start"
                    handleBlur={() => console.log("first")}
                    handleChange={() => console.log("second")}
                  />
                </div>
                <div className="ms-5">
                  <button
                    type="button"
                    className="btn btn-success rounded-1"
                    data-bs-toggle="modal"
                    data-bs-target="#addnewproduct"
                    data-bs-dismiss="modal"
                  >
                    Add New Product
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <BaseTable
                  classes="table-borderless"
                  header={["Item", "Quantity", "Added Ingredients", "Amount"]}
                  theadClass="text-start"
                >
                  {orderList.ongoingOrders.slice(0, 3).map((item, i) => (
                    <tr className="fw-normal text-start" key={i}>
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
                        <div className="d-flex">
                          <div className="d-flex align-items-center border rounded-1">
                            <div>
                              <BaseButton
                                icon={faMinus}
                                types="button"
                                defaultClass="btn ps-2"
                                handleClick={() =>
                                  quantityDecrement(item.orderId)
                                }
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
                                handleClick={() =>
                                  quantityIncrement(item.orderId)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex">
                          <div>
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
            <div className="d-flex justify-content-center m-3">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                Done
              </button>
            </div>
            <div>
              <p>This changes will reflect on customers bill</p>
            </div>
          </div>
        </div>
      </div>
      {/* ///////////// ADD Model ////////////// */}
      <div
        className="modal fade fw-normal"
        id="addnewproduct"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="d-flex justify-content-end ">
              <button
                type="button"
                className="btn-close mt-3 me-3"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-center align-items-center">
                <div className="col-7">
                  <BaseInput
                    name="search"
                    placeholder="Search..."
                    type="text"
                    inputClass="border-0"
                    inputIcon={faMagnifyingGlass}
                    handleBlur={() => console.log("first")}
                    handleChange={() => console.log("second")}
                  />
                </div>
              </div>
              <div className="mt-4">
                <BaseTable
                  classes="table-borderless"
                  header={["Item", "Quantity", "Added Ingredients", "Amount"]}
                  theadClass="text-start"
                >
                  {orderList.ongoingOrders.slice(0, 3).map((item, i) => (
                    <tr className="fw-normal text-start" key={i}>
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
                                icon={faMinus}
                                types="button"
                                defaultClass="btn ps-2"
                                handleClick={() =>
                                  quantityDecrement(item.orderId)
                                }
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
                                handleClick={() =>
                                  quantityIncrement(item.orderId)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex">
                          <div>
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
            <div className="d-flex justify-content-center m-3">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                Added
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditOrder;
