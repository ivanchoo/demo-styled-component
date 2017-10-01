import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import NavBar, { NAVBAR_HEIGHT } from "./NavBar";
import ShopContainer from "./ShopContainer";
import Container from "./components/Container";

const PORTAL_MIN_WIDTH = 768; // small devices, landscape
const USER_COLUMN_WIDTH = 280;

const ApplicationStyle = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
`;

export default class App extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <ApplicationStyle>
          <NavBar {...this.props} />
          <Container style={{ marginTop: NAVBAR_HEIGHT }}>
            <ShopContainer />
          </Container>
        </ApplicationStyle>
      </ThemeProvider>
    );
  }
}
