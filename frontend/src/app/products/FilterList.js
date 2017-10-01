import React from "react";
import styled from "styled-components";

export default class FilterList extends React.Component {
  onSelect = evt => {};
  render() {
    const { store } = this.props;
    return (
      <div>
        {store.filters.map(filter => {
          return (
            <section key={filter.title}>
              <h5 className="text-secondary">{filter.title}</h5>
              <ul className="list-unstyled">
                {filter.options.map((option, idx) => {
                  return (
                    <li key={idx} className="form-check">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                        />{" "}
                        {filter.labelFor(option)}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    );
  }
}
