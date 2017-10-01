import React from "react";
import styled from "styled-components";
import ProductList from "./ProductList";
import CenterBox from "../components/CenterBox";
import FilterList from "./FilterList";
import { inject, observer } from "mobx-react";

const Container = styled.div`display: flex;`;

const FilterContainer = styled.div`
  width: 25%;
  min-width: 180px;
  max-width: 240px;
  padding: 12px;
`;

@inject(["store"])
@observer
export default class extends React.Component {
  render() {
    const { store, ...restProps } = this.props;
    const children = store.filteredProducts.length ? (
      <ProductList store={store} products={store.filteredProducts} />
    ) : (
      <CenterBox>
        <p className="text-secondary">No Results</p>
      </CenterBox>
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
