import React from 'react';
import PropTypes from 'prop-types';

const SearchBlock = props =>
  (
    <form action="#" method="get" id="searchForm" className="input-group">
      {props.dropDownArray.length > 0 &&
      <select
        className="custom-select"
        name="selectOption"
        onChange={props.onChange}
      >
        {props.dropDownArray.map(option =>
          (
            <option
              key={option.toString().toLowerCase()}
              value={option.toString().toLowerCase()}
            >
              {option}
            </option>))}
      </select>}
      <input
        type="text"
        className="form-control"
        name="searchText"
        onChange={props.onChange}
        placeholder="Search by..."
      />{' '}
      {props.showButton &&
      <span className="input-group-btn">
        <button
          className="btn btn-default"
          onClick={props.onFilter}
          type="submit"
          disabled={props.disabled}
        >
          <span className="fa fa-search" />
        </button>
      </span>}
    </form>);

SearchBlock.defaultProps = {
  disabled: true,
  dropDownArray: [],
  showButton: true,
  onFilter: () => {},
  onChange: () => {}
};
SearchBlock.propTypes = {
  onChange: PropTypes.func,
  onFilter: PropTypes.func,
  disabled: PropTypes.bool,
  dropDownArray: PropTypes.arrayOf(PropTypes.node),
  showButton: PropTypes.bool
};
export default SearchBlock;
