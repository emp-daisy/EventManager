import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import EventModal from '../../components/eventFormModal';

const mockProps = {
  isCreate: true,
  handleSubmit: jest.fn(),
  allStates: jest.fn(),
  onClose: jest.fn(),
};

describe('Event Modal Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EventModal {...mockProps} />);
  });

  describe.only('Default components', () => {
    it('should render successful', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('renders with update props without exploding', () => {
      const addMockProps = {
        isCreate: false,
        prevData: { Center: { name: 'Certain Center' } }
      };
      wrapper = shallow(<EventModal {...mockProps} {...addMockProps} />);
      expect(wrapper).toHaveLength(1);
    });
    it('should run handleChange function', () => {
      const event = {
        target: {
          name: 'name',
          value: 'eventName'
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
      wrapper.instance().onSubmit(event);
      expect(mockProps.onClose).toHaveBeenCalled();
    });
    it('should run onSubmit function with no error', () => {
      const event = {
        preventDefault: () => {}
      };
      wrapper.setState({
        formData: {
          name: 'eventName',
          location: { id: 25 },
          startDate: '2099-03-12',
          endDate: '2099-03-25'
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
        isCreate: false,
        prevData: { Center: { name: 'Certain Center' } }
      });
      wrapper.setState({
        formData: {
          name: 'eventName',
          location: { id: 25 },
          startDate: '2099-03-12',
          endDate: '2099-03-25'
        }
      });
      wrapper.instance().onSubmit(event);
      expect(mockProps.handleSubmit).toHaveBeenCalled();
    });
  });
});
