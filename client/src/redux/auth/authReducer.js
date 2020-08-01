import {REGISTER_SUCCESS,REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOAD_SUCCESS, USER_LOAD_FAIL} from './authTypes'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export const authReducer = (state=initialState, action) => {
    const {type,payload} = action

    switch(type){
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }

        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default: return state
    }
}

export const loginReducer = (state = initialState,action) => {
  const {type,payload} = action
  console.log('Login Reducer :: ',payload)
    switch(type){
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                loading: false,
            }

        case LOGIN_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                token: null
            }

        default: return state
    }
}

export const loadUserReducer = (state=initialState, action) => {
    const {type,payload} = action

    switch(type){
        case USER_LOAD_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case USER_LOAD_FAIL: 
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null
            }

        default: return state
    }
}