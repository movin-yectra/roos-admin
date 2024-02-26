import { apiClient } from "../../../common/hooks/useApiClient";

const { httpGet, httpPut } = apiClient();

export class SettingServices {
  restaurantGetApi(id: string): Promise<any> {
    return httpGet(`roos-business-dev/get?id=${id}`).then(
      (response: any) => response
    );
  }
  updateRestaurantDetails(path: string, value): Promise<any> {
    return httpPut(`roos-business-dev/put?id=${path}`, value).then(
      (response) => response
    );
  }
}
