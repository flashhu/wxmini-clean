import { makeAutoObservable } from "mobx"

class ShopStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export default new ShopStore();