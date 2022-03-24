import { makeAutoObservable, runInAction } from "mobx";
import Taro from '@tarojs/taro';
import { getGoods } from '@/service/shop';
import { GoodItem } from '@/typings/good';

class ShopStore {
  // 商品列表
  list: GoodItem[] = [];
  // 当前商品详情的 id
  selectedId = 1;
  // 购物车列表
  cartList: GoodItem[] = [];
  // 地址列表
  addrList: [] = [];
  // 当前选中的地址
  seletedAddr = {
    name: 'aaa'
  };

  constructor() {
    makeAutoObservable(this);
  }

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
      Taro.showToast({
        title: '网络异常'
      })
    }
  }

  setSelectedId(id: number) {
    this.selectedId = id;
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
    console.log(this.cartList);
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