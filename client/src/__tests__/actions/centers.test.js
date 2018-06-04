import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  getCenters,
  createCenter,
  deleteCenter, updateCenter, filterCentersBy, getCentersOptions
} from '../../actions/center';

const CLOUDINARY_API_URL = process.env.CLOUDINARY_API;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

describe('Centers Actions', () => {
  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  describe('FETCH EVENT', () => {
    it('it should fetch centers with no return', () => {
      fetchMock.getOnce('/v1/centers', {
        body: {},
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'REQUEST_CENTERS'
      }, {
        type: 'REQUEST_CENTERS_GRANTED',
        data: []
      }];

      return store.dispatch(getCenters()).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should fetch centers', () => {
      fetchMock.getOnce('/v1/centers', {
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
        type: 'REQUEST_CENTERS'
      }, {
        type: 'REQUEST_CENTERS_GRANTED',
        data: []
      }];

      return store.dispatch(getCenters()).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should fetch centers with 500 error', () => {
      fetchMock.getOnce('/v1/centers', Promise.reject());
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'REQUEST_CENTERS'
      }, {
        type: 'REQUEST_CENTERS_FAILED',
        msg: 'Error connecting to server...'
      }];

      return store.dispatch(getCenters()).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
  });

  describe('CREATE EVENT', () => {
    it('it should create centers without image to upload', () => {
      fetchMock.postOnce('/v1/centers/', {
        status: 201,
        body: { val: { name: 'centerOne' } },
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CREATE_CENTERS'
      }, {
        type: 'CREATE_CENTERS_GRANTED',
        newData: { name: 'centerOne' }
      }];

      return store.dispatch(createCenter({ name: 'centerOne' })).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should create centers without image to upload and failed response', () => {
      fetchMock.postOnce('/v1/centers/', {
        status: 401,
        body: { val: { name: 'centerOne' } },
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CREATE_CENTERS'
      }, {
        type: 'CREATE_CENTERS_FAILED',
        msg: 'Error creating new center. TRY AGAIN LATER'
      }];

      return store.dispatch(createCenter({ name: 'centerOne' })).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should create centers with image to upload', () => {
      fetchMock.postOnce(CLOUDINARY_API_URL, {
        status: 200,
        body: { secure_url: '/image' },
        headers: {
          'content-type': 'application/json'
        }
      });
      fetchMock.postOnce('/v1/centers/', {
        status: 201,
        body: { val: { name: 'centerOne' } },
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CREATE_CENTERS'
      }, {
        type: 'CREATE_CENTERS_GRANTED',
        newData: { name: 'centerOne' }
      }];

      return store.dispatch(createCenter({ name: 'centerOne', filesToUpload: 'files' })).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should create centers with image to upload and failed response', () => {
      fetchMock.postOnce(CLOUDINARY_API_URL, {
        status: 400,
        body: { },
        headers: {
          'content-type': 'application/json'
        }
      });
      fetchMock.postOnce('/v1/centers/', {
        status: 400,
        body: { },
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CREATE_CENTERS'
      }, {
        type: 'CREATE_CENTERS_FAILED',
        msg: 'Error: Image upload failed...'
      }];

      return store.dispatch(createCenter({ name: 'centerOne', filesToUpload: 'files' })).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should create centers with image to upload failed', () => {
      fetchMock.postOnce(CLOUDINARY_API_URL, Promise.reject());
      fetchMock.postOnce('/v1/centers/', {
        status: 400,
        body: { },
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CREATE_CENTERS'
      }, {
        type: 'CREATE_CENTERS_FAILED',
        msg: 'Error: Image upload failed...'
      }];

      return store.dispatch(createCenter({ name: 'centerOne', filesToUpload: 'files' })).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
  });

  describe('UPDATE EVENT', () => {
    it('it should update centers without image to upload', () => {
      fetchMock.putOnce('/v1/centers/1', {
        status: 200,
        body: { val: { name: 'centerOne' } },
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'UPDATE_CENTERS'
      }, {
        type: 'UPDATE_CENTERS_GRANTED',
        newData: { name: 'centerOne' }
      }];

      return store.dispatch(updateCenter({ name: 'centerOne' }, 1)).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should update centers without image to upload and failed response', () => {
      fetchMock.putOnce('/v1/centers/1', {
        status: 401,
        body: { val: { name: 'centerOne' } },
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'UPDATE_CENTERS'
      }, {
        type: 'UPDATE_CENTERS_FAILED',
        msg: 'Error updating center. TRY AGAIN LATER'
      }];

      return store.dispatch(updateCenter({ name: 'centerOne' }, 1)).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should update centers with image to upload', () => {
      fetchMock.postOnce(CLOUDINARY_API_URL, {
        status: 200,
        body: { secure_url: '/image' },
        headers: {
          'content-type': 'application/json'
        }
      });
      fetchMock.putOnce('/v1/centers/1', {
        status: 200,
        body: { val: { name: 'centerOne' } },
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'UPDATE_CENTERS'
      }, {
        type: 'UPDATE_CENTERS_GRANTED',
        newData: { name: 'centerOne' }
      }];

      return store.dispatch(updateCenter({ name: 'centerOne', filesToUpload: 'files' }, 1)).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should update centers with image to upload and failed response', () => {
      fetchMock.postOnce(CLOUDINARY_API_URL, {
        status: 400,
        body: { },
        headers: {
          'content-type': 'application/json'
        }
      });
      fetchMock.putOnce('/v1/centers/1', {
        status: 400,
        body: { },
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'UPDATE_CENTERS'
      }, {
        type: 'UPDATE_CENTERS_FAILED',
        msg: 'Error updating center. TRY AGAIN LATER'
      }];

      return store.dispatch(updateCenter({ name: 'centerOne', filesToUpload: 'files' }, 1)).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should update centers with failed promise', () => {
      fetchMock.putOnce('/v1/centers/1', Promise.reject());
      const expectedActions = [{
        type: 'UPDATE_CENTERS'
      }, {
        type: 'UPDATE_CENTERS_FAILED',
        msg: 'Error updating center...'
      }];

      return store.dispatch(updateCenter({ name: 'centerOne' }, 1)).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
  });

  describe('DELETE EVENT', () => {
    it('it should delete centers', () => {
      fetchMock.deleteOnce('/v1/centers/1', {
        body: {},
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'DELETE_CENTERS'
      }, {
        type: 'DELETE_CENTERS_GRANTED',
        id: 1
      }];

      return store.dispatch(deleteCenter(1)).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should delete centers with failure', () => {
      fetchMock.deleteOnce('/v1/centers/1', 400);
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'DELETE_CENTERS'
      }, {
        type: 'DELETE_CENTERS_FAILED',
        msg: 'Error deleting from to server. TRY AGAIN LATER'
      }];

      return store.dispatch(deleteCenter(1)).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should delete centers with 500 error', () => {
      fetchMock.deleteOnce('/v1/centers/1', Promise.reject());
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'DELETE_CENTERS'
      }, {
        type: 'DELETE_CENTERS_FAILED',
        msg: 'Error deleting from to server...'
      }];

      return store.dispatch(deleteCenter(1)).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
  });

  describe('FIlter Center', () => {
    it('it should fetch centers with no return', () => {
      fetchMock.getOnce('/v1/centers/?name=centerone', {
        body: {},
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'REQUEST_CENTERS'
      }, {
        type: 'REQUEST_CENTERS_GRANTED',
        data: []
      }];

      return store.dispatch(filterCentersBy('name', 'centerOne')).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should fetch centers', () => {
      fetchMock.getOnce('/v1/centers/?location=locationone', {
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
        type: 'REQUEST_CENTERS'
      }, {
        type: 'REQUEST_CENTERS_GRANTED',
        data: []
      }];

      return store.dispatch(filterCentersBy('location', 'locationOne')).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should fetch centers with 500 error', () => {
      fetchMock.getOnce('/v1/centers/?facilities=facilitiesone', Promise.reject());
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'REQUEST_CENTERS'
      }, {
        type: 'REQUEST_CENTERS_FAILED',
        msg: 'Error connecting to server...'
      }];

      return store.dispatch(filterCentersBy('facilities', 'facilitiesOne')).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
  });

  describe('Get Center Options', () => {
    it('it should fetch centers with no return', () => {
      fetchMock.getOnce('/v1/centers', {
        body: {},
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedResponse = {
        val: {
          options: [],
          complete: true
        }
      };

      return store.dispatch(getCentersOptions()).then((response) => {
        expect(fetchMock.called()).toBe(true);
        expect(response).toEqual(expectedResponse.val);
      });
    });
    it('it should fetch centers', () => {
      fetchMock.getOnce('/v1/centers', {
        body: {
          val: [{ name: 'oneItem', location: 'OneLocation', state: 'OneState' }]
        },
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedResponse = {
        val: {
          options: [{ name: 'oneItem, OneLocation, OneState', id: undefined }],
          complete: true
        }
      };

      return store.dispatch(getCentersOptions()).then((response) => {
        expect(fetchMock.called()).toBe(true);
        expect(response).toEqual(expectedResponse.val);
      });
    });
    it('it should fetch centers with 500 error', () => {
      fetchMock.getOnce('/v1/centers', Promise.reject());
      const expectedResponse = {
        val: {
          options: [],
          complete: true
        }
      };

      return store.dispatch(getCentersOptions()).then((response) => {
        expect(fetchMock.called()).toBe(true);
        expect(response).toEqual(expectedResponse.val);
      });
    });
  });
});
