import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import getStates from '../../actions/states';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store = mockStore({});

describe('States Actions', () => {
  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('it should execute fetch states with no return', () => {
    const expectedResponse = {
      val: {
        options: [],
        complete: true
      }
    };

    fetchMock.getOnce('/v1/states', {
      body: {
      },
      headers: {
        'content-type': 'application/json'
      }
    });
    return store.dispatch(getStates()).then((response) => {
      expect(fetchMock.called()).toBe(true);
      expect(response).toEqual(expectedResponse.val);
    });
  });
  it('it should execute fetch states with returned array', () => {
    const expectedResponse = {
      val: {
        options: [{ id: 1, name: 'firstState' }],
        complete: true
      }
    };

    fetchMock.getOnce('/v1/states', {
      body: {
        val: [{ id: 1, name: 'firstState' }]
      },
      headers: {
        'content-type': 'application/json'
      }
    });
    return store.dispatch(getStates()).then((response) => {
      expect(fetchMock.called()).toBe(true);
      expect(response).toEqual(expectedResponse.val);
    });
  });
  it('it should execute fetch states and return empty array when failed', () => {
    const expectedResponse = {
      val: {
        options: [],
        complete: true
      }
    };

    fetchMock.getOnce('/v1/states', 500);
    return store.dispatch(getStates()).then((response) => {
      expect(fetchMock.called()).toBe(true);
      expect(response).toEqual(expectedResponse.val);
    });
  });
});
