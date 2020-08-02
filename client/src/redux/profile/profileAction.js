import {GET_PROFILE, PROFILE_LOAD_ERROR, CREATE_PROFILE} from './profileTypes'
import axios from 'axios'
import { setupAlert } from '../alert/alertAction'

export const getProfile = () => {
    return async (dispatch) => {
        try{
            const resp = await axios.get('/api/profile/me')
            dispatch({
                type:GET_PROFILE,
                payload: resp.data
            })
        }catch(err){
            dispatch({
                type: PROFILE_LOAD_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            })
        }
    }
}

export const createProfile = (profile, history, edit = false) => {

    return async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const resp = axios.post('/api/profile/save', JSON.stringify(profile), config)

        dispatch({
            type: GET_PROFILE,
            payload: resp.data
        })

       

        if(!edit){
            dispatch(setupAlert('Profile Created','success'));
            history.push('/dashboard')
        }else{
            dispatch(setupAlert('Profile Updated','success'));
        }
        
    } catch (err) {
        dispatch({
            type: PROFILE_LOAD_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })

        dispatch(setupAlert('Profile Failed','danger'));
    }
    }
}