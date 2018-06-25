import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedForgottenPassword, { ForgottenPassword } from '../../components/forgotPasswordModal';


const mockStore = configureStore();
const mockProps = {
  // onCancel: jest.fn(),
  forgottenPassword: jest.fn(),
};
describe.only('Forgot Password Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ForgottenPassword {...mockProps} />);
  });
  it('should render successful', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should run onTextChange function', () => {
    const event = {
      target: {
        name: 'email',
        value: 'test@email.com'
      }
    };
    wrapper.instance().onTextChange(event);
    expect(wrapper.state().email).toEqual(event.target.value);
  });

  it('should run onSubmit function', () => {
    const event = {
      preventDefault: () => {}
    };
    wrapper.setProps({
      loggedIn: false
    });
    wrapper.instance().onSubmit(event);
    expect(mockProps.forgottenPassword).not.toHaveBeenCalled();
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
    expect(mockProps.forgottenPassword).toHaveBeenCalled();
  });
  describe('Connected Forgot Password  component', () => {
    it('should render connected component', () => {
      const store = mockStore({
        user: {
          isLoading: false,
          alert: false,
          alertMessage: ''
        }
      });
      wrapper = shallow(<ConnectedForgottenPassword
        store={store}
      />);
      expect(wrapper.length).toBe(1);
    });
  });
});
