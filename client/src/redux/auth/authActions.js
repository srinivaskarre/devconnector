import axios from "axios";
import { REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOAD_SUCCESS, USER_LOAD_FAIL } from "./authTypes";
import { setupAlert } from "../alert/alertAction";
import {setAuthToken} from '../../utils/util'

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const creds = {
        email,
        password,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const resp = await axios.post(
        "/api/auth/login",
        JSON.stringify(creds),
        config
      );
      console.log(resp.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: resp.data
      })
    } catch (err) {
        console.log('Login failed')
        dispatch({
          type: LOGIN_FAIL
        })

        const errors = err.response.data.errors;

        if(errors && errors.length > 0){
          errors.map(error => dispatch(setupAlert(error.msg, 'danger')))
        }else{
          dispatch(setupAlert('Login Failed!!', 'danger'))
        }
    }
  };
};

export const register = ( name, email, password ) => {
  return async (dispatch) => {
    try {
      const user = {
        name,
        email,
        password,
      };
      console.log('User Object', user)
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const resp = await axios.post(
        "/api/users/save",
        JSON.stringify(user),
        config
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: resp.data,
      });
      dispatch(setupAlert('Singup Success', "danger"))
    } catch (err) {
      console.log("error occurred");
      dispatch({
        type: REGISTER_FAIL,
      });
      const errors = err.response.data.errors;
      console.log('erros', errors, err)
      if (errors) {
        errors.map(error => dispatch(setupAlert(error.msg, "danger")));
      }else{
        dispatch(setupAlert('Signup Failed!!', 'danger'))
      }
    }
  };
};

export const loadUser = () => {
  return async (dispatch) => {
    setAuthToken();
    try{
      const resp = await axios.get('/api/auth');
      dispatch({
        type:USER_LOAD_SUCCESS,
        payload: resp.data
      })
    }catch(err){
      console.log('error while retreiving user')
      dispatch({
        type: USER_LOAD_FAIL
      })
    }
  }
}
