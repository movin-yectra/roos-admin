import { apiClient } from "../../../common/hooks/useApiClient";

const { httpPost, httpGet } = apiClient();

export class RestaeurantSignupServices {
  signup(path: string, value: any): Promise<any> {
    const response = httpPost(path, value).then((response: any) => response);
    return response;
  }
  restaeurantSignupPost(value: any): Promise<any> {
    const response = httpPost("roos-users-dev/postUsers", value).then(
      (response: any) => response
    );
    return response;
  }
  //Stripe API
  getClientSecret(): Promise<any> {
    return httpGet("roos-order-dev/getClientSecret").then(
      (response) => response
    );
  }
}
