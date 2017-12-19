import React from 'react';

const Register = () => (
  <section
    className="align-items-center full-height-80 parallex-img"
    id="register"
  >
    <div className="img-overlay" />
    <div className="col-sm-6 offset-sm-3 col-12 text-center align-items-center">
      <h2 className="display-4 text-white">REGISTERATION</h2>
      <form>
        <div className="form-group">
          <input className="form-control" type="text" placeholder="First Name" />
        </div>
        <div className="form-group">
          <input className="form-control" type="text" placeholder="Surname" />
        </div>
        <div className="form-group">
          <input className="form-control" type="text" placeholder="Email" />
        </div>
        <div className="form-group">
          <input className="form-control" type="password" placeholder="Password" />
        </div>
        <div className="form-group">
          <input className="form-control" type="password" placeholder="Confirm Password" />
        </div>
        <div className="form-group">
          <button
            className="btn btn-dark btn-block border-1 text-white py-3"
            type="submit"
          >REGISTER
          </button>
        </div>
      </form>

      <div className="text-white">
        <div>
          <p>I have an account?
            <a href="login.html">Click here</a>
          </p>
        </div>
      </div>
    </div>
  </section>

);

export default Register;
