import { makeAutoObservable, runInAction } from "mobx";
import Taro from '@tarojs/taro'
import { getList } from '@/service/case';
import { CaseItem } from '@/typings/case';

class CaseStore {
  list: CaseItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getCaseList() {
    try {
      Taro.showLoading({
        title: '加载中',
      })
      const res = await getList();
      runInAction(() => {
        this.list = res?.data ?? [];
      })
      Taro.hideLoading();
    } catch (error) {
      console.log(error);
      Taro.hideLoading();
    }
  }
}

export default new CaseStore();