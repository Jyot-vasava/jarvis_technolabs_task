import React, { useEffect, useState } from "react";
import api from "../services/api";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      await api.post("/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <div className="mb-4">
        <input
          type="text"
          className="border p-2 rounded w-full mb-2"
          placeholder="Add a new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTask()}
        />

        <button
          className="border p-2 rounded bg-blue-500 text-white hover:bg-blue-600 w-full"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex justify-between items-center p-3 border rounded shadow-sm"
          >
            <span className="flex-1">{task.title}</span>
            <button
              onClick={() => deleteTask(task._id)}
              className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No tasks yet. Add one above!
        </p>
      )}
    </div>
  );
}

export default TaskManager;
