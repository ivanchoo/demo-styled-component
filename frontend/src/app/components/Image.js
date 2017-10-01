import React from "react";
import PropTypes from "prop-types";

const SRC_PREFIX = "/assets";

export default class extends React.Component {
  static propTypes = {
    src: PropTypes.string,
    fluid: PropTypes.bool,
  };
  render() {
    const {
      className = "",
      src,
      fluid = true,
      ...restProps
    } = this.props;
    if (src) {
      return (
        <img
          {...restProps}
          src={`${SRC_PREFIX}/${src}`}
          className={`${className} ${fluid ? "img-fluid" : ""}`}
        />
      );
    }
    return <div>No Image</div>;
  }
}
