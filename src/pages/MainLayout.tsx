import React, { useEffect, useState } from "react";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";

import AppHeader from "../common/components/layout/AppHeader";
import SideBar from "../common/components/layout/SideBar";
import { fetchCategories } from "../store/features/categorySlice";

import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest } from "../config/auth";
import {
  AuthenticatedTemplate,
  useIsAuthenticated,
  useMsal,
} from "@azure/msal-react";
import { HomeService, IHomeService } from "./Home/services";
import { useAppAlert } from "../common/hooks/useAppAlert";
import { addBusinessId } from "../store/features/businessIdSlice";
import { setSettingRestaurantResponse } from "../store/features/restaurantDetailsSlice";

const MainLayout: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setIsLoading } = useAppAlert();
  const isAuthenticated = useIsAuthenticated();

  const [navigatePage, setNavigatePage] = useState(false);

  const service: IHomeService = new HomeService();

  const { instance, inProgress, accounts } = useMsal();

  let value = accounts[0]?.username;
  let localAccountId = accounts[0]?.localAccountId;

  useEffect(() => {
    if (inProgress === InteractionStatus.None && !isAuthenticated) {
      instance.loginRedirect(loginRequest);
    }
  }, []);

  const hideSidebarNavbar =
    location.pathname.startsWith("/payment") ||
    location.pathname.startsWith("/restaurant-details");
    
 

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setIsLoading(true);
      
      service
        .getByBusinessId(localAccountId)
        .then((response) => {
          setNavigatePage(true);
          dispatch(addBusinessId(response.id));
          dispatch(setSettingRestaurantResponse(response));
          dispatch(fetchCategories(response.id));
          setIsLoading(false);
        })
        .catch((error) => {
          setNavigatePage(false);
          setIsLoading(false);
          navigate("/payment");
        });
    } else {
      setIsLoading(false);
    }
  }, [value]);

  return (
    <>
      <AuthenticatedTemplate>
        {navigatePage && (
          <>
            {hideSidebarNavbar ? (
              <Outlet />
            ) : (
              <div className="d-flex wrapper">
                <div className="sidebar">
                  <SideBar />
                </div>
                <div className="main">
                  <AppHeader />
                  <Outlet />
                </div>
              </div>
            )}
          </>
        )}
      </AuthenticatedTemplate>
    </>
  );
};
export default MainLayout;
