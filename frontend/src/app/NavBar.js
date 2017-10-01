import React from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";
import InlineList from "./components/InlineList";
import ResponsiveContainer from "./components/ResponsiveContainer";
import { toCart, toProductList } from "./routes";

export const NAVBAR_HEIGHT = 60;

const NavBarWrapper = styled.div`
  background-color: ${props => props.theme.colors.light};
  min-height: ${NAVBAR_HEIGHT}px;
  display: flex;
  align-items: center;
  /* Fixed top */
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
`;

const ResponsiveContainerExtended = ResponsiveContainer.extend`
  display: flex;
  justify-content: space-between;
`;

class NavBar extends React.Component {
  render() {
    const { store, location } = this.props;
    const left = [],
      right = [];
    if (location.pathname != toProductList()) {
      left.push(
        <Link key="to-product-list" to={toProductList()}>
          All Products
        </Link>
      );
    }
    right.push(
      <Link key="to-cart" to={toCart()}>
        Cart
      </Link>
    );
    return (
      <NavBarWrapper>
        <ResponsiveContainerExtended>
          <InlineList style={{ margin: 0 }}>{left}</InlineList>
          <InlineList style={{ margin: 0 }}>{right}</InlineList>
        </ResponsiveContainerExtended>
      </NavBarWrapper>
    );
  }
}

export default withRouter(NavBar);
