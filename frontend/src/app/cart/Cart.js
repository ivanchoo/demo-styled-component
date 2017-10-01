import React from "react";
import PropTypes from "prop-types";
import ProductList from "../products/ProductList";
import CenterBox from "../components/CenterBox";
import { inject, observer } from "mobx-react";

@inject(["store"])
@observer
export default class extends React.Component {
  render() {
    const { store, ...restProps } = this.props;
    if (store.cart.length) {
      return <ProductList store={store} products={store.cart} />;
    } else {
      return (
        <CenterBox>
          <p className="text-secondary">Your cart is empty</p>
        </CenterBox>
      );
    }
  }
}
