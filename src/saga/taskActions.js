
import { FETCH_TASKS_FAILURE, FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS } from "./taskActionTypes";

// taskActions.js
export const fetchTasksRequest = (token) => ({
  type: FETCH_TASKS_REQUEST,
  token,
});

export const fetchTasksSuccess = (tasks) => ({
  type: FETCH_TASKS_SUCCESS,
  tasks,
});

export const fetchTasksFailure = (error) => ({
  type: FETCH_TASKS_FAILURE,
  error,
});
