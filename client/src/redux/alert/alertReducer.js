const { SET_ALERT, REMOVE_ALERT } = require("./alertTypes")

const initialState = []

const alertReducer = (state=initialState, action) => {
        //console.log('in Alter Reducer', action.type, action.payload)
    switch(action.type){
        case SET_ALERT: 
                return [...state, action.payload]
        case REMOVE_ALERT: 
                return state.filter(alert => alert.id !== action.payload)
        default: 
                return state
    }
}

export default alertReducer