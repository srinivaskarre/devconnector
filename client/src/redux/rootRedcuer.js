import {combineReducers} from 'redux'
import alertReducer from './alert/alertReducer'
import {authReducer} from './auth/authReducer'
import {profileReducer} from './profile/profileReducer'

const rootReducer = combineReducers({alert: alertReducer, auth: authReducer, profile: profileReducer})

export default rootReducer