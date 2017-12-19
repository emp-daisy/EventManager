import React from 'react';

const Login = () => (
  <section className="align-items-center full-height-80 parallex-img" id="login">
    <div className="img-overlay" />
    <div className="col-sm-6 offset-sm-3 col-12 text-center">
      <h2 className="display-4 text-white">LOGIN</h2>
      <form>
        <div className="form-group">
          <input className="form-control" type="text" placeholder="Username" />
        </div>
        <div className="form-group">
          <input className="form-control" type="password" placeholder="Password" />
        </div>
        <div className="form-check text-white">
          <input type="checkbox" />
          Remember me
        </div>
        <div className="form-group">
          <button
            className="btn  btn-dark btn-block border-1 text-white py-3"
            type="submit"
          >LOGIN
          </button>
        </div>
      </form>
      <div className="text-white">
        <div>
          <p>I don't have an account?
            <a href="register.html">Click here</a>
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Login;
