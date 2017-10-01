import React from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import FilterList from "./FilterList";
import { inject, observer } from "mobx-react";

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
  flex-wrap: wrap;
`;

const EmptyContainer = styled.div`
  flex: 1;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

@inject(["store"])
@observer
export default class extends React.Component {
  render() {
    const { store, ...restProps } = this.props;
    const children = store.filteredProducts.length ? (
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
    ) : (
      <EmptyContainer>
        <p className="text-secondary">No Results</p>
      </EmptyContainer>
    );
    return (
      <Container {...restProps}>
        <FilterContainer>
          <FilterList store={store} />
        </FilterContainer>
        {children}
      </Container>
    );
  }
}
