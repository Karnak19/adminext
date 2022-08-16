export interface Data {
  description: string;
}

export interface Data2 {
  weight: number;
  currency: string;
  interval: string;
  type: string;
  price: number;
  intervalCount: number;
}

export interface PaymentOffer {
  entityType: string;
  accountId: string;
  productId: string;
  paymentOfferId: string;
  status: string;
  provider: string;
  providerPaymentOfferId: string;
  name: string;
  data: Data2;
  _type: string;
  created: Date;
  updated: Date;
  profileIds: string[];
}

export interface Item {
  entityType: string;
  accountId: string;
  id: string;
  productId: string;
  status: string;
  name: string;
  data: Data;
  _type: string;
  created: Date;
  updated: Date;
  paymentOffers: PaymentOffer[];
}

export interface Cursor {
  before: string;
}

export interface Products {
  items: Item[];
  cursor: Cursor;
}
