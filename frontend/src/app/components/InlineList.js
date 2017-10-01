import React from "react";
import styled, { css } from "styled-components";

const List = styled.ul`
  list-style: none;
  padding-left: 0;
`;
const Item = styled.li`
  display: inline-block;
  &:not(:last-child) {
    margin-right: 5px;
  }
`;

export default class extends React.Component {
  render() {
    return (
      <List {...this.props}>
        {React.Children.map(this.props.children, child => <Item>{child}</Item>)}
      </List>
    );
  }
}
