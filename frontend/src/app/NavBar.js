import React from "react";
import styled from "styled-components";
import Container from "./components/Container";

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

export default class extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <NarBarStyle>
        <ContainerStyle>
          <button>Cart</button>
        </ContainerStyle>
      </NarBarStyle>
    );
  }
}
