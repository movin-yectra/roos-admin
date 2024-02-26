import React from "react";
import Statistics from "../pages/Statistics/Index";
import CategoryCustomize from "../pages/MenuManaging/components/CategoryCustomize";

// main layout
const MainLayout = React.lazy(() => import("../pages/MainLayout"));


// signup components
const PaymentFlow = React.lazy(() => import("../pages/SignUp/Index"));
const PaymentSuccessPage = React.lazy(
  () => import("../pages/SignUp/views/SuccessPage")
);

const AdminPayment = React.lazy(() => import("../pages/SignUp/views/Payment"));

// home components
const Home = React.lazy(() => import("../pages/Home/index"));
const Overview = React.lazy(() => import("../pages/Home/views/OverView"));
const PlaceNewOrder = React.lazy(
  () => import("../pages/Home/views/PlaceNewOrder")
);
const CustomerDetails = React.lazy(
  () => import("../pages/Home/views/CustomerDetails")
);

//menu managing components
const MenuManaging = React.lazy(() => import("../pages/MenuManaging/Index"));

const AddNewItem = React.lazy(
  () => import("../pages/MenuManaging/views/MenuList/AddNewItem")
);
const Customize = React.lazy(
  () => import("../pages/MenuManaging/components/Customize")
);
const CustomizeMenu = React.lazy(
  () => import("../pages/MenuManaging/components/CustomizeMenu")
);

const MenuList = React.lazy(
  () => import("../pages/MenuManaging/views/MenuList/MenuList")
);

//Coupens components
const Coupens = React.lazy(() => import("../pages/Coupens/Index"));
const CouponsList = React.lazy(
  () => import("../pages/Coupens/views/CouponsList")
);
const CreateCoupons = React.lazy(
  () => import("../pages/Coupens/views/CreateCoupons")
);

//Restaurant components
const Restaurant = React.lazy(() => import("../pages/RestaurantDetails/Index"));
const RestaurantDetails = React.lazy(
  () => import("../pages/RestaurantDetails/views/RestaurantBasicDetails")
);
const CuisineDetails = React.lazy(
  () => import("../pages/RestaurantDetails/views/RestaurantCuisineDetails")
);
const DateTime = React.lazy(
  () => import("../pages/RestaurantDetails/views/RestaurantDateTime")
);

const AddressDetails = React.lazy(
  () => import("../pages/RestaurantDetails/views/RestaurantAddressDetails")
);

const DeliveryZone = React.lazy(
  () => import("../pages/RestaurantDetails/views/RestaurantDeliveryZone")
);

const RestaurantPictures = React.lazy(
  () => import("../pages/RestaurantDetails/views/RestaurantPictures")
);

const TaxDetails = React.lazy(
  () => import("../pages/RestaurantDetails/views/RestaurantTaxDetails")
);
const RestaurantUrls = React.lazy(
  () => import("../pages/RestaurantDetails/views/RestaurantUrls")
);

// setting components
const SettingsList = React.lazy(() => import("../pages/Settings/Index"));
const MyDetails = React.lazy(() => import("../pages/Settings/views/MyDetails"));
const RestaurantProfile = React.lazy(
  () => import("../pages/Settings/views/RestaurantProfile")
);

const SettingsRestauranDetails = React.lazy(
  () => import("../pages/Settings/components/SettingRestaurantDetails")
);
const SettingCuisineDetails = React.lazy(
  () => import("../pages/Settings/components/SettingCuisineDetails")
);
const SettingDayTime = React.lazy(
  () => import("../pages/Settings/components/SettingDayTime")
);

const SettingAddress = React.lazy(
  () => import("../pages/Settings/components/SettingAddress")
);
const SettingDeliveryDetails = React.lazy(
  () => import("../pages/Settings/components/SettingDeliveryZone")
);
const SettingTaxDetails = React.lazy(
  () => import("../pages/Settings/components/SettingTaxDetails")
);
const SettingImages = React.lazy(
  () => import("../pages/Settings/components/SettingImages")
);
const SettingUrls = React.lazy(
  () => import("../pages/Settings/components/SettingUrls")
);
const SettingOthers = React.lazy(
  () => import("../pages/Settings/components/SettingOther")
);

//router config
let routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <Overview />,
          },
          {
            path: "/customer-details",
            element: <CustomerDetails />,
          },
          {
            path: "/place-new-order",
            element: <PlaceNewOrder />,
          },
        ],
      },

      {
        path: "/menu-managing",
        element: <MenuManaging />,
        children: [
          {
            path: "",
            element: <MenuList />,
          },
          {
            path: ":categoryName",
            element: <MenuList />,
          },
          {
            path: "add-newItem",
            element: <AddNewItem />,
          },
          {
            path: "add-newItem/customize",
            element: <Customize />,
          },
          {
            path: "add-newItem/customize-menu",
            element: <CustomizeMenu />,
          },

          {
            path: "edit-menu/:menuId",
            element: <AddNewItem />,
          },
          {
            path: "edit-menu/:menuId/customize",
            element: <Customize />,
          },
          {
            path: "edit-menu/:menuId/customize-menu",
            element: <CustomizeMenu />,
          },
          {
            path: "add-newItem/category-customize",
            element: <CategoryCustomize />,
          },
        ],
      },

      {
        path: "/statistics",
        element: <Statistics />,
      },
      {
        path: "/coupons",
        element: <Coupens />,
        children: [
          {
            path: "",
            element: <CouponsList />,
          },
          {
            path: "coupon-list",
            element: <CouponsList />,
          },
          {
            path: "create-coupon",
            element: <CreateCoupons />,
          },
          {
            path: "edit-coupon/:couponId",
            element: <CreateCoupons />,
          },
        ],
      },
      {
        path: "/setting",
        element: <SettingsList />,
        children: [
          {
            path: "",
            element: <MyDetails />,
          },
          {
            path: "my-details",
            element: <MyDetails />,
          },
          {
            path: "restaurant-profile",
            element: <RestaurantProfile />,
            children: [
              {
                path: "",
                element: <SettingsRestauranDetails />,
              },
              {
                path: "restaurant-details",
                element: <SettingsRestauranDetails />,
              },
              {
                path: "cuisine-details",
                element: <SettingCuisineDetails />,
              },
              {
                path: "date-time",
                element: <SettingDayTime />,
              },
              {
                path: "address",
                element: <SettingAddress />,
              },
              {
                path: "delivery-details",
                element: <SettingDeliveryDetails />,
              },
              {
                path: "tax-details",
                element: <SettingTaxDetails />,
              },
              {
                path: "images",
                element: <SettingImages />,
              },
              {
                path: "urls",
                element: <SettingUrls />,
              },
              {
                path: "others",
                element: <SettingOthers />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/payment",
    element: <PaymentFlow />,
    children: [
      // {
      //   path: "",
      //   element: <RestaurantSignup />,
      // },
      {
        path: "",
        element: <AdminPayment />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccessPage />,
      },
    ],
  },
  {
    path: "/restaurant-details",
    element: <Restaurant />,
    children: [
      {
        path: "",
        element: <RestaurantDetails />,
      },
      {
        path: "cuisine-details",
        element: <CuisineDetails />,
      },
      {
        path: "date-time",
        element: <DateTime />,
      },
      {
        path: "address-details",
        element: <AddressDetails />,
      },
      {
        path: "delivery-zone",
        element: <DeliveryZone />,
      },
      {
        path: "tax-details",
        element: <TaxDetails />,
      },
      {
        path: "restaurant-pictures",
        element: <RestaurantPictures />,
      },
      {
        path: "restaurant-urls",
        element: <RestaurantUrls />,
      },
    ],
  },
];
export default routes;
