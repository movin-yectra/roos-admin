export class OngoingOrdersResponseModel {
  profileImg: string;
  name: string;
  orderId: number;
  quantity: number;
  amount: number;
  payVia: string;
  status: string;
}
export class OverviewResponseModel {
  preparing: number;
  onTheWay: number;
  delivered: number;
  totalAmount: number;
  ongoingOrders: Array<OngoingOrdersResponseModel> = [];
  items: Array<ItemDetailsModel> = [];
}

export class AddressModel {
  houseNumber: string;
  street: string;
  town: string;
  state: string;
  zipCode: string;
  landMark: string;
}

export class OrderModel {
  cartItems: any;
  deliveryAddress?: {
    address: Array<AddressModel>;
  };
  pickup?: {
    name: string;
    mobileNo: string;
  };
  email: string;
  grandTotal: number;
  userName: string;
  mobileNo: string;
  id: string;
  orderNo: number;
  orderStatus: string;
}

export class ItemDetailsModel {
  image: string;
  name: string;
  amount: number;
  quantity: number;
}

export class UserDetailsResponseModel {
  name: string;
  orderId: number;
  email: string;
  phone: number;
  address: string;
  paidVia: string;
  amount: number;
  orderStatus: string;
  totalAmount: number;
  items: Array<ItemDetailsModel> = [];
}

export class PlaceNewOrderModel {
  name: string;
  mobileNumber: string;
  address: string;
  address1: string;
}
