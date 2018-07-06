import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedCenterDetails, { CenterDetails } from '../../components/centerDetails';

const mockStore = configureStore();
const mockProps = {
  listOfCenters: [],
  getSingleCenters: jest.fn(),
  createEvent: jest.fn(),
  match: {
    params: { id: 1 }
  },
  history: {
    push: jest.fn()
  },
  centerDetails: { id: 1 },
  loading: false,
  deleteCenter: jest.fn(),
  updateCenter: jest.fn(),
  getStates: jest.fn(),
  loggedIn: true,
  eventLoading: false,
  centerLoading: false
};

describe('Center Details Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CenterDetails {...mockProps} />);
  });

  describe('Default components', () => {
    it('should render successful', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render successful when not logged in', () => {
      mockProps.loggedIn = false;
      expect(wrapper).toMatchSnapshot();
    });
    it('should update successful when not logged in', () => {
      wrapper.setProps({ loading: true });
      expect($().popover).toHaveBeenCalled();
    });
    it('should render successful when loading center details', () => {
      mockProps.loading = true;
      expect(wrapper).toMatchSnapshot();
    });
    it('should render with facilities', () => {
      const onWillUpdate = jest.fn();
      CenterDetails.prototype.componentWillUpdate = onWillUpdate;

      wrapper.setProps({
        centerDetails: {
          id: 1,
          facilities: ['foo']
        }
      });
      expect(onWillUpdate).toHaveBeenCalled();
    });
    it('should render with create modal', () => {
      const WillUpdate = jest.spyOn(CenterDetails.prototype, 'componentWillUpdate');

      wrapper.setProps({
        loggedIn: true
      });
      wrapper.setState({
        showModal: true,
        modalAction: 'create'
      });
      expect(WillUpdate).toHaveBeenCalled();
    });
    it('should run handleClose function', () => {
      const removeSpy = jest.spyOn(document.body.classList, 'remove');
      wrapper.instance().handleClose();
      expect(removeSpy).toHaveBeenCalled();
    });
    it('should run handleCreate function', () => {
      const addSpy = jest.spyOn(document.body.classList, 'add');
      wrapper.instance().handleCreate();
      expect(addSpy).toHaveBeenCalled();
    });
    it('should run handleEdit function', () => {
      const addSpy = jest.spyOn(document.body.classList, 'add');
      wrapper.instance().handleEdit();
      expect(addSpy).toHaveBeenCalled();
    });
    it('should run handleDelete function', () => {
      const addSpy = jest.spyOn(document.body.classList, 'add');
      wrapper.instance().handleDelete();
      expect(addSpy).toHaveBeenCalled();
    });
  });

  describe('Connected CenterDetails component', () => {
    it('should render connected component', () => {
      const store = mockStore({
        center: {
          allCenterList: [],
          isLoading: false,
          singleCenter: { center: {} }
        },
        event: {
          isLoading: false
        },
        user: {
          isLoggedIn: true
        }
      });
      wrapper = shallow(<ConnectedCenterDetails store={store} {...mockProps} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
