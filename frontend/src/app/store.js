import { observable, action, useStrict, computed, runInAction } from "mobx";
import invariant from "invariant";

const dataURL = "/data/products.json";

const isNumber = maybe => {
  return typeof maybe == "number" && !isNaN(maybe);
};

useStrict(true);

let COUNTER = 1;

export default class Store {
  @observable asyncStatus = new AsyncStatus();

  @observable products = [];

  @observable filters = [];

  @computed
  get filteredProducts() {
    // This method is memoized and computed only when observable values change
    if (!this.filters.find(filter => filter.isSelected)) {
      return this.products;
    }
    return this.products.filter(product => {
      const b = !!this.filters.find(filter => filter.includes(product));
      console.log(b, product.name);
      return false;
    });
  }

  @action.bound
  fetchData() {
    const promise = fetch(dataURL, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        runInAction(() => {
          this.filters = data.filters.map(Filter.create);
          this.products = data.products.map(Product.create);
        });
      });
    return this.asyncStatus.withPromise(promise);
  }
}

class Product {
  static create = data => {
    const product = new Product();
    Object.keys(data).forEach(key => (product[key] = data[key]));
    product.price = Number(product.price);
    invariant(
      isNumber(product.price),
      `Expects price, but got ${product.price}`
    );
    product.id = COUNTER++;
    return product;
  };

  id = 0;
  price = 0;
  name = "";
  brand = 0;
  description = null;
  measurement = null;
  image = null;
}

class Filter {
  static create = ({ name, values }) => {
    switch (name) {
      case "brand":
        return new BrandFilter(values);
      case "price":
        return new PriceFilter(values);
      default:
        throw new Error(`Unsupported filter ${name}`);
    }
  };

  @observable selected = [];

  @observable options = [];

  @observable title = "";

  @computed
  get isSelected() {
    return !!this.selected.length;
  }

  labelFor(option) {
    return option;
  }

  includes(product) {
    // override me
    return false;
  }

  @action.bound
  select(option) {
    const index = this.options.indexOf(option);
    if (option < 0) {
      this.selected.push(option);
    }
  }

  @action.bound
  unselect(option) {
    const index = this.options.indexOf(option);
    if (option >= 0) {
      this.selected.splice(index, 1);
    }
  }
}

class BrandFilter extends Filter {
  constructor(options) {
    super();
    this.title = "Brands";
    this.options = options;
  }

  includes(product) {
    invariant(product, "Expects product");
    const value = product.brand;
    invariant(!!value, "Expects product.brand");
    return !!this.selected.find(option => option == value);
  }

  labelFor(option) {
    return option;
  }
}

class PriceFilter extends Filter {
  constructor(options) {
    super();
    this.title = "Price";
    this.options = options.map(value => {
      const range = value.split("-").map(Number);
      range.forEach(value => {
        invariant(isNumber(value), `Expects number in range, but got ${value}`);
      });
      return range;
    });
  }

  labelFor(option) {
    return option.map(value => `$${value.toFixed(2)}`).join(" - ");
  }

  includes(product) {
    invariant(product, "Expects product");
    const value = product.price;
    return !!this.selected.find(
      option => option[0] >= value && option[1] <= value
    );
  }
}

/**
 * Represents the async status of a given context.
 */
export class AsyncStatus {
  /**
   * Denotes if a given context has been initialized, e.g. fetched intial data.
   * @type {Boolean}
   */
  @observable initialized = false;

  @observable progress = false;

  @observable error = null;

  @observable asyncId = 0;

  @computed
  get ready() {
    return this.initialized ? !this.progress : false;
  }

  @action.bound
  begin() {
    this.asyncId++;
    this.progress = true;
    this.error = null;
  }

  @action.bound
  done(error = null) {
    if (!this.initialized) {
      this.initialized = true;
    }
    this.progress = false;
    this.error = error;
  }

  /**
   * Calls `begin` and `done` via the given `promise` callbacks.
   *
   * Note that this method will `swallow` any error throw.
   * @returns {Promise}
   */
  @action.bound
  withPromise(promise) {
    this.begin();
    return promise.then(
      resp => {
        runInAction(() => {
          this.done();
        });
        return resp;
      },
      err => {
        runInAction(() => {
          this.done(err);
        });
        throw err;
      }
    );
  }
}
