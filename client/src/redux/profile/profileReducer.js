import { LOG_OUT } from "../auth/authTypes"

const { GET_PROFILE, PROFILE_LOAD_ERROR } = require("./profileTypes")

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
        case LOG_OUT: return initialState
        default: return state;
    }
}