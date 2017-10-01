import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Style = styled.div`
  display: flex;
  width: 200px;
  border: 1px solid ${props => props.theme.colors.light};
`;

export default class extends React.Component {
  render() {
    const { product, store, ...restProps } = this.props;
    return <Style {...this.props}>{product.title}</Style>;
  }
}
