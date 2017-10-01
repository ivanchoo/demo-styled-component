import React from "react";
import PropTypes from "prop-types";

const CDN = {
  thumb:
    "https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/150x",
  standard:
    "https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/460x"
};
export default class extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      w: PropTypes.number,
      h: PropTypes.number,
      name: PropTypes.string
    })
  };
  render() {
    const {
      className = "",
      data,
      fluid = true,
      thumb = false,
      ...restProps
    } = this.props;
    if (data && data.name) {
      const src = `${thumb ? CDN.thumb : CDN.standard}${data.name}`;
      return (
        <img
          {...restProps}
          src={src}
          className={`${className} ${fluid ? "img-fluid" : ""}`}
        />
      );
    }
    return <div>No Image</div>;
  }
}
