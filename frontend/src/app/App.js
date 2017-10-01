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
import { inject } from "mobx-react";

const Container = styled.div`background-color: white;`;

@inject(["store"])
export default class App extends React.Component {
  componentWillMount() {
    const { store } = this.props;
    if (!store.asyncStatus.initialized) {
      store.fetchData();
    }
  }
  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <Container>
            <NavBar />
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
          </Container>
        </ThemeProvider>
      </Router>
    );
  }
}
