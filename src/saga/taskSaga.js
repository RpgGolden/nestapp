// taskSaga.js
import { call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { createTaskRequest } from './taskActions';
import taskStore from '../mobx/taskStore';
function* createTaskSaga(action) {
  try {
    const token = localStorage.getItem("token");
    console.log(action)
    yield call(axios.post, "http://localhost:3000/api/task", action.task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    taskStore.fetchTasks(token);
  } catch (error) {
    console.error("Error creating task:", error);
  }
}

export default function* taskSagas() {
  yield takeLatest(createTaskRequest, createTaskSaga);
}
