import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedLogin, { Login } from '../../components/Login';

const mockStore = configureStore();
const mockProps = {
  loggedIn: true,
  loading: false,
  alert: false,
  alertMessage: 'PropTypes.string.isRequired',
  login: jest.fn(),
  clearNotification: jest.fn(),
  history: {
    push: jest.fn()
  },
  errors: {}
};


describe('Login Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Login {...mockProps} />);
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it('should render successful', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update component', () => {
    const nextProps = {
      loggedIn: true
    };
    wrapper.instance().componentWillUpdate(nextProps);
    expect(mockProps.history.push).toHaveBeenCalled();
  });

  it('should update component withoiut redirecting', () => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    mockProps.loggedIn = false;
    wrapper = shallow(<Login {...mockProps} />);
    expect(mockProps.history.push).not.toHaveBeenCalled();
  });

  it('should run onChangeState function', () => {
    const event = {
      target: {
        name: 'email',
        value: 'test@email.com'
      }
    };
    wrapper.instance().onChangeState(event);
    expect(wrapper.state().email).toEqual(event.target.value);
  });

  it('should run onCancel function', () => {
    wrapper.instance().onCancel();
    expect(wrapper.state().showModal).toEqual(false);
  });

  it('should run onShowModal function', () => {
    wrapper.instance().onShowModal();
    expect(wrapper.state().showModal).toEqual(true);
  });

  it('should run onSubmit function', () => {
    const event = {
      preventDefault: () => {}
    };
    const onUpdate = jest.spyOn(Login.prototype, 'componentWillUpdate');

    wrapper.setProps({
      loggedIn: false
    });
    wrapper.instance().onSubmit(event);
    expect(onUpdate).toHaveBeenCalled();
  });
  it('should run onSubmit function with no error', () => {
    const event = {
      preventDefault: () => {}
    };
    wrapper.setProps({
      loggedIn: false
    });
    wrapper.setState({
      email: 'abc@a.com',
      errors: {
        email: false
      }
    });
    wrapper.instance().onSubmit(event);
    expect(mockProps.login).toHaveBeenCalled();
  });

  it('should show alert', () => {
    const WillUpdate = jest.spyOn(Login.prototype, 'componentWillUpdate');

    wrapper.setProps({
      alert: true
    });
    expect(WillUpdate).toHaveBeenCalled();
  });

  it('should show spinner', () => {
    const WillUpdate = jest.spyOn(Login.prototype, 'componentWillUpdate');

    wrapper.setProps({
      loading: true
    });
    expect(WillUpdate).toHaveBeenCalled();
  });

  describe('Connected Logincomponent', () => {
    it('should render connected component', () => {
      const store = mockStore({
        user: {
          isLoading: true,
          isLoggedIn: false,
          error: false,
          errorMessage: ''
        }
      });
      const history = {
        push: jest.fn()
      };
      wrapper = shallow(<ConnectedLogin store={store} history={history} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
