import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

@observer
export default class extends React.Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };
  onClick = evt => {
    evt.preventDefault();
    const { store, product } = this.props;
    if (store.isInCart(product)) {
      store.removeFromCart(product);
    } else {
      store.addToCart(product);
    }
  };
  render() {
    const { product, store, className = "", ...restProps } = this.props;
    const isInCart = store.isInCart(product);
    return (
      <button
        {...restProps}
        className={`${className} btn btn-block ${isInCart ? "btn-danger" : "btn-primary"}`}
        type="button"
        onClick={this.onClick}
      >
        {isInCart ? "Remove from Cart" : "Add to Cart"}
      </button>
    );
  }
}
