import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Image from "../components/Image";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { toProductDetail } from "../routes";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 200px;
  padding: 12px;
  transition: box-shadow 0.15s ease-in-out;
  border-radius: 4px;
  &:hover {
    box-shadow: 0 0 0 0.2rem #eee;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  flex: 1;
  text-decoration: none !important;
`;

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
    const { product, store, ...restProps } = this.props;
    const isInCart = store.isInCart(product);
    return (
      <Container {...this.props}>
        <StyledLink to={toProductDetail()}>
          <Image src={product.image} fluid />
          <p className="text-secondary">
            {product.name}
            <br />
            <strong className="text-danger">${product.price.toFixed(2)}</strong>
          </p>
        </StyledLink>
        <button
          className={`btn btn-block ${isInCart ? "btn-danger" : "btn-primary"}`}
          type="button"
          onClick={this.onClick}
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </button>
      </Container>
    );
  }
}
