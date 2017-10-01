import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div``;

export default class extends React.Component {
  render() {
    const { store, ...restProps } = this.props;
    return <Container {...this.props}>Cart</Container>;
  }
}
