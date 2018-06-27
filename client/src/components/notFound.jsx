import React from 'react';
import HeaderBlock from './header';
import Footer from './footer';

const NotFound = () => (
  <div className="wrapper d-flex flex-column h-100">
    <HeaderBlock />
    <section
      className={'align-items-center d-flex flex-column ' +
                  'flex-grow background-img justify-content-center'}
      id="errorPage"
    >
      <h1 className="text-white display-2">Uh-Oh!!!</h1>
      <h1 className="text-white">
        <span><i className="fa fa-exclamation-triangle" aria-hidden="true" />
        </span> ERROR
      </h1>
      <h3 className="text-white">Invalid link</h3>
    </section>
    <Footer />
  </div>
);

export default NotFound;
