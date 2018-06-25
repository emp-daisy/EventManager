import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import ConfirmAlert from '../../components/confirmAlert';

const mockProps = {
  name: '',
  onCancel: jest.fn(),
  onConfirm: jest.fn()
};

describe.only('Footer Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ConfirmAlert />);
  });
  it('should render successful', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render successful without props', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should run onClose and onConfirm function', () => {
    wrapper = shallow(<ConfirmAlert {...mockProps} />);
    wrapper.find('button').at(0).simulate('click');
    expect(mockProps.onConfirm).toHaveBeenCalled();
    expect(mockProps.onCancel).toHaveBeenCalled();
  });
  it('should run without props', () => {
    wrapper = shallow(<ConfirmAlert />);
    wrapper.find('button').at(0).simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
});
