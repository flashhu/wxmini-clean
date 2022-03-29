import { makeAutoObservable, runInAction } from "mobx";
import Taro from '@tarojs/taro';
import * as dayjs from 'dayjs'
import { getGoods, buyGoods, getGoodOrders } from '@/service/shop';
import { GoodItem } from '@/typings/good';
import { BuyGoodRequestParam, OrderListItem } from '@/typings/good_order';

class ShopStore {
  // 商品列表
  list: GoodItem[] = [];
  // 当前商品详情的 id
  selectedId = 1;
  // 购物车列表
  cartList: GoodItem[] = [];
  // 区分下单商品页的入口
  isFromCart = false;
  // 商品订单列表
  orderList: OrderListItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // 商品列表
  async getGoodList() {
    try {
      Taro.showLoading({
        title: '加载中',
      })
      const res = await getGoods();
      runInAction(() => {
        this.list = res?.data ?? [];
      })
      Taro.hideLoading();
    } catch (error) {
      console.log(error);
      Taro.hideLoading();
    }
  }

  // 商品订单列表
  async getGoodOrderList() {
    try {
      Taro.showLoading({
        title: '加载中',
      })
      const res = await getGoodOrders();
      runInAction(() => {
        this.orderList = (res?.rows ?? [])?.map((item) => ({
          ...item,
          date: dayjs(item?.date).format('YYYYMMDDHHmmss')
        }));
        // TODO: 分页取数
      })
      Taro.hideLoading();
    } catch (error) {
      console.log(error);
      Taro.hideLoading();
    }
  }

  // 商品下单
  async payForGoods(params: BuyGoodRequestParam) {
    try {
      // TODO: 微信支付
      Taro.showLoading({
        title: '加载中',
      })
      await buyGoods(params);
      Taro.hideLoading();
      // 如果是从购物车下单，清空购物车数据
      if (this.isFromCart) {
        runInAction(() => {
          this.cartList = [];
        })
        Taro.setStorageSync('cartList', []);
      }
      Taro.redirectTo({ url: '/pages/his_shopping/index' });
    } catch (error) {
      console.log(error);
      Taro.hideLoading();
    }
  }

  setSelectedId(id: number) {
    this.selectedId = id;
  }

  setIsFromCart(val: boolean) {
    this.isFromCart = val;
  }

  getCartList() {
    this.cartList = Taro.getStorageSync('cartList') ?? [];
  }

  // 加入购物车
  addGoodToCart(count) {
    const index = this.cartList?.findIndex((item) => item?.id === this.currGoodInfo?.id);
    if(index !== -1) {
      // 修改数量
      this.cartList[index].count += count;
    } else {
      // 新商品
      this.cartList.push({
        ...this.currGoodInfo,
        count
      } as GoodItem);
    }
    Taro.setStorageSync('cartList',this.cartList);
  }

  // 修改购物车
  changeCartList(count, index) {
    if(count === 0){
      this.cartList.splice(index, 1);
    }else{
      this.cartList[index].count = count;
    }
    Taro.setStorageSync('cartList',this.cartList);
  }

  get currGoodInfo() {
    return this.list.find((value) => value?.id === this.selectedId);
  }

  get cartSumCount() {
    return this.cartList.reduce((prev, curr) => prev + (curr?.count || 0) * (Number(curr?.price) || 0), 0);
  }

}

export default new ShopStore();