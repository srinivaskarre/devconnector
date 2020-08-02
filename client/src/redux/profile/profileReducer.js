import { LOG_OUT } from "../auth/authTypes"

const { GET_PROFILE, PROFILE_LOAD_ERROR, UPDATE_PROFILE,CLEAR_PROFILE, GET_GITHUB_REPO, GET_ALL_PROFILES } = require("./profileTypes")

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    errors: {}
}

export const profileReducer = (state = initialState,action) =>{
    const {type,payload} = action

    switch(type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case PROFILE_LOAD_ERROR:
            return {
                ...state,
                loading:false,
                error: payload
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false

            }
        case GET_ALL_PROFILES: {
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        }
        case GET_GITHUB_REPO: 
            return {
                ...state,
                repos: payload,
                loading: false
            }
        case LOG_OUT: return initialState
        default: return state;
    }
}