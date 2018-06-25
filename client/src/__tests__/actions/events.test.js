import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { deleteEvent, createEvent, updateEvent, filterEventsBy, getEventsByUser } from '../../actions/event';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

describe('Event Actions', () => {
  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  describe('FETCH EVENT', () => {
    it('it should fetch events with no return', () => {
      fetchMock.getOnce('/v1/events', {
        body: {},
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'REQUEST_USER_EVENTS'
      }, {
        type: 'REQUEST_USER_EVENTS_GRANTED',
        data: []
      }];

      return store.dispatch(getEventsByUser()).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should fetch events', () => {
      fetchMock.getOnce('/v1/events', {
        body: {
          val: []
        },
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'REQUEST_USER_EVENTS'
      }, {
        type: 'REQUEST_USER_EVENTS_GRANTED',
        data: []
      }];

      return store.dispatch(getEventsByUser()).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should fetch events with 500 error', () => {
      fetchMock.getOnce('/v1/events', Promise.reject());
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'REQUEST_USER_EVENTS'
      }, {
        type: 'REQUEST_USER_EVENTS_FAILED',
        msg: 'Error connecting to server...'
      }];

      return store.dispatch(getEventsByUser()).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
  });

  describe('CREATE EVENT', () => {
    it('it should create events', () => {
      fetchMock.postOnce('/v1/events/', {
        status: 201,
        body: { val: { name: 'eventOne' } },
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CREATE_EVENTS'
      }, {
        type: 'CREATE_EVENTS_GRANTED',
        newData: { name: 'eventOne' }
      }];

      return store.dispatch(createEvent({ name: 'eventOne' })).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should create events with failed response', () => {
      fetchMock.postOnce('/v1/events/', {
        status: 401,
        body: { val: { name: 'eventOne' } },
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CREATE_EVENTS'
      }, {
        type: 'CREATE_EVENTS_FAILED',
        msg: 'Error creating new event. TRY AGAIN LATER'
      }];

      return store.dispatch(createEvent({ name: 'eventOne' })).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should create events with 500 response', () => {
      fetchMock.postOnce('/v1/events/', Promise.reject());
      const expectedActions = [{
        type: 'CREATE_EVENTS'
      }, {
        type: 'CREATE_EVENTS_FAILED',
        msg: 'Error creating new event...'
      }];

      return store.dispatch(createEvent({ name: 'eventOne', filesToUpload: 'files' })).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
  });

  describe('UPDATE EVENT', () => {
    it('it should update events', () => {
      fetchMock.putOnce('/v1/events/1', {
        status: 200,
        body: { val: { name: 'eventOne' } },
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'UPDATE_EVENTS'
      }, {
        type: 'UPDATE_EVENTS_GRANTED',
        newData: { name: 'eventOne' }
      }];

      return store.dispatch(updateEvent({ name: 'eventOne' }, 1)).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should update events with failed response', () => {
      fetchMock.putOnce('/v1/events/1', {
        status: 401,
        body: { val: { name: 'eventOne' } },
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'UPDATE_EVENTS'
      }, {
        type: 'UPDATE_EVENTS_FAILED',
        msg: 'Error updating event. TRY AGAIN LATER'
      }];

      return store.dispatch(updateEvent({ name: 'eventOne' }, 1)).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should update events with failed promise', () => {
      fetchMock.putOnce('/v1/events/1', Promise.reject());
      const expectedActions = [{
        type: 'UPDATE_EVENTS'
      }, {
        type: 'UPDATE_EVENTS_FAILED',
        msg: 'Error updating event...'
      }];

      return store.dispatch(updateEvent({ name: 'eventOne' }, 1)).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
  });

  describe('DELETE EVENT', () => {
    it('it should delete events', () => {
      fetchMock.deleteOnce('/v1/events/1', {
        body: {},
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'DELETE_EVENTS'
      }, {
        type: 'DELETE_EVENTS_GRANTED',
        id: 1
      }];

      return store.dispatch(deleteEvent(1)).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should delete events with failure', () => {
      fetchMock.deleteOnce('/v1/events/1', 400);
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'DELETE_EVENTS'
      }, {
        type: 'DELETE_EVENTS_FAILED',
        msg: 'Error deleting from to server. TRY AGAIN LATER'
      }];

      return store.dispatch(deleteEvent(1)).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should delete events with 500 error', () => {
      fetchMock.deleteOnce('/v1/events/1', Promise.reject());
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'DELETE_EVENTS'
      }, {
        type: 'DELETE_EVENTS_FAILED',
        msg: 'Error deleting from to server...'
      }];

      return store.dispatch(deleteEvent(1)).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
  });
  describe('FIlter Event', () => {
    it('it should fetch events with no return', () => {
      fetchMock.getOnce('/v1/events/?name=eventone', {
        body: {},
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'REQUEST_USER_EVENTS'
      }, {
        type: 'REQUEST_USER_EVENTS_GRANTED',
        data: []
      }];

      return store.dispatch(filterEventsBy('eventone')).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should fetch events', () => {
      fetchMock.getOnce('/v1/events/?name=eventone', {
        body: {
          val: []
        },
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'REQUEST_USER_EVENTS'
      }, {
        type: 'REQUEST_USER_EVENTS_GRANTED',
        data: []
      }];

      return store.dispatch(filterEventsBy('eventone')).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should fetch events with 500 error', () => {
      fetchMock.getOnce('/v1/events/?name=eventone', Promise.reject());
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'REQUEST_USER_EVENTS'
      }, {
        type: 'REQUEST_USER_EVENTS_FAILED',
        msg: 'Error connecting to server...'
      }];

      return store.dispatch(filterEventsBy('eventone')).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
  });
});
