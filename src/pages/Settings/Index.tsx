import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

//custom components
import BaseButton from "../../common/components/controls/BaseButton";

//services
import { SettingServices } from "./services";

import { useAppDispatch, useAppSelector } from "../../store";
import { setSettingRestaurantResponse } from "../../store/features/restaurantDetailsSlice";
import { useAppAlert } from "../../common/hooks/useAppAlert";

const SettingsList: React.FC = () => {
  const bgImage = "bgImage";
  const settingsIcon = "settingsIcon";

  const location = useLocation();
  const { setIsLoading, setResponseMassage, setShowModel } = useAppAlert();

  const selectors = useAppSelector((store) => store.businessId);
  const restaurantSelectors = useAppSelector((store) => store.restaurant);

  // const restaurantName = restaurantSelectors.restaurant.restaurantName
  //   .toLowerCase()
  //   .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());

  const _services = new SettingServices();

  const settingActive =
    location.pathname === "/setting" && "text-white setting-nav-active";

  const links = [
    {
      name: "My Details",
      path: "my-details",
      active: settingActive,
    },
    {
      name: "Restaurant Profile",
      path: "restaurant-profile",
    },
  ];

  const updateRestaurantDetails = () => {
    setIsLoading(true);
    _services
      .updateRestaurantDetails(
        selectors.businessId,
        restaurantSelectors.restaurant
      )
      .then((response) => {
        if (response) {
          setResponseMassage({
            message: "Successfully Update Restaurant details",
            statusCode: 200,
          });
          setTimeout(() => {
            setIsLoading(false);

            setShowModel(true);
          }, 3000);
        }
      })
      .catch((errors) => {
        setResponseMassage({
          message: errors.message,
          statusCode: 404,
        });
        setTimeout(() => {
          setIsLoading(false);

          setShowModel(true);
        }, 3000);
      });
  };

  useEffect(() => {
    // getRestuarentData();
  }, [selectors]);

  return (
    <>
      <div className="mx-5">
        <div className="position-relative">
          <div className="">
            <img
              src={require(`../../assets/settings/${bgImage}.svg`)}
              alt="logo"
              className="bgImage"
              width="100%"
              height="230px"
            />
          </div>
          <div className="position-absolute settingBanner">
            <img
              src={require(`../../assets/settings/${settingsIcon}.svg`)}
              alt="logo"
              className="z-2"
              width="90"
              height="90"
            />
            <label className="fw-semibold fs-5 ms-3">
              {restaurantSelectors.restaurant.restaurantName}
            </label>
          </div>
        </div>

        <div className="mt-4 pt-3 d-flex align-items-end justify-content-between border-bottom border-2">
          <nav className="nav nav-tabs border-0" id="settings-tab">
            {links.map((link, index) => (
              <li className="nav-item" key={index}>
                <NavLink
                  to={link.path}
                  key={index}
                  className={({ isActive }) =>
                    `nav-link text-secondary  ${link.active} ${
                      isActive ? "text-white setting-nav-active" : ""
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </nav>
          {/* {location.pathname.startsWith("/setting/restaurant-profile") && (
            <div>
              <div className="d-flex align-items-end justify-content-end">
                <BaseButton
                  id="update-save"
                  defaultClass="btn btn-warning ms-4"
                  name="Update"
                  types="button"
                  handleClick={updateRestaurantDetails}
                />
              </div>
            </div>
          )} */}
        </div>
        <div className="p-3">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SettingsList;
