import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Footer from '../../components/footer';

describe.only('Footer Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Footer />);
  });
  it('should render successful', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
