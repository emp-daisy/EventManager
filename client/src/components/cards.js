import React, {Component} from 'react';
import PropTypes from 'prop-types';
import event from '../assets/event.jpg';

class CardBlock extends Component {
  render() {
    return (
      <div className="card">
        <img className="card-img-top" src={this.props.src} alt={this.props.title}/>
        <div className="card-body">
          <h4 className="card-title">{this.props.title}</h4>
          <p className="card-text">{this.props.children}
          </p>
          {this.props.facilities.length > 0 &&
          <ul className="list-inline">Facilities: {this
              .props
              .facilities
              .map((facility,index) => {
                return (
                  <li className="list-inline-item" key={index}>
                   <small className="font-weight-bold">* {facility}</small>
                  </li>
                )
              })}
          </ul>}
          <a
            onClick={this.props.onClick}
            className="btn btn-dark btn-block border-1 text-white py-3">{this.props.buttonText}
          </a>
        </div>
      </div>
    );
  }
};
CardBlock.defaultProps = {
  src: event,
  buttonText: "Check events",
  facilities: []
}
CardBlock.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.any.isRequired,
  src: PropTypes.any.isRequired,
  buttonText: PropTypes.node,
  facilities: PropTypes.array.isRequired
}
export default CardBlock;