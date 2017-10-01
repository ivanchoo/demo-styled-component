import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Style = styled.div``;

export default class extends React.Component {
  render() {
    const { store, ...restProps } = this.props;
    return <Style {...this.props}>Cart</Style>;
  }
}
