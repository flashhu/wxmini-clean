import { makeAutoObservable } from "mobx"
import {
  PER_PRICE,
  GOVERN_PER_COST,
  PERSON_SALARY,
  PERSON_BASE,
  MIN_AREA,
  INSURE_RATE
} from '@/constant/business'

export type OrderType = 's' | 'c' | 'g' | 'm';

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
  // 预约时间
  selectedDate = '';

  constructor() {
    makeAutoObservable(this);
  }

  setCurrType(val: OrderType) {
    this.currType = val;
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

  setSelectedDate(val: string) {
    this.selectedDate = val;
  }

  reverseHasInsure() {
    this.hasInsure = !this.hasInsure;
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
}

export default new OrderStore();