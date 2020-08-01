import {combineReducers} from 'redux'
import alertReducer from './alert/alertReducer'
import {authReducer, loginReducer, loadUserReducer} from './auth/authReducer'

const rootReducer = combineReducers({alert: alertReducer, auth: authReducer, login: loginReducer, load: loadUserReducer})

export default rootReducer