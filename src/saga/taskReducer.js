
// taskReducer.js
import { FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE } from './taskActionTypes';

const initialState = {
  tasks: [],
  error: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.tasks,
      };
    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default taskReducer;
