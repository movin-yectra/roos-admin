import { apiClient } from "../../../common/hooks/useApiClient";

const { httpPost, httpGet } = apiClient();

export class RestarurantServices {
  restaurantCreateApi(path: string, value: any): Promise<any> {
    return httpPost(`roos-business-dev/${path}`, value).then(
      (response: any) => response
    );
  }
  cuisineDetailsGetApi(path: string): Promise<any> {
    return httpGet(`roos-business-dev/${path}`).then((response) => response);
  }
}
