import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedHomePage, { HomePage } from '../../components/home';

const mockStore = configureStore();
const history = {
  push: jest.fn()
};
const mockProps = {
  listOfCenters: [],
  getCenters: jest.fn(),
  history,
  location: {
    pathname: '/'
  }
};

describe('HomePage Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<HomePage {...mockProps} history={history} />);
  });

  describe('Default components', () => {
    it('should render successful', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render successful with items in centerList', () => {
      mockProps.listOfCenters = [{
        id: 2, image: undefined, name: 'Test block', location: 'Jest'
      }];
      expect(wrapper).toMatchSnapshot();
    });
    it('should render successful with items in centerList including image', () => {
      mockProps.listOfCenters = [{
        id: 2, image: 'image', name: 'Test block', location: 'Jest'
      }];
      expect(wrapper).toMatchSnapshot();
    });
    it('should run onCenterPageNavigate function', () => {
      wrapper.instance().onCenterPageNavigate();
      expect(mockProps.history.push).toHaveBeenCalled();
    });
  });

  describe('Connected HomePage component', () => {
    it('should render connected component', () => {
      const store = mockStore({
        center: {
          allCenterList: []
        }
      });
      wrapper = shallow(<ConnectedHomePage
        store={store}
        history={history}
        location={mockProps.location}
      />);
      expect(wrapper.length).toBe(1);
    });
  });
});
