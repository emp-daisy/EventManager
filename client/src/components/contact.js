import React from 'react';

const Contact = () => (
  <form>
    <div className="form-group">
      <input className="form-control" type="text" placeholder="First Name" />
    </div>
    <div className="form-group">
      <input className="form-control" type="text" placeholder="Surname" />
    </div>
    <div className="form-group">
      <input className="form-control" type="email" placeholder="Email" />
    </div>
    <div className="form-group">
      <input className="form-control" type="text" placeholder="Subject" />
    </div>
    <div className="form-group">
      <input className="form-control" type="text" rows="5" placeholder="Message" />
    </div>
    <div className="form-group">
      <button
        className="btn btn-dark btn-block border-1 text-white py-3"
        type="submit"
      >SUBMIT
      </button>
    </div>
  </form>
);

export default Contact;
