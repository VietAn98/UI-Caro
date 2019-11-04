import axios from 'axios';

export const saveHistory = (history, squares, isNext) => ({
  type: 'SAVE_HISTORY',
  history,
  squares,
  isNext
});

export const checkAsWin = winSquares => ({
  type: 'CHECK_AS_WIN',
  winSquares
});

export const checkIfLastStep = (step, winSquaresTemp) => ({
  type: 'CHECK_IF_LAST_STEP',
  step,
  winSquaresTemp
});

export const checkIfNotLastStep = step => ({
  type: 'CHECK_IF_NOT_LAST_STEP',
  step
});

export const resetSquares = () => ({
  type: 'RESET_SQUARES'
});

export const ascendingSort = () => ({
  type: 'ASCENDING_SORT'
});

export const decreasingSort = () => ({
  type: 'DECREASING_SORT'
});

export const userRegister = status => ({
  type: 'USER_REGISTER',
  status
});

export function fetchRegister(username, password) {
  return dispatch => {
    return axios
      .post(`https://restful-api-1612907.herokuapp.com/user/register`, {
        username,
        password
      })
      .then(respond => console.log('Respond:', respond))
      .then(status => dispatch(userRegister(status)))
      .catch(err => console.log('Error occured', err));
  };
}

export const userLogin = user => ({
  type: 'USER_LOGIN',
  user
});

export function fetchLogin(username, password) {
  return dispatch => {
    return axios
      .post(`https://restful-api-1612907.herokuapp.com/user/login`, {
        username,
        password
      })
      .then(respond => respond.data)
      .then(data => {
        if (data.message) {
          //
        } else {
          localStorage.setItem('token', data.token);
          dispatch(userLogin(data.user));
        }
      });
  };
}

export const fetchProfile = () => {
  return dispatch => {
    const tokenn = localStorage.token;
    if (tokenn) {
      return axios
        .get('https://restful-api-1612907.herokuapp.com/me', {
          headers: {
            Authorization: `Bearer ${tokenn}`
          }
        })
        .then(resp => resp.data)
        .then(data => {
          if (data.message) {
            localStorage.removeItem('token');
          } else {
            console.log('data', data);
            dispatch(userLogin(data));
          }
        });
    }
    return 'No infor!!';
  };
};

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
});
