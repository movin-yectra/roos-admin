export class ListItem {
  text: string;
  value: any;
  displayName: any;
  selected: boolean;
  target: ListItem;
  type: ListItem;

  constructor(text: string = "", value: any = "") {
    this.text = text;
    this.value = value ? value : this.text;
  }
}

export class RestaurantCreateModel {
  localAccountId: string;
  businessId?: string;
  type?: string;
  restaurantName: string;
  restaurantLogo: string;
  description: string;
  serviceTypes: Array<ServiceType>;
  address: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  deliveryZone: string;
  imageOne: string;
  imageTwo: string;
  imageThree: string;
  websiteUrl: string;
  businessUrl: string;
  facebookId: string;
  instagramId: string;
  leadTime: string;
  deliveryMode?: string;
  deliveryRadius: boolean;
  deliveryZipcode: boolean;
  deliveryFee?: Array<DeliveryFeeModel>;
  taxDetails: Array<TaxValue>;
  autoAccept?: boolean;
  apiKey?: string;
  apiToken?: string;
  selectedServices: Array<string>;
  autoPrint?: boolean;
  contactNo?: string;
}

export interface AvailableServingTypes {
  value: string;
  checked: boolean;
}
export class DeliveryFeeModel {
  deliveryRadius: string;
  deliveryFee: string;
  symbol: string;
}

export class RestaurantOpenCloseTime {
  MONDAY: OpeningHours;
  TUESDAY: OpeningHours;
  WEDNESDAY: OpeningHours;
  THURSDAY: OpeningHours;
  FRIDAY: OpeningHours;
  SATURDAY: OpeningHours;
  SUNDAY: OpeningHours;
}
export interface OpeningHours {
  closed: boolean;
  openAt: string;
  closeAt: string;
}

export interface RestaurantResponseModel {
  businessId: string;
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

export interface ServiceType {
  serviceMode: string;
  restaurantOpenCloseTime: OpenCloseTime[];
}

export class TaxValue {
  taxName: string;
  taxValue: string;
  taxUnits: string = "$";
}
