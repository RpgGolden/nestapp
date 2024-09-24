import "./App.css";
import AuthForm from "./AuthForm";
import TaskForm from "./TaskForm";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React, { useEffect } from "react";
import PrivateRoute from "./PrivateRoute";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../src/store/authReducer";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log('TOKEN', token)
    if (token) {
      dispatch(setAccessToken(token));
    }
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route path="/tasks" element={<PrivateRoute element={TaskForm} />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
