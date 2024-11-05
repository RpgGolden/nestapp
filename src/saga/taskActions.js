// taskActions.js
import { CREATE_TASK_REQUEST, FETCH_TASKS_REQUEST } from './taskActionTypes';

 const createTaskRequest = (task, token) => ({
  type: CREATE_TASK_REQUEST,
  task,
  token,
});

 const fetchTasksRequest = (token) => ({
  type: FETCH_TASKS_REQUEST,
  token,
});

export { createTaskRequest, fetchTasksRequest };