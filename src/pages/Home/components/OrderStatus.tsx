import React, { useState } from "react";

//models
import { ListItem } from "../../../common/models/index";

//custom components
import BaseDropDown from "../../../common/components/controls/BaseDropDown";
import BaseButton from "../../../common/components/controls/BaseButton";
import BaseIcon from "../../../common/components/ui/BaseIcon";
import { faCaretDown } from "../../../common/ui/Icons/Icons";

//custom Hooks
import { useDropdown } from "../../../common/hooks/useControls";

//store
import { HomeService, IHomeService } from "../services";

interface IProps {
  orderId: string;
  getAllOrders: any;
}

const OrderStatus: React.FC<IProps> = ({ orderId, getAllOrders }) => {
  const service: IHomeService = new HomeService();

  const [status, setStatus] = useState<string>("Accepted");
  const [color, setColor] = useState<string>("primary");

  const dropdownResponse: ListItem[] = [];
  const { dropdownHandleClick, toggleDropdown, refOutside } = useDropdown();

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

  return (
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
          console.log(orderId);
          updateOrderStatus(orderId, value.value);
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
  );
};

export default OrderStatus;
