import { observable, action, useStrict, computed, runInAction } from "mobx";
import invariant from "invariant";

useStrict(true);

export default class Store {
  @observable products = [];

  @observable categories = [];

  @action.bound
  initialize(data) {
    Object.keys(data).forEach(key => {
      if (this.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    });
  }
}
