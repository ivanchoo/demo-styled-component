import React from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";
import InlineList from "./components/InlineList";
import ResponsiveContainer from "./components/ResponsiveContainer";
import { toCart, toProductList } from "./routes";
import { inject, observer } from "mobx-react";

export const NAVBAR_HEIGHT = 60;

const NavBarContainer = styled.div`
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

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

@inject(["store"])
@observer
class NavBar extends React.Component {
  render() {
    const { store, location } = this.props;
    const children = [];
    const numCartItems = store.cart.length;
    if (location.pathname != toProductList()) {
      children.push(
        <Link
          key="to-product-list"
          to={toProductList()}
          className="btn btn-outline-secondary"
        >
          Browse
        </Link>
      );
    }
    if (location.pathname != toCart()) {
      children.push(
        <Link
          key="to-cart"
          to={toCart()}
          className={`btn ${numCartItems ? "btn-danger" : "btn-primary"}`}
        >
          {numCartItems ? `${numCartItems} Items` : "Empty Cart"}
        </Link>
      );
    }
    return (
      <NavBarContainer>
        <ResponsiveContainer>
          <NavContainer>
            <InlineList style={{ margin: 0 }}>{children}</InlineList>
          </NavContainer>
        </ResponsiveContainer>
      </NavBarContainer>
    );
  }
}

export default withRouter(NavBar);
