import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { toProductDetail } from "../routes";

const Container = styled.div`
  display: flex;
  width: 200px;
  border: 1px solid ${props => props.theme.colors.light};
`;

export default class extends React.Component {
  render() {
    const { store, match, ...restProps } = this.props;
    return (
      <Container {...this.props}>
        {match.isExact ? match.params.id : "Not found"}
      </Container>
    );
  }
}
