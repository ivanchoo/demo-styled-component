import React from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";
import Container from "./components/Container";
import { toCart, toProductList } from "./routes";

export const NAVBAR_HEIGHT = 60;

const NarBarStyle = styled.div`
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

const ContainerStyle = Container.extend`
  display: flex;
  justify-content: flex-end;
`;

class NavBar extends React.Component {
  render() {
    const { store, location } = this.props;
    const toProductListLink =
      location.pathname == toProductList() ? null : (
        <Link to={toProductList()}>Browser</Link>
      );
    return (
      <NarBarStyle>
        <ContainerStyle>
          {toProductListLink} <Link to={toCart()}>Cart</Link>
        </ContainerStyle>
      </NarBarStyle>
    );
  }
}

export default withRouter(NavBar);
