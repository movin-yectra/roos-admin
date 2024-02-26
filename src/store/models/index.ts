export class AddNewMenuModel {
  productNo: string;
  productName: string;
  addedIngredients: string;
  category: string;
  productDescription: string;
  price: string;
  imageOne: string;
  imageTwo: string;
  imageThree: string;
  businessId: string;
  customizations?: null;
}

export class AllDropdownModel {
  id: string;
  dropDownData: DropdownDataModel;
}
export class DropdownDataModel {
  currencyCode: string;
  plan: Array<DropdownCategoryModel>;
  serviceMode: Array<DropdownCategoryModel>;
  overview: Array<DropdownCategoryModel>;
  discountType: Array<DropdownCategoryModel>;
}
export class DropdownCategoryModel {
  name: string;
  code: string;
}

export class TaxValue {
  taxName: string;
  taxValue: string;
  taxUnits: string;
}
