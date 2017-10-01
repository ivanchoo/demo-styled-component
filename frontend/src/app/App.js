import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar, { NAVBAR_HEIGHT } from "./NavBar";
import ProductsList from "./products/ProductsList";
import ProductDetail from "./products/ProductDetail";
import Cart from "./cart/Cart";
import ResponsiveContainer from "./components/ResponsiveContainer";
import * as routes from "./routes";

const PORTAL_MIN_WIDTH = 768; // small devices, landscape
const USER_COLUMN_WIDTH = 280;

const Style = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
`;

export default class App extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <Style>
            <NavBar {...this.props} />
            <ResponsiveContainer style={{ marginTop: NAVBAR_HEIGHT }}>
              <Route
                exact
                path={routes.toProductList()}
                component={ProductsList}
              />
              <Route
                exact
                path={routes.toProductDetail(":id")}
                component={ProductDetail}
              />
              <Route exact path={routes.toCart()} component={Cart} />
            </ResponsiveContainer>
          </Style>
        </ThemeProvider>
      </Router>
    );
  }
}
