import notify from '../../reducers/notifyReducer';

describe('Notification Reducer', () => {
  it('should return the initial state', () => {
    expect(notify(undefined, {})).toEqual({});
  });

  it('should create an action to display notification', () => {
    const options = {
      message: 'Test message',
      level: 'error',
      autoDismiss: 0
    };
    const actionObject = {
      type: 'ADD_NOTIFICATION',
      options
    };
    expect(notify(undefined, actionObject)).toEqual({
      clear: false,
      config: options
    });
  });

  it('should create an action to clear notification', () => {
    const actionObject = {
      type: 'CLEAR_NOTIFICATION'
    };
    expect(notify(undefined, actionObject)).toEqual({
      clear: true
    });
  });
});
