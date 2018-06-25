import centers from '../../reducers/centerReducers';

describe('Centers Reducer', () => {
  it('should return the initial state', () => {
    expect(centers(undefined, {})).toEqual({
      isLoading: false,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      allCenterList: [],
      singleCenter: {
        center: {},
        eventUrl: ''
      },
      paginationMeta: {}
    });
  });

  it('should create an action to get all CENTERS', () => {
    const actionObject = {
      type: 'REQUEST_CENTERS'
    };
    expect(centers({
      isLoading: false,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      allCenterList: []
    }, actionObject)).toMatchObject({
      isLoading: true,
      error: false
    });
  });

  it('should create an action when all event retrieval fails', () => {
    const actionObject = {
      type: 'REQUEST_CENTERS_FAILED',
      msg: 'Error message'
    };
    expect(centers({
      isLoading: true,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      allCenterList: []
    }, actionObject)).toMatchObject({
      isLoading: false,
      error: true,
      errorMessage: actionObject.msg
    });
  });

  it('should create an action when requesting all event retrieval passes', () => {
    const actionObject = {
      type: 'REQUEST_CENTERS_GRANTED',
      data: {
        centers: {

        },
        meta: {
          pagination: {

          }
        }
      }
    };
    expect(centers({
      isLoading: true,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      allCenterList: []
    }, actionObject)).toMatchObject({
      isLoading: false,
      error: false,
      allCenterList: actionObject.data.centers,
      paginationMeta: actionObject.data.meta.pagination
    });
  });

  it('should create an action to get single CENTERS', () => {
    const actionObject = {
      type: 'REQUEST_SINGLE_CENTERS'
    };
    expect(centers({
      isLoading: false,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      allCenterList: []
    }, actionObject)).toMatchObject({
      isLoading: true,
      error: false
    });
  });

  it('should create an action when requesting single event retrieval fails', () => {
    const actionObject = {
      type: 'REQUEST_SINGLE_CENTERS_FAILED',
      msg: 'Error message'
    };
    expect(centers({
      isLoading: true,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      allCenterList: []
    }, actionObject)).toMatchObject({
      isLoading: false,
      error: true,
      errorMessage: actionObject.msg
    });
  });

  it('should create an action when requesting single event retrieval passes', () => {
    const actionObject = {
      type: 'REQUEST_SINGLE_CENTERS_GRANTED',
      data: { }
    };
    expect(centers({
      isLoading: true,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      allCenterList: []
    }, actionObject)).toMatchObject({
      isLoading: false,
      error: false,
      singleCenter: actionObject.data
    });
  });

  it('should create an action to DELETE an event', () => {
    const actionObject = {
      type: 'DELETE_CENTERS'
    };
    expect(centers({
      isLoading: false,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      allCenterList: []
    }, actionObject)).toMatchObject({
      isLoading: true,
      error: false
    });
  });

  it('should create an action when deleting event fails', () => {
    const actionObject = {
      type: 'DELETE_CENTERS_FAILED',
      errorMessage: 'Error message'
    };
    expect(centers({
      isLoading: true,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      allCenterList: []
    }, actionObject)).toMatchObject({
      isLoading: false,
      error: true,
      errorMessage: actionObject.msg
    });
  });

  it('should create an action when deleting CENTERS succeeds', () => {
    const actionObject = {
      type: 'DELETE_CENTERS_GRANTED',
      id: 111
    };
    expect(centers({
      isLoading: true,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      allCenterList: [{
        id: 111,
        name: 'Test id'
      }]
    }, actionObject)).toMatchObject({
      isLoading: false,
      error: false,
      allCenterList: []
    });
  });

  it('should create an action to CREATE an event', () => {
    const actionObject = {
      type: 'CREATE_CENTERS'
    };
    expect(centers({
      isLoading: false,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      allCenterList: []
    }, actionObject)).toMatchObject({
      isLoading: true,
      error: false
    });
  });

  it('should create an action when creating event fails', () => {
    const actionObject = {
      type: 'CREATE_CENTERS_FAILED',
      msg: 'Error message'
    };
    expect(centers({
      isLoading: true,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      allCenterList: []
    }, actionObject)).toMatchObject({
      isLoading: false,
      error: true,
      errorMessage: actionObject.msg
    });
  });

  it('should create an action when creating CENTERS succeeds', () => {
    const actionObject = {
      type: 'CREATE_CENTERS_GRANTED',
      newData: { }
    };
    expect(centers({
      isLoading: false,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      allCenterList: []
    }, actionObject)).toMatchObject({
      isLoading: false,
      error: false,
    });
  });

  it('should UPDATE an action to UPDATE an event', () => {
    const actionObject = {
      type: 'UPDATE_CENTERS'
    };
    expect(centers({
      isLoading: false,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      allCenterList: []
    }, actionObject)).toMatchObject({
      isLoading: true,
      error: false
    });
  });

  it('should UPDATE an action when updating event fails', () => {
    const actionObject = {
      type: 'UPDATE_CENTERS_FAILED',
      msg: 'Error message'
    };
    expect(centers({
      isLoading: true,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      allCenterList: []
    }, actionObject)).toMatchObject({
      isLoading: false,
      error: true,
      errorMessage: actionObject.msg
    });
  });

  it('should UPDATE an action when updating CENTERS succeeds', () => {
    const actionObject = {
      type: 'UPDATE_CENTERS_GRANTED',
      newData: {
        id: 111,
        name: 'New Test Center'
      }
    };
    expect(centers({
      isLoading: false,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      allCenterList: [{
        id: 111,
        name: 'Test center'
      }]
    }, actionObject)).toMatchObject({
      isLoading: false,
      error: false,
      allCenterList: [actionObject.newData]
    });
  });

  it('should not UPDATE an action when updating CENTERS succeeds', () => {
    const actionObject = {
      type: 'UPDATE_CENTERS_GRANTED',
      newData: {
        id: 111,
        name: 'New Test Center'
      }
    };
    expect(centers({
      isLoading: false,
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      allCenterList: [{
        id: 123,
        name: 'Test center'
      }]
    }, actionObject)).toMatchObject({
      isLoading: false,
      error: false,
      allCenterList: [{
        id: 123,
        name: 'Test center'
      }]
    });
  });
});
