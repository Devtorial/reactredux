const LOADING = "Loading"
const SUCCESS = 'Success. Go to new URL'

import { combineReducers } from 'redux'
import {
  SEND_EMAIL, CHECK_START, CHECK_ERR1, CHECK_ERR2, CHECK_SUCCESS,
  TRACK_START, TRACK_SUCCESS, TIMEOUT, UPDATE_EMAIL
} from '../actions'

const email = (state = 'test@test.com', action) => {
  switch (action.type) {
    case UPDATE_EMAIL: 
      return action.email
    default:
      return state
  }
}

const status = (state = {isFetching: false, isError: false, checkDone: false, trackDone: false, name: ''}, action) => {
  const { isFetching, checkDone, trackDone, name } = state;
  switch (action.type) {
    case SEND_EMAIL:
    case TRACK_START:
    case CHECK_START:
      return {isFetching: true, isError: false, checkDone: false, trackDone: false, name: LOADING}
    case CHECK_SUCCESS:
      return {...state, isFetching: !trackDone, checkDone: true, name: trackDone && isFetching ? SUCCESS : name}
    case TRACK_SUCCESS:
      return {...state, isFetching: !checkDone, trackDone: true, name: checkDone && isFetching ? SUCCESS : name}
    case CHECK_ERR1:
    case CHECK_ERR2:
      return {...state, isFetching: false, isError: true, checkDone: true, name: isFetching ? action.type: name};
    case TIMEOUT:
      return {...state, isFetching: false, isError: true, name: isFetching ? action.type: name};
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  email,
  status
})

export default rootReducer
