// taskStore.js
import { makeAutoObservable } from "mobx";
import axios from "axios";

class TaskStore {
  tasks = [];
  newTask = { name: "", description: "" };
  isUpdating = false;
  updatedTask = { name: "", description: "" };
  selectedTask = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  setNewTask(newTask) {
    this.newTask = newTask;
  }

  setUpdatedTask(updatedTask) {
    this.updatedTask = updatedTask;
  }

  setSelectedTask(selectedTask) {
    this.selectedTask = selectedTask;
  }

  setIsUpdating(isUpdating) {
    this.isUpdating = isUpdating;
  }

  async fetchTasks(token) {
    try {
      const response = await axios.get("http://localhost:3000/api/task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  async createTask(token) {
    try {
      await axios.post("http://localhost:3000/api/task", this.newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.fetchTasks(token);
      this.setNewTask({ name: "", description: "" });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }

  async deleteTask(taskId, token) {
    try {
      await axios.delete(`http://localhost:3000/api/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.fetchTasks(token);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  async toggleTask(taskId, token) {
    try {
      await axios.patch(`http://localhost:3000/api/task/${taskId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.fetchTasks(token);
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  }

  async updateTask(taskId, token) {
    try {
      await axios.patch(
        `http://localhost:3000/api/task/${taskId}/name`,
        this.updatedTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      this.fetchTasks(token);
      this.setSelectedTask(null);
      this.setIsUpdating(false);
      this.setUpdatedTask({ name: "", description: "" });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }
}

const taskStore = new TaskStore();
export default taskStore;
