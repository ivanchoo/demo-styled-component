import React from "react";
import styled from "styled-components";

const PORTAL_MIN_WIDTH = 768; // small devices, landscape
const USER_COLUMN_WIDTH = 280;

const Container = styled.div`
  background-color: gray;
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
`;

export default class App extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <Container>
        <code>TODO</code>
      </Container>

    );
  }
}
