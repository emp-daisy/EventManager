import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import NotFound from '../../components/notFound';

describe.only('NotFound Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NotFound />);
  });
  it('should render successful', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
