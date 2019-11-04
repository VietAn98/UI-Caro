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
