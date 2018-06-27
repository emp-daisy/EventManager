import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import SearchBlock from '../../components/searchForm';

describe('Search Block Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SearchBlock />);
  });
  it('should render successful', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render successful with props', () => {
    wrapper = shallow(<SearchBlock {...{ dropDownArray: ['key-value'] }} />);
    expect(wrapper).toHaveLength(1);
  });
});
