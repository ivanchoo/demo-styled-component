import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Image from "../components/Image";
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

export default class extends React.Component {
  render() {
    const { product, store, ...restProps } = this.props;
    const { price, promo_price } = product["pricing"];
    return (
      <Container {...this.props}>
        <div style={{ flex: 1 }}>
          <Image data={product.img} fluid />
          <p className="text-secondary">
            {product.title}
            <br />
            <strong className="text-danger">${price.toFixed(2)}</strong>
            {promo_price ? (
              <span className="text-secondary"> ${promo_price.toFixed(2)}</span>
            ) : null}
          </p>
        </div>
        <Link
          className="btn btn-block btn-primary"
          to={toProductDetail(product.id)}
        >
          View Details
        </Link>
      </Container>
    );
  }
}
