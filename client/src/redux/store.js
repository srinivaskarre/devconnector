import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './rootRedcuer'
import {logger} from 'redux-logger'


const initialState = {
}

const middleware = [thunk,logger]

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store
