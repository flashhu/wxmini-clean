export interface User {
  name: string,
  city: string,
  prov: string,
  img: string
}

export interface TokenRequestParams {
  // type 指定为 100: 微信登录
  type: number,
  // 临时 code
  account: string
}