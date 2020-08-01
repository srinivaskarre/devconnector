import uuid from 'uuid'
import { SET_ALERT, REMOVE_ALERT } from './alertTypes'

export const setupAlert = (msg, alertType, timeout = 5000) => {
    const id = uuid.v4()
    return (dispatch) => {
        dispatch({
            type: SET_ALERT,
            payload: {
                id,msg,alertType
            }
        })
         //remove alert after 5 secs
        setTimeout(()=>dispatch({type: REMOVE_ALERT,
            payload: id}), timeout)
    }
   
}

export const removeAlert = id => {
    return (dispatch) => {
        dispatch({
            type: REMOVE_ALERT,
            payload: id
        })
    }
}