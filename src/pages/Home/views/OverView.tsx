import React, { useState, useEffect, useCallback } from "react";

//custom components
import BaseDropDown from "../../../common/components/controls/BaseDropDown";
import BaseTable from "../../../common/components/ui/BaseTable";
import BaseButton from "../../../common/components/controls/BaseButton";
import BaseInput from "../../../common/components/controls/BaseInput";
import BaseIcon from "../../../common/components/ui/BaseIcon";

//models
import { ListItem } from "../../../common/models/index";
import { OrderModel } from "../models/index";

//components
import OrderPreview from "../components/OrderPreview";
import OrderDetails from "../components/OrderDetails";

//services
import { HomeService, IHomeService } from "../services/index";

//icons
import { faCaretDown } from "../../../common/ui/Icons/Icons";

//custom Hooks
import { useDropdown } from "../../../common/hooks/useControls";
import { useMsal } from "@azure/msal-react";

//store
import { useAppSelector } from "../../../store";

const Overview: React.FC = () => {
  const [status, setStatus] = useState<string>("Accepted");
  const [color, setColor] = useState<string>("primary");
  const businessId = useAppSelector((store) => store.businessId.businessId);

  const dropdownResponse: ListItem[] = [];
  const [showOrderDetails, setShowOrderDetails] = useState<boolean>(false);

  const [orderIndex, setOrderIndex] = useState<number>();
  const [orders, setOrders] = useState<OrderModel[]>();

  const service: IHomeService = new HomeService();

  const { accounts } = useMsal();

  const userId = accounts[0].localAccountId;

  const {
    dropdownHandleClick,
    toggleDropdown,
    refOutside,
    selectedDropdownValue,
    setSelectedDropdownValue,
  } = useDropdown();

  const dropdownDown = [
    { name: "Accepted", value: "ACCEPTED", displayName: "primary" },
    { name: "Preparing", value: "PREPARING", displayName: "warning" },
    {
      name: "Out for Delivery",
      value: "OUTFORDELIVERY",
      displayName: "success",
    },
    { name: "Delivered", value: "DELIVERED", displayName: "secondary" },
    { name: "Cancelled", value: "CANCELLED", displayName: "danger" },
  ];

  const tableHeader = [
    "Order No",
    "Customer Name",
    "Amount",
    "Pay Via",
    "Order Status",
  ];

  useEffect(() => {
    if (dropdownDown && Array.isArray(dropdownDown)) {
      dropdownDown.forEach((list) => {
        if (list.name !== "Accepted") {
          let item: ListItem = new ListItem();
          item.text = list.name;
          item.value = list.value;
          item.displayName = list.displayName;
          dropdownResponse.push(item);
        }
      });
    }
  }, []);

  const getAllOrders = useCallback(() => {
    console.log("userAcc: ", accounts[0]);
    console.log("businessId: ", businessId);
    service
      .getAllOrders(businessId)
      .then((response) => {
        console.log("orders: ", response);
        const ordersResponse = response.filter(
          (order) => order.orderStatus === "PAID" && order
        );
        console.log(ordersResponse);
        setOrders(ordersResponse);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [businessId]);

  console.log("orders: ", orders);
  console.log("userId: ", userId);
  console.log("businessId: ", businessId);

  const updateOrderStatus = (orderId: string, orderStatus: string) => {
    service
      .updateOrderStatus(orderId, orderStatus)
      .then((response) => {
        console.log(response);
        dropdownResponse.forEach((option) => {
          if (option.value === orderStatus) {
            console.log(option);
            setColor(option.displayName);
            setStatus(option.text);
          }
        });
        getAllOrders();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllOrders();
    console.log(orders);
  }, [setOrders]);

  const handleOrderDetails = (index) => {
    setShowOrderDetails(true);
    setOrderIndex(index);
  };

  return (
    <>
      <div className="row mt-5 g-0 mb-3">
        <div className="col-md-8 ps-5 pe-3">
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="fs-5">Overview</p>
              <div className="col-3" ref={refOutside}>
                <BaseDropDown
                  listOfOptions={dropdownResponse}
                  defaultClass=""
                  toggle={toggleDropdown}
                  onChange={(value: ListItem) => {
                    setSelectedDropdownValue(value);
                  }}
                  name="status"
                  handleClick={dropdownHandleClick}
                >
                  <BaseInput
                    name="status"
                    inputClass="border-body rounded-1 shadow-none"
                    placeholder="Status"
                    value={selectedDropdownValue.value}
                    inputIcon={faCaretDown}
                    readOnly
                  />
                </BaseDropDown>
              </div>
            </div>

            <div className="row gx-4 py-3">
              <div className="col-md-4">
                <div className="card border-light rounded-1">
                  <div className="card-body d-flex align-items-center justify-content-around">
                    <div>
                      <p className="m-0 fs-6 fw-medium lh-4">Preparing</p>
                      <p className="fs-8 text-body-secondary m-0">Total</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-light rounded-1">
                  <div className="card-body d-flex align-items-center justify-content-around">
                    <div>
                      <p className="m-0 fs-6 fw-medium lh-4">On the way</p>
                      <p className="fs-8 text-body-secondary m-0">Total</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-light rounded-1">
                  <div className="card-body d-flex align-items-center justify-content-around">
                    <div>
                      <p className="m-0 fs-6 fw-medium lh-4">Delivered</p>
                      <p className="fs-8 text-body-secondary m-0">Total</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div>
              <p className="text-start fw-medium fs-5 lh-1">Ongoing orders</p>
            </div>

            <BaseTable
              classes="table-borderless"
              header={tableHeader}
              theadClass="theadStyle"
              tbodyClass="tbodyStyle"
            >
              {orders &&
                orders.map((item: OrderModel, i: number) => (
                  <tr
                    className="tbodyStyle"
                    key={i}
                    onClick={() => handleOrderDetails(i)}
                  >
                    <td role="button">{item?.orderNo}</td>
                    <td>
                      <div>
                        <span
                          className="ms-2 user-name"
                          role="button"
                          id="user-name"
                        >
                          {item?.userName}
                        </span>
                      </div>
                    </td>
                    <td>{item?.grandTotal.toFixed(2)}</td>
                    <td>Credit Card</td>
                    <td className={`p-0 d-flex justify-content-center`}>
                      <div
                        className={`m-1 py-2 bg-${color}-subtle text-${color} rounded-3`}
                        ref={refOutside}
                      >
                        <BaseDropDown
                          listOfOptions={dropdownResponse}
                          defaultClass="mx-2 pe-2"
                          toggle={toggleDropdown}
                          onChange={(value: ListItem) => {
                            console.log(value.value);
                            console.log(orders[i]?.id);
                            updateOrderStatus(orders[i]?.id, value.value);
                          }}
                          name="orderStatus"
                          handleClick={dropdownHandleClick}
                          listStyleActive
                          listClass="mt-2 p-1 overflow-visible"
                        >
                          <BaseButton
                            name={status}
                            defaultClass={`bg-${color}-subtle text-${color} border-0`}
                          />
                          <BaseIcon icon={faCaretDown} />
                        </BaseDropDown>
                      </div>
                    </td>
                  </tr>
                ))}
            </BaseTable>
          </div>
        </div>

        <div className="col-md-4">
          {showOrderDetails ? (
            <div>
              {orders && (
                <div className="mt-4">
                  <div className="m-3">
                    <div className="row g-0 align-items-center pb-2">
                      <p className="text-center fw-medium fs-5 lh-3">
                        Order Details
                      </p>
                    </div>
                    <OrderDetails orderDetails={orders[orderIndex!]} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <OrderPreview />
          )}
        </div>
      </div>
    </>
  );
};

export default Overview;
