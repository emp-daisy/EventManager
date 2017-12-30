import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SearchBlock extends Component {
  render() {
    return (
      <form action="#" method="get" id="searchForm" className="input-group">
        {this.props.dropDownArray.length > 0 && <select
          className="custom-select"
          name="selectOption"
          onChange={this.props.onChange}>
          {this
            .props
            .dropDownArray
            .map(option => (
              <option
                key={option
                .toString()
                .toLowerCase()}
                value={option
                .toString()
                .toLowerCase()}>{option}</option>
            ))};
        </select>}
        <input
          type="text"
          className="form-control"
          name="searchText"
          onChange={this.props.onChange}
          placeholder="Search by..."/>
        <span className="input-group-btn">
          <button
            className="btn btn-default"
            onClick={this.props.onFilter}
            type="submit"
            disabled={this.props.disabled}>
            <span className="fa fa-search"/>
          </button>
        </span>
      </form>

    );
  }
};

SearchBlock.defaultProps = {
  disabled: true,
  dropDownArray: []
}
SearchBlock.propTypes = {
  onChange: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  dropDownArray: PropTypes.array.isRequired
}
export default SearchBlock;
