import { makeAutoObservable, runInAction } from "mobx";
import Taro from '@tarojs/taro';
import * as dayjs from 'dayjs'
import { getGoods, buyGoods, getGoodOrders, commentOrder, getGoodDetail } from '@/service/shop';
import { GoodItem, GoodDetailResponseData } from '@/typings/good';
import { BuyGoodRequestParam, OrderListItem, OrderGoodItem, CommentItem } from '@/typings/good_order';
import { isInPeriod } from '@/utils/utils';

class ShopStore {
  // 商品列表
  list: GoodItem[] = [];
  // 当前商品详情的 id
  selectedId = 1;
  // 当前商品详情
  selectedGoodDetail: Partial<GoodDetailResponseData> = {};
  // 购物车列表
  cartList: GoodItem[] = [];
  // 区分下单商品页的入口
  isFromCart = false;
  // 商品订单列表
  orderList: OrderListItem[] = [];
  // 待评价的订单index
  currOrderIndex: number = 0;
  // 待评价的订单商品列表
  currGoodList: OrderGoodItem[] = [];

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

  // 商品详情
  async getGoodInfo(id: number) {
    try {
      const res = await getGoodDetail(id);
      res.comments = (res?.comments || [])?.map((item) => ({
        ...item,
        date: dayjs(item?.date).format('YYYY-MM-DD HH:mm:ss')
      }))
      runInAction(() => {
        this.selectedGoodDetail = res || {};
      })
    } catch (error) {
      console.log(error);
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
        this.orderList = (res?.rows ?? [])?.map((item) => {
          const { date, comment } = item;
          const dateStr = dayjs(date).format('YYYYMMDDHHmmss');
          return {
            ...item,
            date: dateStr,
            canComment: isInPeriod(dateStr) && !comment
          }
        });
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

  async comment(comment: string, list: CommentItem[]) {
    try {
      Taro.showLoading({
        title: '加载中',
      })
      await commentOrder({
        order_id: this.currOrderId,
        comment,
        list
      });
      runInAction(() => {
        // 控制是否显示评论入口
        this.orderList[this.currOrderIndex].canComment = false;
        // 初始化
        this.currOrderIndex = 0;
        this.currGoodList = [];
      })
      Taro.showToast({
        title: '评论成功'
      })
      Taro.hideLoading();
    } catch (error) {
      console.log(error);
      Taro.hideLoading();
    }
  }

  setSelectedId(id: number) {
    this.selectedId = id;
  }

  setSelectedGoodDetail(data: Partial<GoodDetailResponseData>) {
    this.selectedGoodDetail = data;
  }

  setIsFromCart(val: boolean) {
    this.isFromCart = val;
  }

  // 历史购物页 - 评论
  setCurrGoodList(index: number) {
    this.currOrderIndex = index;
    // 重置未保存的点赞 / 点踩状态
    this.currGoodList = this.orderList?.[index]?.item?.map((val) => ({
      ...val,
      is_favor: undefined
    }));
  }

  // 历史购物页 - 评论(点赞状态)
  setGoodComment(index: number, status: number | undefined) {
    this.currGoodList[index].is_favor = status;
  }

  getCartList() {
    this.cartList = Taro.getStorageSync('cartList') ?? [];
  }

  // 加入购物车
  addGoodToCart(count) {
    const index = this.cartList?.findIndex((item) => item?.id === this.currGoodInfo?.id);
    if (index !== -1) {
      // 修改数量
      this.cartList[index].count += count;
    } else {
      // 新商品
      this.cartList.push({
        ...this.currGoodInfo,
        count
      } as GoodItem);
    }
    Taro.setStorageSync('cartList', this.cartList);
  }

  // 修改购物车
  changeCartList(count, index) {
    if (count === 0) {
      this.cartList.splice(index, 1);
    } else {
      this.cartList[index].count = count;
    }
    Taro.setStorageSync('cartList', this.cartList);
  }

  // 商品详情页
  get currGoodInfo() {
    return this.list.find((value) => value?.id === this.selectedId);
  }

  get cartSumCount() {
    return this.cartList.reduce((prev, curr) => prev + (curr?.count || 0) * (Number(curr?.price) || 0), 0);
  }

  // 历史购物页 - 包含点赞或点踩
  get commentHasAgree() {
    const hasItem = this.currGoodList?.find((item) => item.is_favor);
    return Boolean(hasItem);
  }

  get currOrderId() {
    return this.orderList?.[this.currOrderIndex]?.id;
  }
}

export default new ShopStore();