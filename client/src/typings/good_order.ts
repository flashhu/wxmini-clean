// -------- /v1/shop/buy --------
export interface BuyGoodRequestParam {
  address_id: number,
  sum_price: number,
  list: BuyListItem[]
}

interface BuyListItem {
  good_id: number,
  count: number,
  sum_price: number
}

// -------- /v1/shop/orderList --------
export interface OrderListResponseData {
  count: number;
  rows: OrderListItem[];
}

export interface OrderListItem {
  id: number;
  sum_price: number;
  comment: null;
  date: string;
  address: Address;
  item: ItemItem[];
}

interface Address {
  id: number;
  name: string;
  phone: string;
  addr: string;
}

interface ItemItem {
  good_id: number;
  count: number;
  sum_price: number;
  is_favor: null;
  info: Info;
}

interface Info {
  name: string;
  unit: string;
  spec: string;
  price: string;
  img_h1: string;
  img_h2: string;
  img_bd: string;
}