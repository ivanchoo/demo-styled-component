import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import ProductItem from "./ProductItem";

const Style = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

@inject(["store"])
@observer
export default class extends React.Component {
  render() {
    const { store, ...restProps } = this.props;
    return (
      <Style {...this.props}>
        {store.products.map(product => {
          return (
            <ProductItem
              key={product.id}
              store={store}
              product={product}
              style={{ marginTop: 12 }}
            />
          );
        })}
      </Style>
    );
  }
}
