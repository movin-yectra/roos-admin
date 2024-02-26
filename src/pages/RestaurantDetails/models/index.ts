export class RestaurantDataModel {
  name: string;
  description: string;
  image: string;
  //localAccountId: string;
}
export interface AvailableServingModel {
  checked: any;
  value: any;
  availableTypes: Array<string>;
  servingType: Array<string>;
}

export interface PaymentMethodModel {
  paymentMethod: string[];
}

export class AddressDetailsModel {
  address: string = "";
  city: string = "";
  country: string = "";
  state: string = "";
  zipcode: string = "";
  deliveryZone: string = "";
}

export class RestaurantImagesModel {
  imageOne: string;
  imageTwo: string;
  imageThree: string;
}

export class RestaurantMediaUrlModel {
  website: string;
  business: string;
  facebook: string;
  instagram: string;
  localAccountId: string;
  contactNo?: string;
}

export class RestaurantServiceModel {
  restaurantData: RestaurantDataModel;
}

export interface ISelectedTimes {
  day: string;
  openAt: string;
  closeAt: string;
}

export interface OpeningHours {
  closed: boolean;
  openAt: string;
  closeAt: string;
}

export class RestaurantOpenCloseTimeModel {
  MONDAY: OpeningHours;
  TUESDAY: OpeningHours;
  WEDNESDAY: OpeningHours;
  THURSDAY: OpeningHours;
  FRIDAY: OpeningHours;
  SATURDAY: OpeningHours;
  SUNDAY: OpeningHours;
}

export class CuisineDetailsModal {
  availableTypes: AvailableServingTypes[];
  servingType: AvailableServingTypes[];
}

export class AvailableServingTypes {
  value: string;
  checked: boolean;
}

export interface OpenCloseTime {
  day: string;
  closed: boolean;
  timings: Array<OpenCloseModel>;
}

export interface OpenCloseModel {
  openAt: string;
  closeAt: string;
}

export class ServiceType {
  serviceMode: string;
  restaurantOpenCloseTime: OpenCloseTime[];
}

export class DayTimeServices {
  service: ServiceType[];
}

export class DeliveryTypesModel {
  preparingTime: string;
  deliveryMode?: string;
  isDeliveryRadius: boolean;
  isDeliveryZipcode: boolean;
  deliveryFee?: Array<DeliveryFeeModel>;
}

export class DeliveryFeeModel {
  deliveryRadius: string;
  deliveryFee: string;
  symbol: string;
}

export class TaxDetailsModel {
  taxDetails: Array<TaxValue>;
}

export class TaxValue {
  taxName: string;
  taxValue: string;
  taxUnits: string;
}
