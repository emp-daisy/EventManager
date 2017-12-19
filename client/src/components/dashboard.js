import React from 'react';
import Footer from './footer';
import Header from './header';
import ListGroupItem from './listGroupItem';
import Pagination from './pagination';
import FloatingButton from './floatingButton';

const Dashboard = () => (
  <div className="wrapper" id="wrapper">
    <Header />
    <section
      className="container-fluid full-height-80  parallex-img"
      id="dashboard"
    >
      <div className="row align-content-center">
        <div className="col-md-8 offset-md-2">
          <div className="sticky-top">
            <div className="clearfix">
              <form action="#" id="searchForm" className="input-group w-50 float-right">
                <input type="text" className="form-control" name="x" placeholder="Search..." />
                <span className="input-group-btn">
                  <button className="btn btn-default" type="submit">
                    <span className="fa fa-search" />
                  </button>
                </span>
              </form>
            </div>
            <ul className="nav nav-tabs nav-fill user-tabs" id="user-tab">
              <li className="nav-item">
                <a
                  className="nav-link active tab-custom"
                  href="#events"
                  data-toggle="tab"
                  data-id="1"
                >EVENTS
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link tab-custom"
                  href="#centers"
                  data-toggle="tab"
                  data-id="2"
                >CENTERS
                </a>
              </li>
            </ul>
          </div>
          <div className="tab-content p-4">
            <div role="tabpanel" className="tab-pane active in" id="events">
              <div className="list-group">
                <ListGroupItem />
              </div>
            </div>
            <div role="tabpanel" className="tab-pane fade" id="centers">
              <div className="list-group">
                <ListGroupItem />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination />
      <div className="row fixed-bottom justify-content-end">
        <FloatingButton />
      </div>

    </section>
    <Footer />
  </div>
);

export default Dashboard;
