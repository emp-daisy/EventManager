import React from 'react';
import PropTypes from 'prop-types';

const SearchBlock = props => (
  <div className="input-group">
    <div className="input-group-prepend">
      {props.dropDownArray.length > 0 && (
        <select
          className="form-control"
          name="selectOption"
          onChange={props.onChange}
        >
          {props.dropDownArray.map(option => (
            <option
              key={option.toString().toLowerCase()}
              value={option.toString().toLowerCase()}
            >
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
    <input
      type="text"
      className="form-control"
      name="searchText"
      onChange={props.onChange}
      placeholder="Search by..."
    />
    <div className="input-group-append">
      <button
        className="btn btn-default"
        onClick={props.onFilter}
        type="submit"
        disabled={props.disabled}
      >
        <span className="fa fa-search" />
      </button>
      {props.hideReset && (
        <button
          className="btn btn-default"
          onClick={props.onReset}
          type="submit"
        >
          <span className="fa fa-times" />
        </button>
      )}
    </div>
  </div>
);

SearchBlock.defaultProps = {
  disabled: true,
  hideReset: true,
  dropDownArray: [],
  onFilter: () => {},
  onReset: () => {},
  onChange: () => {}
};
SearchBlock.propTypes = {
  onChange: PropTypes.func,
  onFilter: PropTypes.func,
  onReset: PropTypes.func,
  disabled: PropTypes.bool,
  hideReset: PropTypes.bool,
  dropDownArray: PropTypes.arrayOf(PropTypes.node)
};
export default SearchBlock;
