import { makeAutoObservable } from "mobx"

class UserStore {
  user = 'test';

  constructor() {
    makeAutoObservable(this);
  }

  setUser(name: string) {
    this.user = name;
  }
}

export default new UserStore();