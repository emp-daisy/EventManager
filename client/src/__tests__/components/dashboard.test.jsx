import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedDashboard, { Dashboard } from '../../components/dashboard';

const mockStore = configureStore();
const history = {
  push: jest.fn()
};
const mockProps = {
  createCenter: jest.fn(),
  deleteEvent: jest.fn(),
  filterEventsBy: jest.fn(),
  updateEvent: jest.fn(),
  getEventsByUser: jest.fn(),
  loggedIn: true,
  history,
  listOfEvents: { centers: [] },
  getStates: jest.fn(),
  getCentersOptions: jest.fn()
};

describe('Dashboard Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Dashboard {...mockProps} />);
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('Default components', () => {
    it('should render successful', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render successful when not logged in', () => {
      mockProps.loggedIn = false;
      expect(wrapper).toHaveLength(1);
    });
    it('should update component and redirect', () => {
      mockProps.loggedIn = false;
      wrapper = shallow(<Dashboard {...mockProps} />);
      expect(mockProps.history.push).toHaveBeenCalled();
    });
    it('should run onChange function', () => {
      const event = {
        target: {
          name: 'searchText',
          value: 'searchText'
        }
      };
      wrapper.instance().onChange(event);
      expect(wrapper.state().searchText).toEqual(event.target.value);
    });
    it('should run onSearchReset function', () => {
      wrapper.instance().onSearchReset();
      expect(wrapper.state().searchText).toEqual('');
      expect(wrapper.state().searching).toBeFalsy();
    });
    it('should run onSearch function', () => {
      wrapper.instance().onSearch();
      expect(wrapper.state().searching).toBeTruthy();
    });
    it('should run handlePageChange function', () => {
      wrapper.instance().handlePageChange(2);
      expect(wrapper.state().activePage).toEqual(2);
    });
    it('should run handleClose function', () => {
      const removeSpy = jest.spyOn(document.body.classList, 'remove');
      wrapper.instance().handleClose();
      expect(removeSpy).toHaveBeenCalled();
    });
    it('should run handleCreate function', () => {
      const addSpy = jest.spyOn(document.body.classList, 'add');
      wrapper.instance().handleCreate({});
      expect(addSpy).toHaveBeenCalled();
    });
    it('should run handleEdit function', () => {
      const addSpy = jest.spyOn(document.body.classList, 'add');
      wrapper.instance().handleEdit({});
      expect(addSpy).toHaveBeenCalled();
    });
    it('should run handleDelete function', () => {
      wrapper.setState({ activeModelData: {} });
      const addSpy = jest.spyOn(document.body.classList, 'add');
      wrapper.instance().handleDelete({});
      expect(addSpy).toHaveBeenCalled();
    });
  });

  describe('Connected Dashboard component', () => {
    it('should render connected component', () => {
      const store = mockStore({
        event: {
          eventList: []
        },
        user: {
          isLoggedIn: true
        }
      });
      wrapper = shallow(<ConnectedDashboard store={store} {...mockProps} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
