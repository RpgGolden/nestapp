// TaskList.js
import React from "react";

const TaskList = ({ tasks, handleUpdateTask, handleToggleTask, handleDeleteTask, isUpdating, selectedTask, updatedTask, setUpdatedTask, handleUpdateTaskFormSubmit }) => {
  return (
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
            <tr key={task.id} className={task.isDone ? "completed-task" : ""}>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>
                {isUpdating && selectedTask === task.id ? (
                  <>
                    <input
                      type="text"
                      placeholder="New Task Name"
                      value={updatedTask.name}
                      onChange={(e) =>
                        setUpdatedTask({
                          ...updatedTask,
                          name: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="New Task Description"
                      value={updatedTask.description}
                      onChange={(e) =>
                        setUpdatedTask({
                          ...updatedTask,
                          description: e.target.value,
                        })
                      }
                    />
                    <button onClick={handleUpdateTaskFormSubmit}>
                      Update Task
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleUpdateTask(task.id)}>
                      Update
                    </button>
                    <button onClick={() => handleToggleTask(task.id)}>
                      {task.isDone ? "Undo" : "Complete"}
                    </button>
                    <button onClick={() => handleDeleteTask(task.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
