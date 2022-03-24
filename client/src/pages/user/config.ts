import { IMG_SERVER } from '@/constant/apis';
import ICON_ORDER from '@/static/ico_order.png';
import ICON_GOODS from '@/static/ico_goods.png';
import ICON_ADDR from '@/static/ico_address.png';

export const DEFAULT_USERNAME = '请登录';

export const LOGO = IMG_SERVER + '/cdn/welogo.png';

export const Menus = [{
  title: '历史订单',
  icon: ICON_ORDER,
  url: '/pages/his_order/index'
}, {
  title: '历史购物',
  icon: ICON_GOODS,
  url: '/pages/his_shopping/index'
}, {
  title: '地址管理',
  icon: ICON_ADDR,
  url: '/pages/his_addr/index'
}]