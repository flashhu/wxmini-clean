import { makeAutoObservable, runInAction } from "mobx"
import Taro from '@tarojs/taro'
import * as dayjs from 'dayjs'
import {
  PER_PRICE,
  GOVERN_PER_COST,
  PERSON_SALARY,
  PERSON_BASE,
  MIN_AREA,
  INSURE_RATE,
  SERVICE_MAP
} from '@/constant/business'
import { TechType } from '@/pages/order_govern/config'
import { orderService, getServiceOrders } from '@/service/service';
import { OrderServiceRequestParam, OrderListItem } from '@/typings/service_order'

export type OrderType = keyof typeof SERVICE_MAP;

// 预约检测/治理服务
class OrderStore {
  currType: OrderType = 's';
  // 检测点位数量
  point = 0;
  // 治理面积
  area = 0;
  // 治理技术工程师类型 0: 中+高  1: 高+高
  techType = 0;
  // 是否买保险
  hasInsure = false;
  // 是否已同意协议
  hasAgree = false;
  // 预约时间
  selectedDate = '';
  // 服务订单列表
  orderList:OrderListItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // 商品订单列表
  async getOrderList() {
    try {
      Taro.showLoading({
        title: '加载中',
      })
      const res = await getServiceOrders();
      runInAction(() => {
        this.orderList = (res?.rows ?? [])?.map((item) => ({
          ...item,
          create_date: dayjs(item?.create_date).format('YYYYMMDDHHmmss')
        }));
        // TODO: 分页取数
      })
      Taro.hideLoading();
    } catch (error) {
      console.log(error);
      Taro.hideLoading();
    }
  }

  // 预约服务
  async payForService(address_id: number) {
    try {
      // TODO: 微信支付
      Taro.showLoading({
        title: '加载中',
      })
      const params: OrderServiceRequestParam = {
        address_id,
        type: this.currType,
        date: this.selectedDate,
        sum_price: String(this.selectedService.price),
        ...this.selectedService.params
      }
      await orderService(params);
      Taro.hideLoading();
      Taro.redirectTo({ url: '/pages/his_order/index' });
    } catch (error) {
      console.log(error);
      Taro.hideLoading();
    }
  }

  reset() {
    this.point = 0;
    this.area = 0;
    this.techType = 0;
    this.hasInsure = false;
    this.hasAgree = false;
    this.selectedDate = '';
  }

  resetGovern() {
    this.area = 0;
    this.techType = 0;
    this.hasInsure = false;
  }

  resetPay() {
    this.hasAgree = false;
    this.selectedDate = '';
  }

  setCurrType(val: OrderType) {
    this.currType = val;
    this.reset();
  }

  setPoint(val: number) {
    this.point = val;
  }

  setArea(val: number) {
    this.area = val;
  }

  setTechType(val: 0 | 1) {
    this.techType = val;
  }

  setHasInsure(val: boolean) {
    this.hasInsure = val;
  }

  setHasAgree(val: boolean) {
    this.hasAgree = val;
  }

  setSelectedDate(val: string) {
    this.selectedDate = val;
  }

  reverseHasInsure() {
    this.hasInsure = !this.hasInsure;
  }

  reverseHasAgree() {
    this.hasAgree = !this.hasAgree;
  }

  // 检测费用
  get detectPrice() {
    if (['s', 'c'].includes(this.currType)) {
      // 客户输入的点位数*单价（元/点）
      return (this.point * PER_PRICE[this.currType]).toFixed(2);
    } else {
      return 0;
    }
  }

  // 治理费用
  get governCost() {
    if (['g', 'm'].includes(this.currType)) {
      // 50平米起步
      // 产品价格 =面积*消耗（L/㎡）* 产品单价
      const good = Math.max(this.area, MIN_AREA) * PER_PRICE[this.currType];
      // 人力价格 =（面积-50平米）*单价(元/㎡)+50平米治理费用
      const tech = PERSON_BASE[this.techType] + Math.min(0, this.area - MIN_AREA) * GOVERN_PER_COST;
      // 治理时长 = 人力价格 / 时薪
      const time = tech / PERSON_SALARY[this.techType];
      // （产品价格+治理价格）*3%
      const insure = this.hasInsure ? (good + tech + time) * INSURE_RATE : 0;
      return {
        good: (good).toFixed(2),
        tech: (tech).toFixed(2),
        time: (time).toFixed(2),
        insure: (insure).toFixed(2),
        all: (good + tech + insure).toFixed(2)
      };
    } else {
      return {};
    }
  }

  // 待下单的服务
  get selectedService() {
    const isDetect = ['s', 'c'].includes(this.currType);
    return {
      type: isDetect ? '检' : '治',
      name: SERVICE_MAP[this.currType],
      spec: isDetect ? `${this.point}点位` : `${this.area}平米 / ${TechType[this.techType]?.name} ${this.hasInsure ? ' / 保险' : ''}`,
      price: isDetect ? this.detectPrice : this.governCost.all,
      params: isDetect ? {
        point: String(this.point)
      } : {
        area: (this.area).toFixed(2),
        tech_type: String(this.techType),
        is_insure: this.hasInsure
      }
    }
  }
}

export default new OrderStore();