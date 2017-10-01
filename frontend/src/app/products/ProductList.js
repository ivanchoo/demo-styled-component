import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import CenterBox from "../components/CenterBox";
import FilterList from "./FilterList";
import { observer } from "mobx-react";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
`;

@observer
export default class extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    products: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
      .isRequired
  };
  render() {
    const { store, products, ...restProps } = this.props;
    return store.filteredProducts.length ? (
      <Container>
        {products.map(product => {
          return (
            <ProductItem
              key={product.id}
              store={store}
              product={product}
              style={{ marginTop: 12, width: 200 }}
            />
          );
        })}
      </Container>
    ) : (
      <CenterBox>
        <p className="text-secondary">No Results</p>
      </CenterBox>
    );
  }
}
