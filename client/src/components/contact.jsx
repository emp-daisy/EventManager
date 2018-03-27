import React from 'react';
import PropTypes from 'prop-types';
/**
 *
 *
 * @class Contact
 * @extends {React.Component}
 */
class Contact extends React.Component {
  /**
   * Creates an instance of Contact.
   * @param {any} props
   * @memberof Contact
   */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /**
   *
   *@returns {null} no return
   */
  onClick() {
    window.location.href = `mailto:${this.props.email}`;
  }
  /**
   *
   *
   * @returns {element} returns html element
   */
  render() {
    return (
      <button
        className="btn btn-dark btn-lg border-1 text-white py-3"
        onClick={this.onClick}
      >Send us an email
      </button>
    );
  }
}

Contact.propTypes = {
  email: PropTypes.string.isRequired
};
export default Contact;

// <form>
//   <div className="form-group">
//     <input className="form-control" type="text" placeholder="First Name" />
//   </div>
//   <div className="form-group">
//     <input className="form-control" type="text" placeholder="Surname" />
//   </div>
//   <div className="form-group">
//     <input className="form-control" type="email" placeholder="Email" />
//   </div>
//   <div className="form-group">
//     <input className="form-control" type="text" placeholder="Subject" />
//   </div>
//   <div className="form-group">
//     <input className="form-control" type="text" rows="5" placeholder="Message" />
//   </div>
//   <div className="form-group">
//     <button
//       className="btn btn-dark btn-block border-1 text-white py-3"
//       type="submit"
//     >SUBMIT
//     </button>
//   </div>
// </form>
