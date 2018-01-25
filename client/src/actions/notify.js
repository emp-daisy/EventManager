const addNotification = options => ({
  type: 'ADD_NOTIFICATION',
  options
});

const connectionError = (dispatch, message) => {
  dispatch(addNotification({
    message: message || 'Error connecting to server...',
    level: 'error',
    autoDismiss: 0
  }));
};

const validationError = data => Object
  .values(data.msg)
  .join('<br />');

export { addNotification, connectionError, validationError };

