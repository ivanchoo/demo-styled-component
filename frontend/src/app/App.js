import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar, { NAVBAR_HEIGHT } from "./NavBar";
import Products from "./products/Products";
import ProductDetail from "./products/ProductDetail";
import Cart from "./cart/Cart";
import ResponsiveContainer from "./components/ResponsiveContainer";
import CenterBox from "./components/CenterBox";
import * as routes from "./routes";
import { inject, observer } from "mobx-react";

const Container = styled.div`background-color: white;`;

@inject(["store"])
@observer
export default class App extends React.Component {
  componentWillMount() {
    const { store } = this.props;
    if (!store.asyncStatus.initialized) {
      store.fetchData();
    }
  }
  render() {
    const { store } = this.props;
    const children =
      store.asyncStatus.initialized && store.products.length ? (
        <Container>
          <NavBar />
          <ResponsiveContainer style={{ marginTop: NAVBAR_HEIGHT }}>
            <Route exact path={routes.toProductList()} component={Products} />
            <Route
              exact
              path={routes.toProductDetail(":id")}
              component={ProductDetail}
            />
            <Route exact path={routes.toCart()} component={Cart} />
          </ResponsiveContainer>
        </Container>
      ) : (
        <Container>
          <CenterBox>
            <small className="text-secondary">Loading</small>
          </CenterBox>
        </Container>
      );
    return (
      <Router>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Router>
    );
  }
}
