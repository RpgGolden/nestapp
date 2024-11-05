// store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from '../store/authReducer';
import taskReducer from './taskReducer';
import taskSagas from './taskSaga';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Combine your reducers
const rootReducer = {
  auth: authReducer,
  tasks: taskReducer,
};

// Configure the store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the saga middleware
sagaMiddleware.run(taskSagas);

export default store;
