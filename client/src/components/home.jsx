import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Footer from './footer';
import Header from './header';
import Contact from './contact';
import CardBlock from './cards';
import { getCenters } from '../actions/center';
import { history } from '../actions/history';
/**
 *
 *
 * @class HomePage
 * @extends {Component}
 */
export class HomePage extends Component {
  /**
   * Creates an instance of HomePage.
   * @param {any} props
   * @memberof HomePage
   */
  constructor(props) {
    super(props);
    this.eventURL = '/event';
    this.OnEventClick = this
      .onEventClick
      .bind(this);
  }
  /**
   *
   * @returns {null} no return
   * @memberof HomePage
   */
  componentWillMount() {
    this
      .props
      .getCenters();
  }
  /**
 *
 * @returns{null} no return
 * @memberof HomePage
 */
  onEventClick() {
    history.push(this.eventURL);
  }
  /**
   *
   *
   * @returns {element} HTML element
   * @memberof HomePage
   */
  render() {
    const { listOfCenters } = this.props;
    const listSize = listOfCenters.length;
    const pageItems = listOfCenters.slice((listSize - 6), listSize.length);

    return (
      <div className="wrapper" id="wrapper">
        <section className="intro parallex-img" id="intro">
          <div
            className="d-flex flex-column"
            style={{ minHeight: '100vh' }}
          >
            <Header />
            <div
              className="jumbotron m-auto"
              id="banner"
              style={{
              position: 'relative'
            }}
            >
              <div className="container-fluid text-center">
                <h2 className="d-none d-md-block display-2 font-weight-bold">
              Book your events at the speed of thought
                </h2>
                <h1 className="d-md-none font-weight-bold text-white">
              Book your events at the speed of thought
                </h1>
                <h3 className="sub-banner font-italics">
                    Browse through the available events and showcase your events.
                    <br />
                  <span className="font-italic">
                      Let us help make your event come alive
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </section>
        <section
          className="latest parallex-img"
          id="latest"
        >
          {listSize > 0 &&
          <div className="row justify-content-center">
            {pageItems.map(center => (
              <div className="col-sm-6 col-md-4 col-lg-3 mt-2" key={center.id}>
                <CardBlock
                  id={center.id}
                  src={center.image
                  ? center.image
                  : undefined}
                  title={center.name}
                  onClick={this.onEventClick}
                  buttonText="Show more"
                >{center.location}
                </CardBlock>
              </div>
            ))}
          </div>}
          <div
            className="row justify-content-center m-4"
            style={{
              position: 'relative'
            }}
          >
            <button
              className="btn btn-dark btn-lg border-1 text-white py-3"
              onClick={this.onEventClick}
            >Explore more
            </button>
          </div>
        </section>
        <section className="contact parallex-img" id="contact">
          <div className="row align-items-center">
            <div className="col-sm-6 offset-sm-3 col-12 text-center align-items-center">
              <h2 className="display-4 text-white">GET IN TOUCH</h2>
              <Contact />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({ listOfCenters: state.center.allCenterList });
const matchDispatchToProps = dispatch => bindActionCreators({
  getCenters
}, dispatch);

HomePage.propTypes = {
  listOfCenters: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCenters: PropTypes.func.isRequired
};
export default connect(mapStateToProps, matchDispatchToProps)(HomePage);
