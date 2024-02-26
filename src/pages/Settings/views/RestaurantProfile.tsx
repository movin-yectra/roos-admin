import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const RestaurantProfile = () => {
  const [rerender, setRerender] = useState<boolean>(false);
  const urlPath = useLocation();

  const settingRestaurantProfileActive =
    urlPath.pathname === "/setting/restaurant-profile" && "setting-active";

  const links = [
    {
      name: "Restaurant",
      path: "restaurant-details",
      active: settingRestaurantProfileActive,
    },
    { name: "Cuisine", path: "cuisine-details" },
    { name: "Timings", path: "date-time" },
    // { name: "Payment methods", path: "payment-method" },
    { name: "Address", path: "address" },
    { name: "Delivery Zone", path: "delivery-details" },
    { name: "Tax", path: "tax-details" },
    { name: "Images", path: "images" },
    { name: "URLs", path: "urls" },
    { name: "Others", path: "others" },
  ];

  useEffect(() => {}, [rerender]);

  return (
    <>
      <div>
        <div className="d-flex">
          {links.map((link, index) => (
            <NavLink
              to={link.path}
              key={index}
              className={({ isActive }) =>
                `nav-link px-2 me-4 rounded border ${link.active} ${
                  isActive && "setting-active"
                }`
              }
              onChange={() => setRerender(!rerender)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="mt-3">
        <Outlet />
      </div>
    </>
  );
};

export default RestaurantProfile;
