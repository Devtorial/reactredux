export const SEND_EMAIL = 'SEND_EMAIL'
export const CHECK_START = 'CHECK_START'
export const CHECK_ERR1 = 'CHECK_ERR1'
export const CHECK_ERR2 = 'CHECK_ERR2'
export const CHECK_SUCCESS = 'CHECK_SUCCESS'
export const TRACK_START = 'TRACK_START'
export const TRACK_SUCCESS = 'TRACK_SUCCESS'
export const TIMEOUT = 'TIMEOUT'
export const UPDATE_EMAIL = 'UPDATE_EMAIL'

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export const update = email => ({type: UPDATE_EMAIL, email})

const check = email => dispatch => {
  dispatch({type: CHECK_START, email})
  // check takes between 0 and 2500 milliseconds
  let ms = getRandomInt(0, 2400);
  return sleep(ms).then(() => {
    let result = ms % 3; // 1 in 3 chance of error
    if (result === 0) {
      if (ms %2 === 0) { // half ERR1, half ERR2
        dispatch({type: CHECK_ERR1, email})
      } else {
        dispatch({type: CHECK_ERR2, email})
      }
    } else {
      dispatch({type: CHECK_SUCCESS, email})
    }
  });
}

const track = (email) => dispatch => {
  dispatch({type: TRACK_START, email});
  return sleep(getRandomInt(500, 1000)).then(() => {
    dispatch({type: TRACK_SUCCESS, email})
  });
}

const timeout = (email) => dispatch => {
  return sleep(2000).then(() => {
    dispatch({type: TIMEOUT, email})
  });
}

export const sendEmail = (email) => dispatch => {
  dispatch({type: SEND_EMAIL, email})
  check(email)(dispatch);

  track(email)(dispatch);

  timeout()(dispatch);
}