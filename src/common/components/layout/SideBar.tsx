import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  faArrowTrendUp,
  faGear,
  faHouse,
  faRightFromBracket,
  faTags,
  faUtensils,
} from "../../../common/ui/Icons/Icons";
import BaseIcon from "../ui/BaseIcon";
import BaseButton from "../controls/BaseButton";
import { useMsal } from "@azure/msal-react";

const SideBar: React.FC = () => {
  const { instance } = useMsal();
  const urlPath = useLocation();
  const logo = "logo";

  const sidebarActive =
    urlPath.pathname === "/customer-details"
      ? "sidbar-active"
      : urlPath.pathname === "/place-new-order"
      ? "sidbar-active"
      : "";

  const navLink = [
    { to: "/", name: "Home", icon: faHouse, active: sidebarActive },
    { to: "/menu-managing", name: "Menu Managing", icon: faUtensils },
    { to: "/coupons", name: "Coupons", icon: faTags },
    { to: "/statistics", name: "Statistics", icon: faArrowTrendUp },
    { to: "/setting", name: "Settings", icon: faGear },
  ];

  const handleLogout = () => {
    console.log("logout");
    instance.logoutRedirect();
  };

  return (
    <>
      <div
        className="position-fixed col-2 bg-white"
        style={{ top: 0, bottom: 0, right: 0, left: 0, width: "17%" }}
      >
        <div className="brand my-3 d-flex align-items-center justify-content-center gap-2">
          <img
            src={require(`../../../assets/${logo}.svg`)}
            alt="logo"
            width="39px"
            height="26px"
          />
          <p className="fw-medium fs-4 lh-3 mt-3">Roos</p>
        </div>
        <div className="navbar-nav">
          <ul className="list-unstyled rounded-0 fw-semibold">
            {navLink.map((link, index) => (
              <li className="sidebar-hover" key={link.name + "--" + index}>
                <NavLink
                  to={link.to}
                  // className={`nav-link py-3 pe-3 d-flex align-items-center ${link.active}`}
                  className={({ isActive }) =>
                    `nav-link py-3 pe-3 d-flex align-items-center ${
                      link.active
                    } ${isActive ? `sidbar-active ` : ""}`
                  }
                >
                  <span className="notification-icon">
                    <BaseIcon icon={link.icon} />
                  </span>

                  <span className="ms-2 fs-6 fw-medium lh-5">{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="m-5">
          <BaseButton
            defaultClass="btn text-black"
            name="Logout"
            icon={faRightFromBracket}
            iconPosition="end"
            iconColor="#FF3A29"
            handleClick={handleLogout}
          />
        </div>
      </div>
    </>
  );
};
export default SideBar;
