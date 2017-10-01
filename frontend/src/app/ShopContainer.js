import React from "react";
import styled from "styled-components";

const ContainerStyle = styled.div`display: flex;`;

export default class extends React.Component {
  render() {
    const { store, style } = this.props;
    return <ContainerStyle style={style}>Items</ContainerStyle>;
  }
}
