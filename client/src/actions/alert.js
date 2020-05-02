import { SET_ALERT, REMOVE_ALERT } from './types';
import uuid from 'uuid';

export default setAlert = (msg, actionType) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: {
      id,
      msg,
      alertType,
    },
  });
};
