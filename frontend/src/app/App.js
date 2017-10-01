import React from "react";

const PORTAL_MIN_WIDTH = 768; // small devices, landscape
const USER_COLUMN_WIDTH = 280;

export default class App extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <div className="d-flex" style={styles.portal}>
        <code>TODO</code>
      </div>

    );
  }
}

const styles = {
  portal: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    minWidth: PORTAL_MIN_WIDTH
  },
  usersContainer: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden"
  },
  sideColumn: {
    width: USER_COLUMN_WIDTH
  }
};
