import {
  OverviewResponseModel,
  UserDetailsResponseModel,
} from "../models/index";

import { apiClient } from "../../../common/hooks/useApiClient";

const { httpGet, httpPut } = apiClient();

export interface IHomeService {
  getOverview(): Promise<OverviewResponseModel>;
  getUserDetails(): Promise<UserDetailsResponseModel>;
  getBusinessId(userId: string): Promise<any>;
  getByEmail(email: string): Promise<any>;
  getByBusinessId(localAccountId: string, userId?: string): Promise<any>;
  getAllOrders(businessId: string): Promise<any>;
  updateOrderStatus(orderId: string, orderStatus: string): Promise<any>;
}
export class HomeService implements IHomeService {
  getOverview(): Promise<OverviewResponseModel | any> {
    return httpGet("order-details").then((response) => {
      return response;
    });
  }

  getUserDetails(): Promise<UserDetailsResponseModel | any> {
    return httpGet("user-details").then((response) => {
      return response;
    });
  }

  getBusinessId(userId: string): Promise<any> {
    return httpGet(`roos-business-dev/get?id=${userId}`).then(
      (response) => response
    );
  }

  getByEmail(email: string): Promise<any> {
    return httpGet(`roos-users-dev/getByEmail?email=${email}`).then(
      (response) => {
        return response;
      }
    );
  }

  getByBusinessId(localAccountId: string, userId?: string): Promise<any> {
    return httpGet(
      `roos-business-dev/getBusinessId?localAccountId=${localAccountId}`
    ).then((response) => {
      return response;
    });
  }

  getAllOrders(businessId: string): Promise<any> {
    return httpGet(`roos-order-dev/GetOrders?businessId=${businessId}`).then(
      (response) => response
    );
  }

  updateOrderStatus(orderId: string, orderStatus: string): Promise<any> {
    return httpPut(
      `roos-order-dev/UpdateStatus?id=${orderId}`,
      orderStatus
    ).then((response) => response);
  }
}
