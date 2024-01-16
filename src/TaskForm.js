// TaskForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../src/login.css';
const TaskForm = ({token}) => {
    const history = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ name: '', description: '' });
    const [isUpdating, setIsUpdating] = useState(false);
    const [updatedTask, setUpdatedTask] = useState({ name: '', description: '' });
    const [selectedTask, setSelectedTask] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if(token) {
        fetchTasks(token);
    }
  }, []);

  const fetchTasks = async (token) => {
    try {
      const response = await axios.get('http://localhost:3000/api/task', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const createTask = async () => {
    try {
        const token = localStorage.getItem('accessToken');

        await axios.post(
            'http://localhost:3000/api/task',
            newTask,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        fetchTasks();
    } catch (error) {
        console.error('Error creating task:', error);
    }
};
const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:3000/api/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTasks(token);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
};
  
  const toggleTask = async (taskId) => {
    try {
        const token = localStorage.getItem('accessToken');
      await axios.patch(`http://localhost:3000/api/task/${taskId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTasks(token);
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };
  
  const updateTask = async (taskId) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.patch(
        `http://localhost:3000/api/task/${taskId}/name`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks(token);
      setSelectedTask(null);
      setIsUpdating(false);
      setUpdatedTask({ name: '', description: '' });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  
  const handleCreateTask = () => {
    createTask();
    setNewTask({ name: '', description: '' });
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId, token); // Передаем токен в функцию deleteTask
  };

  const handleToggleTask = (taskId) => {
    toggleTask(taskId, token); // Передаем токен в функцию toggleTask
  };
  const handleUpdateTask = (taskId) => {
    setSelectedTask(taskId);
    setIsUpdating(true);
  };

  const handleUpdateTaskFormSubmit = () => {
    updateTask(selectedTask);
  };


  return (
    <div>
      <h1>Task List</h1>
      <button onClick={() => history.push('/login')}>Logout</button>
      <div>
        <h2>Create Task</h2>
        <input
          type="text"
          placeholder="Task Name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button onClick={handleCreateTask}>Create Task</button>
      </div>
      <div>
        <h2>Task List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className={task.isDone ? 'completed-task' : ''}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>
                  {isUpdating && selectedTask === task.id ? (
                    <>
                      <input
                        type="text"
                        placeholder="New Task Name"
                        value={updatedTask.name}
                        onChange={(e) => setUpdatedTask({ ...updatedTask, name: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="New Task Description"
                        value={updatedTask.description}
                        onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
                      />
                      <button onClick={handleUpdateTaskFormSubmit}>Update Task</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleUpdateTask(task.id)}>Update</button>
                      <button onClick={() => handleToggleTask(task.id)}>
                        {task.isDone ? 'Undo' : 'Complete'}
                      </button>
                      <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskForm;