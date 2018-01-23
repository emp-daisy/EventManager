const addNotification = options => ({
  type: 'ADD_NOTIFICATION',
  options
});

const connectionError = (dispatch, message) => {
  dispatch(addNotification({
    message: message.toString() || 'Error connecting to server...',
    level: 'error',
    autoDismiss: 0
  }));
};
const validationError = (data) => {
  return Object
    .values(data.msg)
    .join('\n');
};

export { addNotification, connectionError, validationError };

