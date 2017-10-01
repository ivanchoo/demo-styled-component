import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";

@observer
export default class FilterList extends React.Component {
  onChange = evt => {
    const { store } = this.props;
    const [filterAt, optionAt] = evt.target.value.split("-").map(Number);
    const filter = store.filters[filterAt];
    const option = filter.options[optionAt];
    filter.toggle(option);
  };
  render() {
    const { store } = this.props;
    return (
      <div>
        {store.filters.map((filter, filterIdx) => {
          return (
            <section key={filter.title} style={{ marginBottom: 18 }}>
              <h5 className="text-secondary">{filter.title}</h5>
              {filter.options.map((option, optionIdx) => {
                const value = `${filterIdx}-${optionIdx}`;
                const id = `filter-select-${value}`;
                const checked = filter.isSelected(option);
                return (
                  <div key={optionIdx} className="form-check">
                    <label htmlFor={id} className="form-check-label">
                      <input
                        id={id}
                        className="form-check-input"
                        type="checkbox"
                        value={value}
                        checked={checked}
                        onChange={this.onChange}
                      />{" "}
                      {option.label}
                    </label>
                  </div>
                );
              })}
            </section>
          );
        })}
      </div>
    );
  }
}
