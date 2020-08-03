import {GET_PROFILE, PROFILE_LOAD_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, ACCOUNT_DELETED, GET_ALL_PROFILES, GET_GITHUB_REPO} from './profileTypes'
import axios from 'axios'
import { setupAlert } from '../alert/alertAction'

// get profile
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

// get all profiles
export const getProfiles = () => {
    return async (dispatch) => {
        try{
            const resp = await axios.get('/api/profile')
            dispatch({
                type:GET_ALL_PROFILES,
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


// get profile by id
export const getProfileById = (userId) => {
    return async (dispatch) => {
        try{
            const resp = await axios.get(`/api/profile/user/${userId}`)
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

// get github repos
export const getGithubRepos = (username) => {
    return async (dispatch) => {
        try{
            const resp = await axios.get('/api/profile/me')
            dispatch({
                type:GET_GITHUB_REPO,
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


//create profile
export const createProfile = (profile, history, edit = false) => {

    return async (dispatch) => {
    try {
        console.log('In Profile creata Action', profile)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const resp = await axios.post('/api/profile/save', JSON.stringify(profile), config)

        console.log('post save', resp.data)

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

//Add Experience
export const addExperience = (experience, history) => {
    return async (dispatch) => {
    try {
        const config  = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let resp = await axios.put('/api/profile/experience', JSON.stringify(experience), config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: resp.data
        })

        dispatch(setupAlert('Expereince Added', 'success'))
        history.push('/dashboard')

    } catch (error) {
        dispatch(setupAlert('Add Expereince Failed', 'danger'))
        dispatch({
            type: PROFILE_LOAD_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
        const errors = error.response.data.errors

        if(errors){
            errors.map(error=> dispatch(setupAlert(error.msg, 'danger')))
        }

    }
}
}

//Add Education
export const addEducation = (education, history) => {
    return async (dispatch) => {
    try {
        const config  = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let resp = await axios.put('/api/profile/education', JSON.stringify(education), config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: resp.data
        })

        dispatch(setupAlert('Expereince Added', 'success'))
        history.push('/dashboard')

    } catch (error) {
        dispatch(setupAlert('Add Expereince Failed', 'danger'))
        dispatch({
            type: PROFILE_LOAD_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
        const errors = error.response.data.errors

        if(errors){
            errors.map(error=> dispatch(setupAlert(error.msg, 'danger')))
        }

    }
}
}

// Delete Experience

export const deleteExpereince = (expId) => {
    return async (dispatch)=> {
        try {
            const resp = await axios.delete(`/api/profile/experience/${expId}`)
            dispatch({
                type: GET_PROFILE,
                payload: resp.data
            })
            dispatch(setupAlert('Experience Deleted', 'success'))
        } catch (error) {
            dispatch(setupAlert('Expereince Deletion Failed', 'danger'))
    
            const errors = error.response.data.errors

            if(errors){
                errors.map(error=> dispatch(setupAlert(error.msg, 'danger')))
            }
        }
    }
}


// Delete Education

export const deleteEducation = (eduId) => {
    return async (dispatch)=> {
        try {
            const resp = await axios.delete(`/api/profile/education/${eduId}`)
            dispatch({
                type: GET_PROFILE,
                payload: resp.data
            })
            dispatch(setupAlert('Education Deleted', 'success'))
        } catch (error) {
            dispatch(setupAlert('Education Deletion Failed', 'danger'))
    
            const errors = error.response.data.errors

            if(errors){
                errors.map(error=> dispatch(setupAlert(error.msg, 'danger')))
            }
        }
    }
}

// Delete Profile

export const deleteAccount = (history) => {
    return async (dispatch) => {
        if(window.confirm('Are you sure? This can not be undone')){
        try {
            await axios.delete('/api/profile/delete')
            dispatch({
                type:CLEAR_PROFILE
            })

            dispatch({
                type:ACCOUNT_DELETED
            })
            dispatch(setupAlert('Your account has been deleted successfully','success'))
            history.push('/login')
        } catch (error) {
            dispatch(setupAlert('Profile Deletion Failed', 'danger'))
        }
    }
    }
}