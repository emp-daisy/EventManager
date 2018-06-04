import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import CardBlock from '../../components/cards';

const mockProps = {
  onClick: jest.fn(),
  id: 1,
  title: 'CARD',
  children: '<h4>Child props</h4>',
  facilities: []
};

describe.only('Card Block Component', () => {
  let wrapper;
  it('should render successful', () => {
    wrapper = shallow(<CardBlock {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render successful', () => {
    mockProps.facilities = ['foo'];
    wrapper = shallow(<CardBlock {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
