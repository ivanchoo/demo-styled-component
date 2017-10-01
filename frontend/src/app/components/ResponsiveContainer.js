import React from "react";

export default class extends React.Component {
  render() {
    const { className = "", children, fluid, ...restProps } = this.props;
    return (
      <div
        {...restProps}
        className={`${className} ${fluid ? "container-fluid" : "container"}`}
      >
        {children}
      </div>
    );
  }
}
