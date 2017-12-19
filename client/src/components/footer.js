import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <section className="footer" id="footer">
    <div className="justify-content-center align-content-end">
      <div className="text-center">
        <ul className="nav list-inline ml-auto justify-content-center social-links">
          <li>
            <Link to="/">
              <i className="p-1 fa fa-facebook" />
            </Link>
          </li>
          <li>
            <Link to="/">
              <i className="p-1 fa fa-twitter" />
            </Link>
          </li>
          <li>
            <Link to="/">
              <i className="p-1 fa fa-linkedin" />
            </Link>
          </li>
          <li>
            <Link to="/">
              <i className="p-1 fa fa-pinterest" />
            </Link>
          </li>
        </ul>
      </div>
      <div className="text-center">
        <p className="text-white">&copy Jessica Madufor (Andela 2017)</p>
      </div>
    </div>
  </section>
);

export default Footer;
