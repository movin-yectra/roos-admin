import { apiClient } from "../../../common/hooks/useApiClient";

import {
  AddNewProductModel,
  MainCourseResponseModel,
  createCategoryModel,
} from "../models/index";

const { httpGet, httpPost, httpPut, httpDelete, httpPatch } = apiClient();

export interface IMenuService {
  getMainCourseMenu(): Promise<MainCourseResponseModel[]>;
  createMenu(value: any): Promise<any>;
  getAllMenu(businessId: string): Promise<any>;
  getMenuList(businessId: string, categoryName: string): Promise<any>;
  getMenuItem(menu: string): Promise<any>;
  updateMenu(menuId: string, value: AddNewProductModel): Promise<any>;
  deleteMenu(menu: string): Promise<any>;

  createCategory(value: any): Promise<any>;
  getCategory(businessId: string): Promise<createCategoryModel>;
  updateCategory(categoryId: string, value: any): Promise<any>;
  deleteCategory(id: string, categoryId: number): Promise<any>;

  getCustomization(menuId: string): Promise<any>;
  getMenuSearch(businessId: string, search: string): Promise<any>;
  updateCustomization(menuId: string, value: any): Promise<any>;
}

export class MenuService implements IMenuService {
  getMenuSearch(businessId: string, search: string): Promise<any> {
    return httpGet(
      `roos-menu-dev/Search?businessId=${businessId}&search=${search}`
    ).then((response) => {
      return response;
    });
  }

  getMainCourseMenu(): Promise<MainCourseResponseModel[]> {
    return httpGet<MainCourseResponseModel[]>("mainCourse-details").then(
      (response) => {
        return response;
      }
    );
  }

  createMenu(value: any): Promise<any> {
    return httpPost("roos-menu-dev/Post", value).then((response) => {
      return response;
    });
  }

  getAllMenu(businessId: string): Promise<any> {
    return httpGet(`roos-menu-dev/GetAll?businessId=${businessId}`).then(
      (response) => {
        return response;
      }
    );
  }

  getMenuItem(menuId: string): Promise<any> {
    return httpGet(`roos-menu-dev/Get?id=${menuId}`).then((response) => {
      return response;
    });
  }

  getMenuList(businessId: string, categoryName: string): Promise<any> {
    return httpGet(
      `roos-menu-dev/GetListAll?businessId=${businessId}&category=${categoryName}`
    ).then((response) => {
      return response;
    });
  }

  updateMenu(menuId: string, value: AddNewProductModel): Promise<any> {
    return httpPut("roos-menu-dev/Put?id=" + menuId, value).then((response) => {
      return response;
    });
  }

  deleteMenu(menuId: string): Promise<any> {
    return httpDelete("roos-menu-dev/Delete?id=" + menuId).then((response) => {
      return response;
    });
  }

  createCategory(value: createCategoryModel): Promise<any> {
    return httpPost("roos-business-dev/postCategory", value).then(
      (response) => {
        return response;
      }
    );
  }

  getCategory(businessId: string): Promise<any> {
    return httpGet(
      `roos-business-dev/getCategoryListByBusinessId?businessId=${businessId}`
    ).then((response) => {
      return response;
    });
  }

  updateCategory(categoryId: string, value: any): Promise<any> {
    return httpPut(
      `/roos-business-dev/putCategory?id=${categoryId}`,
      value
    ).then((response) => {
      return response;
    });
  }

  deleteCategory(id: string, categoryId: number): Promise<any> {
    return httpDelete(
      `roos-business-dev/deleteCategoryByBusinessId?businessId=${id}&categoryId=${categoryId}`
    ).then((response) => {
      return response;
    });
  }

  //Customization
  getCustomization(menuId?: any): Promise<any> {
    return httpGet("roos-menu-dev/getCustomizations?id=" + menuId).then(
      (response) => {
        return response;
      }
    );
  }

  updateCustomization(menuId?: string, value?: any): Promise<any> {
    return httpPut(
      "roos-menu-dev/updateCustomization?id=" + menuId,
      value
    ).then((response) => {
      return response;
    });
  }

  createCustomization(
    menuId?: string,
    category?: string,
    value?: any
  ): Promise<any> {
    return httpPatch(
      "roos-menu-dev/patchCustomization?id=" +
        menuId +
        "&categoryName=" +
        category,
      value
    ).then((response) => {
      return response;
    });
  }

  deleteCustomization(
    menuId?: string,
    category?: string,
    optionId?: number
  ): Promise<any> {
    return httpDelete(
      "roos-menu-dev/deleteCustomization?id=" +
        menuId +
        "&category=" +
        category +
        "&optionId=" +
        optionId
    ).then((response) => response);
  }
}
