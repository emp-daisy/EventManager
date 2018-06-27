import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Footer from './footer';
import HeaderBlock from './header';
import CardBlock from './cards';
import { getCenters } from '../actions/center';
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
    this.state = { centerUrl: '/centers' };
    this.onCenterPageNavigate = this.onCenterPageNavigate.bind(this);
  }
  /**
   *
   * @returns {null} no return
   * @memberof HomePage
   */
  componentWillMount() {
    this.props.getCenters();
  }
  /**
   *
   * @returns{null} no return
   * @memberof HomePage
   */
  onCenterPageNavigate() {
    this.props.history.push(this.state.centerUrl);
  }
  /**
   *
   *
   * @returns {element} HTML element
   * @memberof HomePage
   */
  render() {
    const { listOfCenters } = this.props;

    return (
      <div >
        <section className="intro parallex-img" id="intro">
          <div className="d-flex flex-column">
            <HeaderBlock location={this.props.location.pathname} />
            <div className="jumbotron home m-auto" id="banner">
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
        <section className="latest parallex-img" id="latest">
          <h3 className="text-white p-2">Latest Centers</h3>
          {listOfCenters.length > 0 && (
            <div className="row justify-content-center m-2">
              {listOfCenters.slice(0, 6).map(center => (
                <div
                  className="col-sm-6 col-md-4 col-lg-3 mt-2"
                  key={center.id}
                >
                  <CardBlock
                    id={center.id}
                    src={center.image ? center.image : undefined}
                    title={center.name}
                    onClick={() => {
                      this.props.history.push(`/center/description/${center.id}`);
                    }}
                    buttonText="View"
                  >
                    {center.location}
                  </CardBlock>
                </div>
              ))}
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-dark btn-lg border-1 text-white py-3"
                  onClick={this.onCenterPageNavigate}
                >
                  Explore Centers <br />
                  <span className="fa fa-arrow-circle-o-right" />
                </button>
              </div>
            </div>
          )}
        </section>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  listOfCenters: state.center.allCenterList
});
const matchDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCenters
    },
    dispatch
  );

HomePage.propTypes = {
  listOfCenters: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCenters: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired
};

export default connect(mapStateToProps, matchDispatchToProps)(HomePage);
