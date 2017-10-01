import styled from "styled-components";

export default styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  /* responsive grid */
  ${props =>
    Object.keys(props.theme.grid.sizes).reduce((m, size) => {
      const px = props.theme.grid.sizes[size] + "px";
      return m + `@media (min-width: ${px}) {max-width: ${px};}`;
    }, "")};
`;
