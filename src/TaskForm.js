// TaskForm.js
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../src/login.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "./store/authReducer";
import TaskList from "./TaskListForm";
import TaskCreationForm from "./TaskCreateForm";

//mobx
import { observer } from "mobx-react-lite";
import taskStore from "./mobx/taskStore";

// saga
import { createTaskRequest } from "./saga/taskActions";

const TaskForm = observer(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (token) {
      taskStore.fetchTasks(token);
      // taskStore.fetchTasks(token);
    }
  }, [token, dispatch]);

  const handleCreateTask = () => {
    dispatch(createTaskRequest(taskStore.newTask, token));
    
  }
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout");
      dispatch(logoutAction());
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <h1>Task List</h1>

      <button onClick={handleLogout}>Logout</button>
      <TaskCreationForm
        newTask={taskStore.newTask}
        setNewTask={taskStore.setNewTask.bind(taskStore)}
        handleCreateTask={handleCreateTask} // Use the Redux-Saga handler
      />
      <TaskList
        tasks={taskStore.tasks}
        handleUpdateTask={(taskId) => {
          taskStore.setSelectedTask(taskId);
          taskStore.setIsUpdating(true);
        }}
        handleToggleTask={(taskId) => taskStore.toggleTask(taskId, token)}
        handleDeleteTask={(taskId) => taskStore.deleteTask(taskId, token)}
        isUpdating={taskStore.isUpdating}
        selectedTask={taskStore.selectedTask}
        updatedTask={taskStore.updatedTask}
        setUpdatedTask={taskStore.setUpdatedTask.bind(taskStore)}
        handleUpdateTaskFormSubmit={() => taskStore.updateTask(taskStore.selectedTask, token)}
      />
    </div>
  );
});

export default TaskForm;
