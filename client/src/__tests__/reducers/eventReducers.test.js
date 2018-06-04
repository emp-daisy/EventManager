import events from '../../reducers/eventReducers';

describe('Events Reducer', () => {
  it('should return the initial state', () => {
    expect(events(undefined, {})).toEqual({
      isLoading: false,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      eventList: [],
      allEventList: [],
      pageItems: []
    });
  });

  it('should create an action to get all EVENTS', () => {
    const actionObject = {
      type: 'REQUEST_EVENTS'
    };
    expect(events({
      isLoading: false,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      eventList: [],
      allEventList: [],
      pageItems: []
    }, actionObject)).toMatchObject({
      isLoading: true,
      error: false
    });
  });

  it('should create an action when all event retrieval fails', () => {
    const actionObject = {
      type: 'REQUEST_EVENTS_FAILED',
      msg: 'Error message'
    };
    expect(events({
      isLoading: true,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      eventList: [],
      allEventList: [],
      pageItems: []
    }, actionObject)).toMatchObject({
      isLoading: false,
      error: true,
      errorMessage: actionObject.msg
    });
  });

  it('should create an action when requesting all event retrieval passes', () => {
    const actionObject = {
      type: 'REQUEST_EVENTS_GRANTED',
      data: []
    };
    expect(events({
      isLoading: true,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      eventList: [],
      allEventList: [],
      pageItems: []
    }, actionObject)).toMatchObject({
      isLoading: false,
      error: false,
      eventList: actionObject.data,
      allEventList: actionObject.data
    });
  });

  it('should create an action to get all user EVENTS', () => {
    const actionObject = {
      type: 'REQUEST_USER_EVENTS'
    };
    expect(events({
      isLoading: false,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      eventList: [],
      allEventList: [],
      pageItems: []
    }, actionObject)).toMatchObject({
      isLoading: true,
      error: false
    });
  });

  it('should create an action when all user event retrieval fails', () => {
    const actionObject = {
      type: 'REQUEST_USER_EVENTS_FAILED',
      msg: 'Error message'
    };
    expect(events({
      isLoading: true,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      eventList: [],
      allEventList: [],
      pageItems: []
    }, actionObject)).toMatchObject({
      isLoading: false,
      error: true,
      errorMessage: actionObject.msg
    });
  });

  it('should create an action when requesting all user event retrieval passes', () => {
    const actionObject = {
      type: 'REQUEST_USER_EVENTS_GRANTED',
      data: []
    };
    expect(events({
      isLoading: true,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      eventList: [],
      allEventList: [],
      pageItems: []
    }, actionObject)).toMatchObject({
      isLoading: false,
      error: false,
      eventList: actionObject.data,
      allEventList: actionObject.data
    });
  });

  it('should create an action to DELETE an event', () => {
    const actionObject = {
      type: 'DELETE_EVENTS'
    };
    expect(events({
      isLoading: false,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      eventList: [],
      allEventList: [],
      pageItems: []
    }, actionObject)).toMatchObject({
      isLoading: true,
      error: false
    });
  });

  it('should create an action when deleting event fails', () => {
    const actionObject = {
      type: 'DELETE_EVENTS_FAILED',
      errorMessage: 'Error message'
    };
    expect(events({
      isLoading: true,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      eventList: [],
      allEventList: [],
      pageItems: []
    }, actionObject)).toMatchObject({
      isLoading: false,
      error: true,
      errorMessage: actionObject.msg
    });
  });

  it('should create an action when deleting EVENTS succeeds', () => {
    const actionObject = {
      type: 'DELETE_EVENTS_GRANTED',
      id: 111
    };
    expect(events({
      isLoading: true,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      eventList: [{
        id: 111,
        name: 'Test id'
      }],
      allEventList: [{
        id: 111,
        name: 'Test id'
      }],
      pageItems: []
    }, actionObject)).toMatchObject({
      isLoading: false,
      error: false,
      eventList: [],
      allEventList: []
    });
  });

  it('should create an action to CREATE an event', () => {
    const actionObject = {
      type: 'CREATE_EVENTS'
    };
    expect(events({
      isLoading: false,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      eventList: [],
      allEventList: [],
      pageItems: []
    }, actionObject)).toMatchObject({
      isLoading: true,
      error: false
    });
  });

  it('should create an action when creating event fails', () => {
    const actionObject = {
      type: 'CREATE_EVENTS_FAILED',
      msg: 'Error message'
    };
    expect(events({
      isLoading: true,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      eventList: [],
      allEventList: [],
      pageItems: []
    }, actionObject)).toMatchObject({
      isLoading: false,
      error: true,
      errorMessage: actionObject.msg
    });
  });

  it('should create an action when creating EVENTS succeeds', () => {
    const actionObject = {
      type: 'CREATE_EVENTS_GRANTED',
      newData: {}
    };
    expect(events({
      isLoading: false,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      eventList: [],
      allEventList: [],
      pageItems: []
    }, actionObject)).toMatchObject({
      isLoading: false,
      error: false,
      eventList: [actionObject.newData],
      allEventList: [actionObject.newData]
    });
  });

  it('should UPDATE an action to UPDATE an event', () => {
    const actionObject = {
      type: 'UPDATE_EVENTS'
    };
    expect(events({
      isLoading: false,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      eventList: [],
      allEventList: [],
      pageItems: []
    }, actionObject)).toMatchObject({
      isLoading: true,
      error: false
    });
  });

  it('should UPDATE an action when updating event fails', () => {
    const actionObject = {
      type: 'UPDATE_EVENTS_FAILED',
      msg: 'Error message'
    };
    expect(events({
      isLoading: true,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      eventList: [],
      allEventList: [],
      pageItems: []
    }, actionObject)).toMatchObject({
      isLoading: false,
      error: true,
      errorMessage: actionObject.msg
    });
  });

  it('should UPDATE an action when updating EVENTS succeeds', () => {
    const actionObject = {
      type: 'UPDATE_EVENTS_GRANTED',
      newData: {
        id: 111,
        name: 'New Test Event'
      }
    };
    expect(events({
      isLoading: false,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      eventList: [{
        id: 111,
        name: 'Test event'
      }],
      allEventList: [{
        id: 111,
        name: 'Test event'
      }],
      pageItems: []
    }, actionObject)).toMatchObject({
      isLoading: true,
      error: false,
      eventList: [actionObject.newData],
      allEventList: [actionObject.newData]
    });
  });

  it('should not UPDATE an action when updating EVENTS succeeds', () => {
    const actionObject = {
      type: 'UPDATE_EVENTS_GRANTED',
      newData: {
        id: 111,
        name: 'New Test Event'
      }
    };
    expect(events({
      isLoading: false,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      eventList: [{
        id: 123,
        name: 'Test event'
      }],
      allEventList: [{
        id: 123,
        name: 'Test event'
      }],
      pageItems: []
    }, actionObject)).toMatchObject({
      isLoading: true,
      error: false,
      eventList: [{
        id: 123,
        name: 'Test event'
      }],
      allEventList: [{
        id: 123,
        name: 'Test event'
      }]
    });
  });

  it('should UPDATE an action to FILTER events', () => {
    const actionObject = {
      type: 'FILTER_EVENTS_BY',
      data: []
    };
    expect(events({
      isLoading: false,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      eventList: [],
      allEventList: [],
      pageItems: []
    }, actionObject)).toMatchObject({
      isLoading: false,
      error: false,
      eventList: actionObject.data
    });
  });

  it('should UPDATE an action when handling pagination', () => {
    const actionObject = {
      type: 'PAGINATE_EVENTS'
    };
    expect(events({
      isLoading: false,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      eventList: [],
      allEventList: [],
      pageItems: []
    }, actionObject)).toMatchObject({
      pageItems: []
    });
  });
});
