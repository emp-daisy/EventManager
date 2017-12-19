import React from 'react';
import Header from './header';
import Footer from './footer';
import Cards from './cards';
import Pagination from './pagination';

const Events = () => (
  <div className="wrapper">
    <Header />
    <section className="container-fluid full-height-80 parallex-img" id="event">
      <h2 className="mx-5 font-weight-bold text-white">Available Centers</h2>
      <div className="row text-center m-4 justify-content-center">
        <div className="col-md-6 col-sm-12 offset-md-6">
          <form action="#" method="get" id="searchForm" className="input-group">
            <div className="input-group-btn search-panel">
              <select
                name="search_param"
                id="search_param"
                className="btn btn-default dropdown-toggle"
                data-toggle="dropdown"
              >
                <option value="all">All</option>
                <option value="name">Name</option>
                <option value="location">Location</option>
                <option value="facilities">Facilities</option>
              </select>
            </div>
            <input
              type="text"
              className="form-control"
              name="x"
              placeholder="Search by..." 
            />
            <span className="input-group-btn">
              <button className="btn btn-default" type="submit">
                <span className="fa fa-search" />
              </button>
            </span>
          </form>
        </div>
      </div>
      <div className="row align-items-center m-4 justify-content-center">
        <div className="col-sm-6 col-md-4 col-lg-3">
          <Cards />
        </div>
      </div>
      <Pagination />
    </section>
    <Footer />
  </div>
);

export default Events;
