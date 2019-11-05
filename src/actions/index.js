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

export function fetchRegister(email, username, password, date, gender, avatar) {
  console.log('avatar/register', avatar);
  return dispatch => {
    return axios
      .post(`http://localhost:5000/user/register`, {
        email,
        username,
        password,
        date,
        gender,
        avatar
      })
      .then(respond => console.log('Respond:', respond))
      .then(status => dispatch(userRegister(status)))
      .catch(err => console.log('Error occured', err));
  };
}

export const userLogin = user => ({
  type: 'USER_LOGIN',
  payload: user
});

export function fetchLogin(email, password) {
  return dispatch => {
    return axios
      .post(`http://localhost:5000/user/login`, {
        email,
        password
      })
      .then(respond => respond.data)
      .then(data => {
        if (data.message) {
          localStorage.removeItem('token');
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
        .get('http://localhost:5000/me', {
          headers: {
            Authorization: `Bearer ${tokenn}`
          }
        })
        .then(resp => resp.data)
        .then(data => {
          if (data.message) {
            localStorage.removeItem('token');
          } else {
            console.log('data/me', data[0]);
            dispatch(userLogin(data[0]));
          }
        });
    }
    return 'No infor!!';
  };
};

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
});

export function fetchEdit(id, username, password, date, gender, avatar) {
  return dispatch => {
    return axios
      .post(`http://localhost:5000/user/edit`, {
        id,
        username,
        password,
        date,
        gender,
        avatar
      })
      .then(respond => respond.data)
      .then(data => {
        if (data.message) {
          localStorage.removeItem('token');
        } else {
          // console.log('data/edit', data);
          dispatch(userLogin(data));
        }
      });
  };
}

export const setAutoCheck = (isAutoCheck) => ({
  type: 'SET_AUTO_CHECK',
  isAutoCheck
});

export const ifPlayWithPerson = () => ({
  type: 'IS_PLAY_WITH_PERSON',
})

export const ifPlayWithAI = () => ({
  type: 'IS_PLAY_WITH_AI',
})

export const isHiddenOrNot = () => ({
  type: 'IS_HIDDEN_OR_NOT',
})

export const setChatBox = (message) => ({
  type: 'SET_CHAT_BOX',
  message
})