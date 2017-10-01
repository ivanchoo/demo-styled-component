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
  static propTypes = {
    product: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }
  render() {
    const { product, store, ...restProps } = this.props;
    return (
      <Container {...this.props}>
        <div style={{ flex: 1 }}>
          <Image src={product.image} fluid />
          <p className="text-secondary">
            {product.name}
            <br />
            <strong className="text-danger">${product.price.toFixed(2)}</strong>
          </p>
        </div>
        <Link
          className="btn btn-block btn-primary"
          to={toProductDetail(product.id)}
        >
          Add to Card
        </Link>
      </Container>
    );
  }
}
