import Taro from '@tarojs/taro';
import { makeAutoObservable, runInAction } from "mobx"
import { AddrItem } from '@/typings/address';
import { addAddress, getAddress, delAddress, updateAddress } from '@/service/address';

class AddressStore {
  // 地址列表
  addrList: AddrItem[] = [];
  // 控制下单页地址显示
  selectedAddrIndex = 0;

  constructor() {
    makeAutoObservable(this);
  }

  async getAddrList() {
    try {
      const { data } = await getAddress() || {};
      runInAction(() => {
        this.addrList = data || [];
      })
    } catch (error) {
      console.log(error);
    }
  }

  async addAddr(data: AddrItem) {
    try {
      Taro.showLoading({
        title: '加载中',
      })
      const res = await addAddress(data);
      if (res?.data) {
        const newList = this.addrList.map((item) => ({
          ...item,
          // 只有一个默认地址
          is_default: data.is_default ? false : item?.is_default
        }));
        runInAction(() => {
          this.addrList = [...newList, res?.data];
        })
      }
      Taro.showToast({
        title: '地址已添加'
      })
      Taro.hideLoading();
      return Promise.resolve();
    } catch (error) {
      console.log(error);
      Taro.hideLoading();
      return Promise.reject();
    }
  }

  async delAddr(id: number, index: number) {
    try {
      Taro.showLoading({
        title: '加载中',
      })
      await delAddress({ id });
      runInAction(() => {
        this.addrList.splice(index, 1);
      })
      Taro.showToast({
        title: '地址已删除'
      })
      Taro.hideLoading();
    } catch (error) {
      console.log(error);
      Taro.hideLoading();
    }
  }

  async updateAddr(params: Partial<AddrItem>, index: number) {
    try {
      Taro.showLoading({
        title: '加载中',
      })
      await updateAddress(params);
      runInAction(() => {
        this.addrList = this.addrList.map((item, i) => {
          if (i === index) {
            return { ...item, ...params };
          } else {
            // 只有一个默认地址
            return { ...item, is_default: params.is_default ? false : item?.is_default };
          }
        });
      })
      Taro.showToast({
        title: '地址已更新'
      })
      Taro.hideLoading();
    } catch (error) {
      console.log(error);
      Taro.hideLoading();
    }
  }

  setSelectedAddrIndex(index: number) {
    this.selectedAddrIndex = index;
  }

  get selectedAddress() {
    return this.addrList?.[this.selectedAddrIndex];
  }
}

export default new AddressStore();