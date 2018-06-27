import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Spinner from '../../components/spinner';

describe('Spinner Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Spinner />);
  });
  it('should render successful', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
