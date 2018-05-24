const notify = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return Object.assign({}, state, {
        clear: false,
        config: action.options
      });
    case 'CLEAR_NOTIFICATION':
      return Object.assign({}, state, {
        clear: true
      });
    default:
      return state;
  }
};
export default notify;
