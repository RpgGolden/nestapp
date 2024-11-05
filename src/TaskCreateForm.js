// TaskCreationForm.js
import React from "react";

const TaskCreationForm = ({ newTask, setNewTask, handleCreateTask }) => {
  return (
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
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
      />
      <button onClick={handleCreateTask}>Create Task</button>
    </div>
  );
};

export default TaskCreationForm;
