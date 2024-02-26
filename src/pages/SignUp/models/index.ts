export class SignupCustomerModel {
  name: string;
  email: string;
  mobileNumber: string;
  category: string;
  localAccountId: string;
}

export class SignupRestaurantModel {
  restaurantName: string;
  websiteUrl: string;
  availableTypes: Array<string> = [];
  category: string;
}

export class SignupAdressDetailsmodel {
  address: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
}
