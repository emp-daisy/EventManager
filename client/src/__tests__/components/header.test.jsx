import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedHeader, { Header } from '../../components/header';

const mockStore = configureStore();
const history = {
  push: jest.fn()
};
const mockProps = {
  loggedIn: false,
  // logOut: jest.fn(),
  history,
  location: '/'
};

describe.only('Card Block Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Header {...mockProps} history={history} />);
  });
  it('should render successful', () => {
    wrapper = shallow(<Header {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render successful for logged in user', () => {
    mockProps.loggedIn = true;
    wrapper = shallow(<Header {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should run onLogOut function when not passed', () => {
    wrapper = shallow(<Header {...mockProps} history={history} />);
    wrapper.instance().onLogOut();
    // expect(mockProps.logOut).toHaveBeenCalled();
  });

  it('should run onLogOut function', () => {
    const propsExt = Object.assign(mockProps, { logOut: jest.fn() });
    wrapper = shallow(<Header {...propsExt} history={history} />);
    wrapper.instance().onLogOut();
    expect(mockProps.logOut).toHaveBeenCalled();
  });

  describe('Connected Header component', () => {
    it('should render connected component', () => {
      const store = mockStore({
        user: {
          isLoggedIn: true
        }
      });
      wrapper = shallow(<ConnectedHeader store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
