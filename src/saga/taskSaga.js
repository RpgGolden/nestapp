// taskSagas.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchTasksSuccess, fetchTasksFailure } from './taskActions'; // Define these actions
import { FETCH_TASKS_REQUEST } from './taskActionTypes'; // Define this action type

function* fetchTasksSaga(action) {
  try {
    const response = yield call(axios.get, "http://localhost:3000/api/task", {
      headers: {
        Authorization: `Bearer ${action.token}`,
      },
    });
    yield put(fetchTasksSuccess(response.data));
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
  }
}

export default function* taskSagas() {
  yield takeLatest(FETCH_TASKS_REQUEST, fetchTasksSaga);
}
