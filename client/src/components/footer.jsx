import React from 'react';

const Footer = () => (
  <section className="footer p-2" id="footer">
    <div className="justify-content-center align-content-end">
      <div className="text-center">
        <ul className="nav list-inline ml-auto justify-content-center social-links">
          <li>
            <a href="/">
              <i className="p-1 fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="/">
              <i className="p-1 fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="/">
              <i className="p-1 fa fa-linkedin" />
            </a>
          </li>
          <li>
            <a href="/">
              <i className="p-1 fa fa-pinterest" />
            </a>
          </li>
        </ul>
      </div>
      <div className="text-center">
        <p className="text-white m-0">&copy; Jessica Madufor (Andela 2017)</p>
      </div>
    </div>
  </section>);

export default Footer;
