import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Image from "../components/Image";
import CenterBox from "../components/CenterBox";
import ProductCartButton from "./ProductCartButton";
import { inject, observer } from "mobx-react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

const DetailRowContainer = styled.div`
  display: flex;
  margin-top: 12px;
`;

const DetailImageColumn = styled.div`
  flex: 1;
  background-image: url("${props => props.src}");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const DetailInfoColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 40%;
`;



@inject(["store"])
@observer
export default class extends React.Component {
  render() {
    const { store, match, ...restProps } = this.props;
    let product;
    if (match.isExact && match.params.id) {
      const productId = Number(match.params.id);
      product = store.products.find(product => product.id == productId);
    }
    if (!product) {
      return (
        <CenterBox>
          <p className="text-secondary">Not Found</p>
        </CenterBox>
      );
    }
    return (
      <Container {...this.props}>
        <h3>{product.name}</h3>
        <DetailRowContainer>
          <DetailImageColumn src={product.imageUrl} />
          <DetailInfoColumn>
            <p className="h2">{product.measurement}</p>
            <h2>${product.price.toFixed(2)}</h2>
            <p>{product.desc}</p>
            <ProductCartButton store={store} product={product} />
          </DetailInfoColumn>
        </DetailRowContainer>
      </Container>
    );
  }
}
