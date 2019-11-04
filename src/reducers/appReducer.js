const initialState = {
  history: [
    {
      squares: Array(400).fill(null)
    }
  ],
  isNext: true,
  win: false,
  stepNumber: 0,
  checkWin: false,
  winSquares: [],
  winSquaresTemp: [],
  isUp: true,
  isDown: false,
  currentUser: {},
  status: 0,
  isAutoCheck: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_HISTORY':
      return {
        ...state,
        history: action.history.concat([
          {
            squares: action.squares
          }
        ]),
        stepNumber: action.history.length,
        isNext: !action.isNext
      };

    case 'CHECK_AS_WIN':
      return {
        ...state,
        winSquares: action.winSquares,
        checkWin: true,
        winSquaresTemp: action.winSquares,
        win: true
      };

    case 'CHECK_IF_LAST_STEP':
      return {
        ...state,
        stepNumber: action.step,
        isNext: action.step % 2 === 0,
        winSquares: action.winSquaresTemp,
        checkWin: true
      };

    case 'CHECK_IF_NOT_LAST_STEP':
      return {
        ...state,
        stepNumber: action.step,
        isNext: action.step % 2 === 0,
        winSquares: [],
        checkWin: false
      };

    case 'RESET_SQUARES':
      return {
        ...state,
        history: [
          {
            squares: Array(400).fill(null)
          }
        ],
        isNext: true,
        win: false,
        stepNumber: 0,
        checkWin: false,
        winSquares: [],
        winSquaresTemp: [],
        isUp: true,
        isDown: false
      };

    case 'ASCENDING_SORT':
      return {
        ...state,
        isUp: true,
        isDown: false
      };

    case 'DECREASING_SORT':
      return {
        ...state,
        isDown: true,
        isUp: false
      };

    case 'USER_LOGIN':
      return {
        ...state,
        currentUser: action.payload
      };

    case 'LOGOUT_USER':
      return { ...state, currentUser: {} };

    case 'USER_REGISTER':
      return {
        ...state,
        status: action.status
      };
    case 'SET_AUTO_CHECK':
      return {
        ...state,
        isAutoCheck: !action.isAutoCheck
      };
    default:
      return state;
  }
};

export default appReducer;
