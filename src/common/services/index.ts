import { apiClient } from "../hooks/useApiClient";

const { httpPost, httpGet } = apiClient();

export class RoosBaseServices {
  //image uploader
  getBaseToImage(base64): Promise<any> {
    return httpPost("roos-business-dev/createImage", {
      imageBase64: base64,
    }).then((response) => response);
  }

  //getAllDropdown
  getAllDropdown(): Promise<any> {
    return httpGet("/roos-menu-dev/getAllDropdown").then(
      (response) => response
    );
  }
}
