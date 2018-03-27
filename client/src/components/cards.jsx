import React from 'react';
import PropTypes from 'prop-types';
import event from '../assets/event.jpg';

const CardBlock = props => (
  <div className="card" id={props.id}>
    <img
      className="card-img-top"
      src={props.src}
      alt={props.title}
      style={{ height: '150px' }}
    />
    <div className="card-body">
      <h4 className="card-title">
        {props.title}
      </h4>
      <p className="card-text">
        {props.children}
      </p>
      {props.facilities.length > 0 &&
        <ul className="list-inline">
          Facilities:{' '}
          {props.facilities.map(facility => (
            <li className="list-inline-item" key={facility}>
              <small className="font-weight-bold">
                * {facility}
              </small>
            </li>))}
        </ul>}
      <button
        onClick={props.onClick}
        className="btn btn-dark btn-block border-1 text-white py-3"
      >
        {props.buttonText}
      </button>
    </div>
  </div>);

CardBlock.defaultProps = {
  src: event,
  buttonText: 'Check events',
  facilities: []
};
CardBlock.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  src: PropTypes.string,
  buttonText: PropTypes.node,
  facilities: PropTypes.arrayOf(PropTypes.string)
};
export default CardBlock;
