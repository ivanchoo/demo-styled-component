import { observable, action, useStrict, computed, runInAction } from "mobx";
import invariant from "invariant";

const DATA_URI = "/data/products.json";
const ASSET_BASE_URI = "/assets";

const isNumber = maybe => {
  return typeof maybe == "number" && !isNaN(maybe);
};

useStrict(true);

let COUNTER = 1;

export default class Store {
  @observable asyncStatus = new AsyncStatus();

  @observable products = [];

  @observable filters = [];

  @observable cart = [];

  /**
   * Returns true if one or more filters has selected predicates.
   * @type {Boolean}
   */
  @computed
  get hasSelectedFilters() {
    return !!this.filters.find(filter => filter.hasSelection);
  }

  /**
   * Returns a list of products that satisfy all filters.
   *
   * This method is memoized and computed only when observable changes.
   * @type {[Product]}
   */
  @computed
  get filteredProducts() {
    if (!this.hasSelectedFilters) {
      // No filters has selection, just return all products
      return this.products;
    }
    return this.products.filter(product => {
      const include = this.filters.reduce((include, filter) => {
        // filter conditions are 'AND', if product has already been
        // filtered (excluded), we can skip further checks
        if (!include || !filter.hasSelection) return include;
        return filter.includes(product);
      }, true);
      return include;
    });
  }

  @action.bound
  fetchData() {
    const promise = fetch(DATA_URI, {
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

  @action.bound
  addToCart(product) {
    const index = this.cart.indexOf(product);
    if (index < 0) {
      this.cart.push(product);
    }
  }

  @action.bound
  removeFromCart(product) {
    const index = this.cart.indexOf(product);
    if (index >= 0) {
      this.cart.splice(index, 1);
    }
  }

  isInCart(product) {
    return this.cart.indexOf(product) >= 0;
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
    product.imageUrl = `${ASSET_BASE_URI}/${product.image}`
    return product;
  };

  id = 0;
  price = 0;
  name = "";
  brand = 0;
  desc = null;
  measurement = null;
  image = null;
  imageUrl = null;
}

class Filter {
  static create = ({ name, values }) => {
    const filter = new Filter();
    switch (name) {
      case "brand":
        filter.title = "Brand";
        filter.options = values.map(value => new BrandPredicate(value));
        break;
      case "price":
        filter.title = "Price";
        filter.options = values.map(
          value => new PriceRangePredicate(...value.split("-").map(Number))
        );
        break;
      default:
        throw new Error(`Unsupported filter ${name}`);
    }
    return filter;
  };

  @observable selected = [];

  @observable options = [];

  @observable title = "";

  /**
   * Returns true if the filter has one or more selected predicates
   * @type {Boolean}
   */
  @computed
  get hasSelection() {
    return !!this.selected.length;
  }

  /**
   * Returns true if the filter has no selected predicate, or if the `product`
   * satisfy **any** selected predicates.
   * @param  {Product} product
   * @return {Boolean}
   */
  includes(product) {
    if (!this.hasSelection) {
      return true;
    }
    return !!this.selected.find(option => option.includes(product));
  }

  @action.bound
  select(option) {
    const index = this.selected.indexOf(option);
    if (index < 0) {
      this.selected.push(option);
    }
  }

  @action.bound
  unselect(option) {
    const index = this.selected.indexOf(option);
    if (index >= 0) {
      this.selected.splice(index, 1);
    }
  }

  @action.bound
  toggle(option) {
    this.isSelected(option) ? this.unselect(option) : this.select(option);
  }

  isSelected(option) {
    return this.selected.indexOf(option) >= 0;
  }
}

/**
 * Simple predicate interface.
 * @type {String}
 */
class Predicate {
  label = "";

  includes(product) {
    return false;
  }
}

class BrandPredicate extends Predicate {
  brand = null;

  constructor(brand, label) {
    super();
    this.brand = brand;
    this.label = label || brand;
  }

  includes(product) {
    return this.brand == product.brand;
  }
}

class PriceRangePredicate extends Predicate {
  from = 0;
  to = 0;

  constructor(from, to, label) {
    super();
    invariant(isNumber(from), `Expects number but got ${from}`);
    invariant(isNumber(to), `Expects number but got ${to}`);
    this.from = from;
    this.to = to;
    this.label = label || `$${from.toFixed(2)} - $${to.toFixed(2)}`;
  }

  includes(product) {
    const value = product.price;
    return value >= this.from && value <= this.to;
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
