// -------- /v1/service/order --------
export interface OrderServiceRequestParam {
  address_id: number;
  type: string;
  point?: string;
  area?: string;
  tech_type?: string;
  is_insure?: boolean;
  date: string,
  sum_price: string;
}

// -------- /v1/service/orderList --------
export interface OrderListResponseData {
  count: number;
  rows: OrderListItem[];
}

export interface OrderListItem {
  id: number;
  type: string;
  area: null | string;
  point: string | null;
  tech_type: null | string;
  is_insure: null | boolean;
  date: string;
  sum_price: string;
  create_date: string;
  address: Address;
}
interface Address {
  id: number;
  name: string;
  phone: string;
  addr: string;
}