export class MainCourseResponseModel {
  itemNo: number;
  itemImage: any;
  itemName: string;
  itemDescription: string;
  addedIngredients: string;
  price: number;
}
export class menuListResponseModel {
  productNo: string;
  productName: string;
  addedIngredients: string;
  productDescription: string;
  category: string;
  imageOne: string;
  imageTwo: string;
  imageThree: string;
  price: number;
  id: string;
  businessId: string;
}

export class AddNewProductModel {
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
}

export class createCategoryModel {
  businessId: string;
  category: Array<categoryValueModel>;
  id: string;
}

export class categoryValueModel {
  categoryId: number;
  code: string;
  value: string;
}

//CustomizedList model

export class CustomizedListModel {
  id?: string;
  category: string;
  options: Array<CustomizedItemModel>;
}

export class CustomizedItemModel {
  optionId?: number;
  itemName: string;
  price: number;
  quantity: string;
  image: string;
}
