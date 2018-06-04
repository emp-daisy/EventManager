import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addNotification,
  connectionError,
  validationError
} from '../../actions/notify';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Notification Actions', () => {
  it('it should return an object for adding notification', () => {
    expect(addNotification({
      message: 'A single notification'
    })).toEqual({
      type: 'ADD_NOTIFICATION',
      options: {
        message: 'A single notification'
      }
    });
  });

  it('it should dispatch action for adding NOTIFICATION', () => {
    const expectedAction = {
      type: 'ADD_NOTIFICATION',
      options: {
        message: 'Error connecting',
        level: 'error',
        autoDismiss: 0
      }
    };
    const store = mockStore({});
    store.dispatch = jest.fn();
    store.dispatch(connectionError(store.dispatch, 'Error connecting'));

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('it should dispatch action for adding NOTIFICATION with default message', () => {
    const expectedAction = {
      type: 'ADD_NOTIFICATION',
      options: {
        message: 'Error connecting to server...',
        level: 'error',
        autoDismiss: 0
      }
    };
    const store = mockStore({});
    store.dispatch = jest.fn();
    store.dispatch(connectionError(store.dispatch));

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('it should return validation error messages as string', () => {
    expect(validationError({
      msg: {
        message: 'A single notification',
        surname: 'Should be more than 3 characters'
      }
    })).toEqual('A single notification<br />Should be more than 3 characters');
  });

  it('it should return validation error messages if it is  string', () => {
    expect(validationError({
      msg: 'A single validation message'
    })).toEqual('A single validation message');
  });
});
