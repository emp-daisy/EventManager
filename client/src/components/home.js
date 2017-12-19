import React from 'react';
import Footer from './footer';
import Header from './header';
import Contact from './contact';
import Cards from './cards';

const HomePage = () => (
  <div className="wrapper" id="wrapper">
    <Header/>
    <section className="intro parallex-img" id="intro">
      <div className="img-overlay"/>
      <div
        className="jumbotron jumbotron-fluid"
        id="banner"
        style={{
        position: 'relative'
      }}>
        <div className="parallax text-center">
          <div className="parallax-pattern-overlay">
            <div className="container text-center">
              <h2 className="display-2 font-weight-bold">Book your events at the speed of thought</h2>
              <h3 className="sub-banner font-italics">Browse through the available events and showcase your events.
                <br/>
                <span className="font-italic">Let us help make your event come alive
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="latest parallex-img" id="latest">
      <div className="img-overlay"/>
      <div className="row justify-content-center">
        <div className="col-md-4 col-lg-3 mt-2">
          <Cards/>
        </div>
      </div>
    </section>
    <section className="contact parallex-img" id="contact">
      <div className="img-overlay"/>
      <div className="row align-items-center">
        <div className="col-sm-6 offset-sm-3 col-12 text-center align-items-center">
          <h2 className="display-4 text-white">GET IN TOUCH</h2>
          <Contact/>
        </div>
      </div>
    </section>
    <Footer/>
  </div>
);

export default HomePage;
