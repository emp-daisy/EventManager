import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Footer from './footer';
import Header from './header';
import Contact from './contact';
import CardBlock from './cards';
import {getCenters} from '../actions/center';
import {history} from '../actions/history';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.OnEventClick = this
      .OnEventClick
      .bind(this);
  }
  componentWillMount() {
    this
      .props
      .getCenters();
  }
  OnEventClick(event) {
    history.push('/events');
  }
  render() {
    const {listOfCenters} = this.props;
    const listSize = listOfCenters.length;
    const pageItems = listOfCenters.slice((listSize - 12), listSize.length);

    return (
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
        <section className="latest parallex-img" id="latest" style={{
            height: '100%'
          }}>
          <div className="img-overlay"/>
            {listSize > 0 && <div className="row justify-content-center">
              {pageItems.map(center => (
                    <div className="col-sm-6 col-md-4 col-lg-3 mt-2" key={center.id}>
                      <CardBlock
                        id={center.id}
                        src={center.image
                        ? center.image
                        : undefined}
                        title={center.name}
                        onClick={this.OnEventClick}
                        buttonText="Check events">{center.location}</CardBlock>
                    </div>
                  ))}
              
            </div>}
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
  }
};

const mapStateToProps = (state) => {
  return {listOfCenters: state.center.allCenterList};
}
const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCenters: getCenters
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(HomePage);
