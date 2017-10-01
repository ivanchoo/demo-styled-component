import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import ProductItem from "./ProductItem";
import FilterList from "./FilterList";

const Container = styled.div`display: flex;`;

const FilterContainer = styled.div`
  width: 25%;
  min-width: 180px;
  max-width: 240px;
  padding: 12px;
`;

const ProductsContainer = styled.div`
  flex: 1;
  display: flex;
  display: flex;
  flex-wrap: wrap;
`;


@inject(["store"])
@observer
export default class extends React.Component {
  render() {
    const { store, ...restProps } = this.props;
    return (
      <Container {...restProps}>
        <FilterContainer>
          <FilterList store={store} />
        </FilterContainer>
        <ProductsContainer>
          {store.filteredProducts.map(product => {
            return (
              <ProductItem
                key={product.id}
                store={store}
                product={product}
                style={{ marginTop: 12, width: 200 }}
              />
            );
          })}
        </ProductsContainer>
      </Container>
    );
  }
}
