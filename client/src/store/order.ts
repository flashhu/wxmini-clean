import { makeAutoObservable } from "mobx"

class OrderStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export default new OrderStore();