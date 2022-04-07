// -------- /v1/shop/goodList --------
export interface GoodItem {
  id: number,
  name: string,
  unit: string,
  spec: string,
  price: string,
  img_h1: string,
  img_h2: string,
  img_bd: string,
  count?: number
}

// -------- /v1/shop/goodDetail/:id --------
export interface GoodDetailResponseData {
  info: GoodItem;
  sales: number;
  appraise: IAppraise;
  comments: ICommentsItem[];
}

interface IAppraise {
  agree: number;
  disagree: number;
}

interface ICommentsItem {
  id: number;
  comment: string;
  date: string;
  item: IItemItem[];
}
interface IItemItem {
  is_favor: number;
}