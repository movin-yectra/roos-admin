import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { faBell } from "../../ui/Icons/Icons";
import BaseIcon from "../ui/BaseIcon";
import SearchBar from "./SearchBar";

import { ListItem } from "../../models";
import BaseDropDown from "../controls/BaseDropDown";
import { useMsal } from "@azure/msal-react";

const AppHeader: React.FC = () => {
  const avatar = "avatar";
  const location = useLocation();

  const { accounts } = useMsal();

  const [userName, setUserName] = useState<any>();

  useEffect(() => {
    if (accounts.length > 0) {
      setUserName(accounts[0].username?.split("@")[0]);
    }
  }, [accounts]);

  const notificationItem = [
    { name: "Notifications" },
    { name: "New asset recommendations in Gaming Laptop" },
    { name: "You have 3 new themes trending" },
    { name: "New asset recommendations in 5 themes" },
  ];

  const profileItem = [
    "Profile",
    "Notifications",
    "Reviews",
    "History",
    "Log out",
  ];

  const isArray = (arr: any) => {
    return (
      Array.isArray(arr) &&
      arr.every((item) => typeof item !== "object" || item === null)
    );
  };

  const isArrayOfObjects = (arr: any) => {
    if (!Array.isArray(arr)) {
      return false;
    }
    for (const item of arr) {
      if (typeof item !== "object" || item === null || Array.isArray(item)) {
        return false;
      }
    }
    return true;
  };

  const dropDownMapping = (dropDownItem): ListItem[] => {
    return dropDownItem.map((list: any) => {
      let item: ListItem = new ListItem();
      if (isArrayOfObjects(dropDownItem)) {
        item.text = list.name;
      }
      if (isArray(dropDownItem)) {
        item.text = list;
      }
      return item;
    });
  };

  const notificationItems = dropDownMapping(notificationItem);
  const profileItems = dropDownMapping(profileItem);

  return (
    <div className="row g-0 mt-3">
      <div className="col-md-9">
        {(location.pathname == "/" ||
          location.pathname == "/menu-managing/add-newItem/customize-menu") && (
          <SearchBar
            searchMenu={function (data: string): void {
              throw new Error("Function not implemented.");
            }}
          />
        )}
      </div>

      <div className="col-md-3">
        <div className="d-flex justify-content-evenly align-items-center me-3">
          <div className="pe-3 notification-icon">
            <BaseDropDown
              name="Notifications"
              defaultClass=""
              listClass="p-1"
              listOfOptions={notificationItems}
              onChange={() => {}}
              listStyleActive={false}
            >
              <BaseIcon icon={faBell} classes="icon cursor-pointer" />
              <span className="position-absolute translate-middle badge rounded-circle bg-danger">
                3
              </span>
            </BaseDropDown>
          </div>

          <div className="display-flex flex-row text-center">{userName}</div>

          <div>
            <BaseDropDown
              name="Profile"
              defaultClass=""
              listClass="p-1 position-absolute profile-dropdown"
              listOfOptions={profileItems}
              onChange={() => {}}
              listStyleActive={false}
            >
              <img
                src={require(`../../../assets/customerDetails/${avatar}.svg`)}
                alt="logo"
                className="rounded-circle cursor-pointer"
                width={40}
                height={40}
              />
            </BaseDropDown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
