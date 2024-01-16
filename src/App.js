import logo from './logo.svg';
import './App.css';
import AuthForm from './AuthForm';
import TaskForm from './TaskForm';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import React, {useState} from 'react';

function App() {
  const [accessToken] = useState(null);
  return (
    <Router>
    <Routes>
    <Route
          path="/login"
          element={<AuthForm setAccessToken={accessToken} />}
        />
        <Route
          path="/tasks"
          element={<TaskForm accessToken={accessToken} />}
        />
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />
    </Routes>
  </Router>
  );
}

export default App;
