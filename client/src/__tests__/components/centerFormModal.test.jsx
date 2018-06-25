import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import CenterModal from '../../components/centerFormModal';

const mockProps = {
  isCreate: true,
  handleSubmit: jest.fn(),
  allStates: jest.fn(),
  onClose: jest.fn(),
  prevData: { facilities: ['bar'] }
};

describe('Center Modal Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CenterModal {...mockProps} />);
  });

  describe.only('Default components', () => {
    it('should render successful', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render create button', () => {
      const createBtn = wrapper.findWhere(x => x.text() === 'Add Center');
      expect(createBtn).toHaveLength(1);
    });
    it('should render update button', () => {
      const addMockProps = {
        isCreate: false
      };
      wrapper = shallow(<CenterModal {...mockProps} {...addMockProps} />);
      const updateBtn = wrapper.findWhere(x => x.text() === 'Update Center');
      expect(updateBtn).toHaveLength(1);
    });
    it('should run handleChange function', () => {
      const event = {
        target: {
          name: 'name',
          value: 'centerName'
        }
      };
      wrapper.instance().handleChange(event);
      expect(wrapper.state().formData.name).toEqual(event.target.value);
    });
    it('should run handleSelectChange function', () => {
      const option = {
        id: 25,
        value: 'Lagos'
      };
      wrapper.instance().handleSelectChange(option, 'location');
      expect(wrapper.state().formData.location).toEqual(option);
    });
    it('should run onSubmit function', () => {
      const event = {
        preventDefault: () => {}
      };
      wrapper.setProps({
        loggedIn: false
      });
      wrapper.instance().onSubmit(event);
      expect(mockProps.onClose).toHaveBeenCalled();
    });
    it('should run onSubmit function with no error', () => {
      const event = {
        preventDefault: () => {}
      };
      wrapper.setState({
        formData: {
          name: 'centerName',
          location: 'Address',
          state: { id: 25 },
          facilities: []
        }
      });
      wrapper.instance().onSubmit(event);
      expect(mockProps.handleSubmit).toHaveBeenCalled();
    });
    it('should run onSubmit function with no error when updating', () => {
      const event = {
        preventDefault: () => {}
      };
      wrapper.setProps({
        isCreate: false
      });
      wrapper.setState({
        formData: {
          name: 'centerName',
          location: 'Address',
          state: { id: 25 },
          facilities: ['bar']
        }
      });
      wrapper.instance().onSubmit(event);
      expect(mockProps.handleSubmit).toHaveBeenCalled();
    });
  });
});
