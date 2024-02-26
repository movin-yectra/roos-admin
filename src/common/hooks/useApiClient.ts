import ApiClient from "../../lib/axios/index";

export const apiClient = () => {
  const apiService = new ApiClient();

  const httpGet =<T> (path: string):Promise<T> => {
    return apiService.get(path).then((response) => {
      return response as T;
    });
  };

  const httpDelete = <T>(path: string): Promise<T> => {
    return apiService.delete(path).then((response) => {
      return response as T;
    });
  };

  const httpPost = (path: string, payload: any) => {
    return apiService.post(path, payload).then((response) => {
      return response;
    });
  };

  const httpPut = (path: string, payload: any) => {
    return apiService.put(path, payload).then((response) => {
      return response;
    });
  };

  const httpPatch = (path: string, payload: any) => {
    return apiService.patch(path, payload).then((response) => {
      return response;
    });
  };

  return { httpGet, httpPost, httpPatch, httpPut, httpDelete };
};
