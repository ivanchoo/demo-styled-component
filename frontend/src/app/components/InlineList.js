import React from "react";

export default class extends React.Component {
  render() {
    const { className = "" } = this.props;
    return (
      <ul {...this.props} className={`${className} list-inline`}>
        {React.Children.map(this.props.children, child => (
          <li className="list-inline-item">{child}</li>
        ))}
      </ul>
    );
  }
}
