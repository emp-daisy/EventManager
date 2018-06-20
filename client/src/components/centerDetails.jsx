import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Footer from './footer';
import HeaderBlock from './header';
import Spinner from './spinner';
import { createEvent } from '../actions/event';
import { getSingleCenters, deleteCenter, updateCenter } from '../actions/center';
import CenterModal from './centerFormModal';
import { isUserAdmin } from '../actions/authentication';
import getStates from '../actions/states';
import EventModal from './eventFormModal';
import ConfirmDelete from './confirmAlert';
import event from './../assets/imagenotavailable.png';
/**
 *
 *
 * @class HomePage
 * @extends {Component}
 */
export class CenterDetails extends Component {
  /**
   * Creates an instance of CenterDetails.
   * @param {any} props
   * @memberof CenterDetails
   */
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      activeModalData: {},
      modalAction: ''
    };
    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  /**
   *
   * @returns {null} no return
   * @memberof CenterDetails
   */
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.getSingleCenters(id);
  }
  /**
  *
  * @returns {null} no return
  * @memberof CenterDetails
  */
  componentDidUpdate() {
    $('[data-toggle="popover"]').popover();
  }
  /**
   *
   * @returns {null} no return
   * @memberof Dashboard
   */
  handleCreate() {
    this.setState({ showModal: true, modalAction: 'create' });
    document.body.classList.add('modal-open');
  }
  /**
   *
   * @returns {null} no return
   * @param {any} data
   * @param {any} tabIndex
   * @memberof CenterDetails
   */
  handleDelete(data) {
    this.setState({
      showModal: true, activeModalData: data, modalAction: 'delete'
    });
    document.body.classList.add('modal-open');
  }
  /**
   *
   * @returns {null} no return
   * @param {any} data
   * @param {any} tabIndex
   * @memberof CenterDetails
   */
  handleEdit(data) {
    this.setState({
      showModal: true, activeModalData: data, modalAction: 'edit'
    });
    document.body.classList.add('modal-open');
  }
  /**
   *
   * @returns {null} no return
   * @memberof CenterDetails
   */
  handleClose() {
    this.setState({ showModal: false });
    document.body.classList.remove('modal-open');
  }
  /**
   *
   *
   * @returns {element} HTML element
   * @memberof HomePage
   */
  render() {
    const center = this.props.centerDetails;
    const popover = {
      'data-trigger': 'hover',
      'data-toggle': 'popover',
      'data-content': 'Login to book center',
      'data-placement': 'left'
    };
    return (
      <div className="inner-wrapper">

        {this.props.loading && <Spinner />}

        <HeaderBlock />
        <section className="d-flex flex-column justify-content-center align-items-center flex-grow" id="center-details">
          {this.props.centerDetails.id &&
            <div className="col-md-6">
              <h4><u className="font-weight-bold">Full Description</u></h4>
              <div
                className="center-details-img-top"
                style={{ backgroundImage: `url(${center.image || event})` }}
              />
              <div className="center-details-body">
                <h4 className="center-details-title display-4 text-uppercase font-weight-bold">
                  {center.name}
                </h4>
                <p className="center-details-text">
                  {center.description}
                </p>
                <hr />
                <span className="font-weight-bold">Address</span>
                <p className="lead" >{center.location}</p>
                {center.facilities && center.facilities.length > 0 &&
                <ul className="list-inline">
                  <hr />
                  <span className="font-weight-bold">Facilities<br /></span>
                  {center.facilities.map(facility => (
                    <li className="list-inline-item lead" key={facility}>
                      <span className="fa fa-star" /> {facility}
                    </li>))}
                </ul>}
                <hr />
                {isUserAdmin() &&
                <div>
                  <button
                    onClick={() => this.handleEdit(center)}
                    className="btn btn-dark btn-lg border-1 text-white p-3 m-2"
                  >
                Update
                  </button>
                  <button
                    onClick={() => this.handleDelete(center)}
                    className="btn btn-danger btn-lg border-1 text-white p-3 m-2"
                  >
                Delete
                  </button>
                </div>
                }
                <span
                  id="btn-book-center"
                  className="d-inline-block span-floating"
                  {...(this.props.loggedIn ? {} : popover)}
                >
                  <button
                    onClick={() => this.handleCreate()}
                    className={`btn-lg btn-floating ${(this.props.loggedIn) ? '' : 'disabled'}`}
                  ><i className="fa fa-plus" />
                  </button>
                </span>
              </div>
            </div>
         }
        </section>
        <Footer />
        {this.state.showModal && isUserAdmin() &&
          <div className="overlayModal">
            {this.state.modalAction === 'delete' &&
            <ConfirmDelete
              name={this.state.activeModalData.name}
              onConfirm={() => this.props.deleteCenter(this.state.activeModalData.id)}
              onCancel={this.handleClose}
            />
            }
            {this.state.modalAction === 'edit' &&
              <CenterModal
                isCreate={false}
                handleSubmit={this.props.updateCenter}
                onClose={this.handleClose}
                allStates={this.props.getStates}
                prevData={this.state.activeModalData}
              />
            }
            {this.state.modalAction === 'create' &&
            <EventModal
              isCreate
              onClose={this.handleClose}
              handleSubmit={this.props.createEvent}
              center={this.props.centerDetails.id}
            />
            }
          </div>
        }
        {this.state.showModal && this.props.loggedIn &&
        <div className="overlayModal">
          {this.state.modalAction === 'create' &&
          <EventModal
            isCreate
            onClose={this.handleClose}
            handleSubmit={this.props.createEvent}
            center={{ id: this.props.centerDetails.id, name: this.props.centerDetails.name }}
          />
            }
        </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  centerDetails: state.center.singleCenter.center,
  loading: state.center.isLoading,
  loggedIn: state.user.isLoggedIn,
});
const matchDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSingleCenters,
      createEvent,
      getStates,
      deleteCenter,
      updateCenter
    },
    dispatch
  );

CenterDetails.propTypes = {
  getSingleCenters: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  centerDetails: PropTypes.objectOf(PropTypes.any).isRequired,
  loading: PropTypes.bool.isRequired,
  deleteCenter: PropTypes.func.isRequired,
  updateCenter: PropTypes.func.isRequired,
  getStates: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(CenterDetails);
